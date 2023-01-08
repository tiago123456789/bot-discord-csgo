import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankModule } from "./ranks/rank.module"
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { BullModule } from "@nestjs/bull"
import { EventModule } from "./events/event.module"
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.registerQueue(
      {
        name: "subscribe",
        redis: {
          port: 6379,
          host: "localhost"
        }
      },
      {
        name: "unsubscribe",
        redis: {
          port: 6379,
          host: "localhost"
        }
      }
    ),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) =>
          JSON.stringify(info)
        )
      ),
      defaultMeta: { service: 'scheduler-bot-csgo' },
      transports: [
        new winston.transports.Console({ level: "info" }),
        new winston.transports.File({ filename: "./logs/error.log", level: "error" })
      ]
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<any> => {
        return {
          type: configService.get("DB_TYPE"),
          host: configService.get("DB_HOST"),
          port: configService.get("DB_PORT"),
          username: configService.get("DB_USERNAME"),
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_NAME"),
          autoLoadEntities: true,
          synchronize: true,
          logging: configService.get("ENV") == "dev" ? false : false
        };
      }
    }),
    EventModule,
    RankModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
