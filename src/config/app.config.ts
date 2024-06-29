import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

const appConfig = registerAs('app', () => ({
    port: parseInt(process.env.PORT) || 5000,
    database: {
        uri: process.env.DATABASE_URI,
        name: process.env.DATABASE_NAME,
    },
    jwt: {
        key: process.env.JWT_KEY_SECRET,
    },
}));

type AppConfig = ConfigType<typeof appConfig>;

const InjectAppConfig = () => Inject(appConfig.KEY);

export { appConfig, AppConfig, InjectAppConfig };
