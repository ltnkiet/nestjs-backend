import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
import { KeyService } from '@module/key/key.service';
import { HEADER } from '@enum/header.enum';
import { CustomJwtPayload } from '@interface/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly keyService: KeyService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const shopId = request.headers[HEADER.CLIENT_ID];

        if (!shopId) {
            throw new UnauthorizedException('Invalid Request');
        }

        const keyStore = await this.keyService.findByShopId(shopId);
        if (!keyStore) {
            throw new NotFoundException('Not found keyStore');
        }

        if (request.headers[HEADER.REFRESHTOKEN]) {
            try {
                const refreshToken = request.headers[HEADER.REFRESHTOKEN];
                const decodeShop = JWT.verify(
                    refreshToken,
                    keyStore.privateKey,
                ) as CustomJwtPayload;

                if (shopId !== decodeShop.shopId) {
                    throw new UnauthorizedException('Invalid shopId');
                }

                request.keyStore = keyStore;
                request.shop = decodeShop;
                request.refreshToken = refreshToken;

                return true;
            } catch (error) {
                throw new UnauthorizedException(error.message);
            }
        }

        const accessToken = request.headers[HEADER.AUTHORIZATION];
        console.log(accessToken)
        if (!accessToken) {
            throw new UnauthorizedException('Invalid Token');
        }

        try {
            const decodeShop = JWT.verify(
                accessToken,
                keyStore.publicKey,
            ) as CustomJwtPayload;
            
            if (shopId !== decodeShop.shopId) {
                throw new UnauthorizedException('Invalid shopId');
            }

            request.keyStore = keyStore;
            request.shop = decodeShop;

            return true;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
