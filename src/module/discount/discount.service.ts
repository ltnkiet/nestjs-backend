import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Discount, DiscountDocument } from './entity/discount.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscountDto } from './dto/discount.dto';
import {
    getAllDiscountByShopDto,
    getAllDiscountWithProductDto,
    getDiscountAmountDto,
} from '@module/discount/dto/get-discount.dto';
import { DISCOUNT_APPLICES } from '@enum/discount.enum';
import { ProductRepository } from '@module/product/entity/product.repository';
import { DiscountRepository } from '@module/discount/entity/discount.repository';
const { ObjectId } = Types;

@Injectable()
export class DiscountService {
    constructor(
        @InjectModel(Discount.name)
        private DiscountModel: Model<DiscountDocument>,

        private readonly discountRepository: DiscountRepository,
        private readonly productRepository: ProductRepository,
    ) {}

    async createDiscountCode(payload: DiscountDto) {
        if (
            new Date() < new Date(payload.discount_start_date) ||
            new Date() > new Date(payload.discount_end_date)
        ) {
            throw new BadRequestException('Discount code has expired');
        }
        if (
            new Date(payload.discount_start_date) >=
            new Date(payload.discount_end_date)
        ) {
            throw new BadRequestException('StartDate must be before EndDate');
        }

        const foundDiscount = await this.DiscountModel.findOne({
            discount_code: payload.discount_code,
            discount_shop_id: new ObjectId(payload.discount_shop_id),
        }).lean();

        if (foundDiscount && foundDiscount.discount_is_active) {
            throw new BadRequestException('Discount exist');
        }

        const newDiscount = await this.DiscountModel.create({
            ...payload,
            discount_start_date: new Date(payload.discount_start_date),
            discount_end_date: new Date(payload.discount_end_date),
        });
        return newDiscount;
    }

    async getAllDiscountWithProduct(payload: getAllDiscountWithProductDto) {
        const foundDiscount = await this.DiscountModel.findOne({
            discount_code: payload.code,
            discount_shop_id: new ObjectId(payload.shopId),
        }).lean();

        if (!foundDiscount || !foundDiscount.discount_is_active) {
            throw new NotFoundException('Discount not exist');
        }

        const { discount_applies_to, discount_product_ids } = foundDiscount;
        let products: any;
        if (discount_applies_to === DISCOUNT_APPLICES.ALL) {
            products = await this.productRepository.findAllProduct({
                filter: {
                    product_shop: new ObjectId(payload.shopId),
                    isPublished: true,
                },
                limit: +payload.limit,
                page: +payload.page,
                sort: 'ctime',
                select: ['product_name'],
            });
        }
        if (discount_applies_to === DISCOUNT_APPLICES.SPECIFIC) {
            products = await this.productRepository.findAllProduct({
                filter: {
                    _id: { $in: discount_product_ids },
                    isPublished: true,
                },
                limit: +payload.limit,
                page: +payload.page,
                sort: 'ctime',
                select: ['product_name'],
            });
        }
    }

    async getAllDiscountByShop(payload: getAllDiscountByShopDto) {
        const discounts = await this.discountRepository.getDiscountCodeUnSelect(
            {
                limit: +payload.limit,
                page: +payload.page,
                filter: {
                    discount_shop_id: new ObjectId(payload.shopId),
                    discount_is_active: true,
                },
                unSelect: ['discount_shop_id'],
                sort: 'ctime',
            },
        );
        return discounts;
    }

    async getDiscountAmout(payload: getDiscountAmountDto) {
        const foundDiscount = await this.discountRepository.checkDiscountExist({
            filter: {
                discount_code: payload.codeId,
                discount_shop_id: new ObjectId(payload.shopId),
            },
        });
        if (!foundDiscount) {
            throw new NotFoundException('DIscount not exist');
        }

        const {
            discount_is_active,
            discount_max_uses,
            discount_min_order_value,
            discount_users_used,
            discount_start_date,
            discount_end_date,
        } = foundDiscount;

        if (!discount_is_active)
            throw new NotFoundException('Discount expried');
        if (!discount_max_uses) throw new NotFoundException('Discount are out');
        if (
            new Date() < new Date(discount_start_date) ||
            new Date() > new Date(discount_end_date)
        ) {
            throw new NotFoundException('Discount code has expried');
        }
    }
}
