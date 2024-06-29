import { InjectModel } from '@nestjs/mongoose';
import {
    Discount,
    DiscountDocument,
} from '@module/discount/entity/discount.schema';
import { Model } from 'mongoose';
import {
    getAllDiscountSelectDto,
    getAllDiscountUnSelectDto,
} from '@module/discount/dto/get-discount.dto';
import { getSelectData, getUnSelectData } from '@utils/get-data';

export class DiscountRepository {
    constructor(
        @InjectModel(Discount.name)
        private DiscountModel: Model<DiscountDocument>,
    ) {}

    async getDiscountCodeUnSelect(payload: getAllDiscountUnSelectDto) {
        const skip = (payload.page - 1) * payload.limit;
        const sortBy =
            payload.sort === 'ctime'
                ? { _id: -1 as 1 | -1 }
                : { _id: 1 as 1 | -1 };
        const discounts = await this.DiscountModel.find(payload.filter)
            .sort(sortBy)
            .skip(skip)
            .limit(payload.limit)
            .select(getUnSelectData(payload.unSelect))
            .lean();
        return discounts;
    }

    async getDiscountCodeSelect(payload: getAllDiscountSelectDto) {
        const skip = (payload.page - 1) * payload.limit;
        const sortBy =
            payload.sort === 'ctime'
                ? { _id: -1 as 1 | -1 }
                : { _id: 1 as 1 | -1 };
        const discounts = await this.DiscountModel.find(payload.filter)
            .sort(sortBy)
            .skip(skip)
            .limit(payload.limit)
            .select(getSelectData(payload.select))
            .lean();
        return discounts;
    }

    async checkDiscountExist(filter: any) {
        return await this.DiscountModel.findOne(filter).lean()
    }
}
