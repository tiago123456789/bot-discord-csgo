import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subscription } from "../entities/subscription.entity"
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Processor, Process } from '@nestjs/bull';
import { Job } from "bull"

@Processor("unsubscribe")
@Injectable()
export class UnSubcriptionService {

    constructor(
        @InjectRepository(Subscription) private subscriptionRepository: Repository<Subscription>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {
    }

    @Process()
    async unsubscribe(job: Job<Subscription>) {
        try {
            const data = job.data;
            this.logger.info("Removing subscription the user")
            const subscription = await this.subscriptionRepository.findOne({
                where: {
                    // @ts-ignore
                    userId: data.userId
                }
            })
            if (!subscription)  {
                this.logger.info("Finished because don't have subscription")
                return;
            }
            this.subscriptionRepository.remove(subscription)
            this.logger.info("Finished process to remove subscription")
        } catch (error) {
            this.logger.error(error.message)
        }
    }
}