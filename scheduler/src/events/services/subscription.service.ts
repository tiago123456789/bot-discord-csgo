import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "../entities/event.entity";
import { Subscription } from "../entities/subscription.entity"
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Processor, Process } from '@nestjs/bull';
import { Job } from "bull"
import * as dayjs from "dayjs"
import { DiscordService } from "./discord.service";

@Processor("subscribe")
@Injectable()
export class SubscriptionService {

    constructor(
        @InjectRepository(Event) private eventRepository: Repository<Event>,
        @InjectRepository(Subscription) private subscriptionRepository: Repository<Subscription>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly discordService: DiscordService
    ) {
    }

    private async getMessageToNotify(): Promise<String> {
        const currentDate = new Date();
        const registers = await this.eventRepository.createQueryBuilder()
            .where(' :current_date >= "startAt" ', { "current_date": currentDate })
            .andWhere(' :current_date <= "endAt" ', { "current_date": currentDate })
            .getMany();

        if (registers.length == 0) {
            return null;
        }

        let message = `Hi, my friend! The following events happening:`
        const events = registers
            .map(item => `**Event => ${item.name} | Start at => ${dayjs(item.startAt).format("DD/MM/YYYY HH:mm")} | End at => ${dayjs(item.endAt).format("DD/MM/YYYY HH:mm")}**`)
            .join("\n")

        message += `\n${events}`;

        return message;
    }

    @Cron(CronExpression.EVERY_DAY_AT_9AM)
    async notifyHasEventsToUsers() {
        try {
            this.logger.info("Getting user to notify about events")
            const subscriptions = await this.subscriptionRepository.find({})
            this.logger.info("Getting message about events to notify subscribers")
            const message: String = await this.getMessageToNotify()

            if (!message) {
                this.logger.info("Finished because don't have events")
                return;
            }

            for (let index = 0; index < subscriptions.length; index++) {
                const subscription = subscriptions[index];
                this.discordService.sendMessageToUser(
                    subscription.userId, message
                )
            }

            this.logger.info("Finished process to notify user about events")
        } catch (error) {
            this.logger.error(error.message)
        }
    }

    @Process()
    async subscribeNewUser(job: Job<Subscription>) {
        try {
            const data = job.data;
            this.logger.info("Saving subscription to new user")
            const subscription = new Subscription(null, data.userId)
            await this.subscriptionRepository.insert(subscription)
            this.logger.info("Finished process to save subscription to new user")
        } catch (error) {
            this.logger.error(error.message)
        }
    }

    

}