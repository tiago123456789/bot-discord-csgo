import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HltvRepository } from 'src/commons/repositories/hltv.repository';
import { Event } from './entities/event.entity';
import { EventService } from './services/event.service';
import { Subscription } from "./entities/subscription.entity"
import { DiscordService } from './services/discord.service';
import { SubscriptionService } from './services/subscription.service';
import { UnSubcriptionService } from './services/unsubscription.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Subscription])
  ],
  controllers: [],
  providers: [HltvRepository, EventService, DiscordService, SubscriptionService, UnSubcriptionService],
  exports: []
})
export class EventModule { }
