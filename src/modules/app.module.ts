import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { KnexModule } from './knex';
import { TestModule } from './test';
import { APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TransformInterceptor } from 'src/interceptors/transform';
import { ErrorInterceptor } from 'src/interceptors/error';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        APP_PORT: Joi.number().required(),
      })
    }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () =>{
        return {
          config: {
            client: 'pg',
            connection: {
              host: process.env.DB_HOST,
              port: Number(process.env.DB_PORT),
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              applicationName: 'test_service',
            }
          }
        }
      }
    }),
    TestModule,
    RouterModule.register([
      { path: 'test', module: TestModule}
    ])
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ErrorInterceptor,
  }],
})
export class AppModule {}