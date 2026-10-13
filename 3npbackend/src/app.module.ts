import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './Users/Admin/admin.module';
import { DistributorModule } from './Users/Distributor/distributor.module';
import { IndustryModule } from './Users/Industry/industry.module';
import { UserModule } from './Users/User/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';


@Module({
    imports: [
        CacheModule.register({
                  ttl: 3600,
                  max: 100,
                  isGlobal: true
                }),
        AdminModule, DistributorModule, IndustryModule,UserModule, 
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST', 'localhost'),
                port: config.get<number>('DB_PORT', 5432),
                username: config.getOrThrow<string>('DB_USERNAME'),
                password: config.getOrThrow<string>('DB_PASSWORD'),
                database: config.getOrThrow<string>('DB_NAME'),
                autoLoadEntities: true,
                // Auto-creates/alters tables. Fine for local dev, turn off (DB_SYNCHRONIZE=false) elsewhere.
                synchronize: config.get<string>('DB_SYNCHRONIZE', 'true') === 'true',
            }),
        }),
        
    ],
    controllers: [],
    providers: [
        
    ],
})

export class AppModule {}