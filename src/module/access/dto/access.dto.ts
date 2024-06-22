class CreateTokenDto {
    payload: any;
    publicKey: string;
    privateKey: string;
}

class RefreshTokenDto {
    refreshToken: string
    shop: any
    keyStore: any
}

export { CreateTokenDto, RefreshTokenDto }
