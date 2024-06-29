import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDto } from '../dto/access.dto';

@Injectable()
export class AccessRepository {
    constructor(private jwtService: JwtService) {}

    async createTokenPair(data: CreateTokenDto) {
        const accessToken = this.jwtService.sign(data.payload, {
            secret: data.publicKey,
            expiresIn: '3d',
        });
        const refreshToken = this.jwtService.sign(data.payload, {
            secret: data.privateKey,
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    }
}
