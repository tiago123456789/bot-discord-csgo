import { Inject, Injectable } from "@nestjs/common";
import { EventDto } from "../event.dto";
import { HltvRepository } from "../../commons/repositories/hltv.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Event } from "../entities/event.entity";
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EventService {
    constructor(
        private readonly hltvRepository: HltvRepository,
        @InjectRepository(Event) private repository: Repository<Event>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {
    }

    private async getEventIdsAlreadyExist(eventIds: String[]): Promise<Number[]> {
        const registers: Event[] = await this.repository.find({
            where: {
                externalId: In(eventIds)
            },
        })

        return registers.map(item => item.externalId)
    }

    private async getEvents(): Promise<EventDto[]> {
        const registers = await this.hltvRepository.getEvents();
        return registers.map(item => {
            const event = {
                externalId: item.id,
                name: item.name,
                startAt: new Date(item.dateStart),
                endAt: new Date(item.dateEnd),
                location: null
            };

            if (item.location != null) {
                event.location = item.location.name
            }

            return event;
        })
    }

    private saveMany(events: EventDto[]) {
        const registers: Event[] = events.map(item => {
            return new Event(
                null, item.name, item.location,
                item.externalId, item.startAt, item.endAt
            )
        })
        return this.repository.createQueryBuilder()
            .insert()
            .into(Event)
            .values(registers)
            .execute()
    }

    @Cron(CronExpression.EVERY_DAY_AT_3AM)
    async saveRecentEvents() {
        try {
            this.logger.info("Getting csgo events")
            const events: EventDto[] = await this.getEvents();
            const externalIds: String[] = events.map(item => item.externalId.toString())

            this.logger.info("Checking if events already saved")
            const externalIdsSaved = await this.getEventIdsAlreadyExist(
                externalIds
            )
            const eventsToSave: EventDto[] = events.filter(item => {
                return externalIdsSaved.indexOf(item.externalId) == -1
            })

            this.logger.info(`Saving ${eventsToSave.length} new events `)
            await this.saveMany(eventsToSave)
            this.logger.info("Finished process to get new csgo events")
        } catch (error) {
            this.logger.error(error.message)
        }
    }

}