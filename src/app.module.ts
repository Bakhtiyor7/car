import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Report } from './reports/entities/report.entity';
import { APP_PIPE } from '@nestjs/core';
import * as process from 'process';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm.config';
const cookieSession = require('cookie-session');
const dbConfig = require('../ormconfig.js');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //this way we are making Pipe a global middleware, which means it is applied to every request comes into our application
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  //this way we are making cookie session a global middleware, which means it is applied to every request comes into our application
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
