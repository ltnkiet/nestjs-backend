class CreateTokenDto {
    payload: any;
    publicKey: string;
    privateKey: string;
}

class HandleRefreshTokenDto {
    refreshToken: string;
    shop: any;
    keyStore: any;
}

export { CreateTokenDto, HandleRefreshTokenDto };
