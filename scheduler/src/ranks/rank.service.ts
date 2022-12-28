
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HltvRepository } from 'src/commons/repositories/hltv.repository';
import { Rank } from './rank.entity';
import { TeamDto } from './team.dto';

import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull, Not } from "typeorm";
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Sleeperutil } from 'src/commons/utils/sleeper.util';

@Injectable()
export class RankService {

    private RANK_REGIONS = {
        "United States": "United States",
        Argentina: "Argentina",
        Brazil: "Brazil",
        Bulgaria: "Bulgaria",
        "Czech Republic": "Czech Republic",
        Denmark: "Denmark",
        Finland: "Finland",
        France: "France",
        Germany: "Germany",
        Norway: "Norway",
        Poland: "Poland",
        Portugal: "Portugal",
        Sweden: "Sweden",
        Turkey: "Turkey",
        "United Kingdom": "United Kingdom",
        Russia: "Russia",
        Ukraine: "Ukraine",
        China: "China",
        Mongolia: "Mongolia",
        Australia: "Australia"
    }

    constructor(
        private readonly hltvRepository: HltvRepository,
        @InjectRepository(Rank) private repository: Repository<Rank>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
    }

    private transformToTeamDtos
        (registers, region: String = null): TeamDto[] {
        return registers.map(item => {
            return new TeamDto(item.team.id, item.team.name, item.place, region)
        })
    }

    @Cron(CronExpression.EVERY_DAY_AT_4AM)
    async saveRankByRegions() {
        try {
            this.logger.info("Getting old team by region rank")
            const oldRegionalRanks = await this.getAllRegionalRanks();

            this.logger.info("Getting teams of region rank => United state, Argentina and Brazil")
            let items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS["United States"]);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS["United States"]))

            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.Argentina);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.Argentina))

            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.Brazil);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.Brazil))

            await Sleeperutil.wait(2);

            this.logger.info("Getting teams of region rank => Bulgaria, Czech Republic and Denmark")
            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.Bulgaria);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.Bulgaria))

            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS["Czech Republic"]);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS["Czech Republic"]))

            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.Denmark);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.Denmark))

            await Sleeperutil.wait(2);

            this.logger.info("Getting teams of region rank => Finland, France and Germany")
            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.Finland);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.Finland))

            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.France);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.France))

            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.Germany);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.Germany))

            await Sleeperutil.wait(2);

            this.logger.info("Getting teams of region rank => Norway, Portugal and Sweden")
            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.Norway);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.Norway))

            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.Portugal);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.Portugal))

            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.Sweden);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.Sweden))

            await Sleeperutil.wait(2);

            this.logger.info("Getting teams of region rank => Turkey, United Kingdom and Russia")
            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.Turkey);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.Turkey))

            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS["United Kingdom"]);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS["United Kingdom"]))

            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.Russia);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.Russia))

            await Sleeperutil.wait(2);

            this.logger.info("Getting teams of region rank => Ukraine, China and Mongolia")
            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.Ukraine);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.Ukraine))

            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.China);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.China))

            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.Mongolia);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.Mongolia))

            await Sleeperutil.wait(2);

            this.logger.info("Getting teams of region rank => Australia")
            items = await this.hltvRepository.getRankByRegion(this.RANK_REGIONS.Australia);
            await this.saveMany(this.transformToTeamDtos(items, this.RANK_REGIONS.Australia))

            const ids = oldRegionalRanks.map(item => item.id.toString());
            if (ids.length > 0) {
                this.logger.info("Removing old teams of regional rank")
                await this.removeByIds(ids)
            }
            this.logger.info("Finished process to get rank by region")
        } catch (error) {
            this.logger.error(error.message)
        }
    }

    @Cron(CronExpression.EVERY_DAY_AT_2AM)
    async saveRank() {
        try {
            this.logger.info("Gettings global rank")
            const registers: TeamDto[] = await this.getRank();

            this.logger.info("Gettings global rank saved in database")
            const teamsInRank: Rank[] = await this.getAllRank();

            this.logger.info("Saving new teams on global rank table")
            await this.saveMany(registers)

            const ids: string[] = teamsInRank.map(item => item.id.toString())
            if (ids.length > 0) {
                this.logger.info(`Removing ${ids.length} old teams on global rank table`)
                await this.removeByIds(ids)
            }

            this.logger.info("Finished process to get teams the global rank")
        } catch (error) {
            this.logger.error(error.message)
        }
    }

    async getRank(): Promise<TeamDto[]> {
        const registers = await this.hltvRepository.getGlobalRank();
        return this.transformToTeamDtos(registers, null);
    }

    private removeByIds(ids: string[]) {
        return this.repository.delete(ids)
    }

    private getAllRank(): Promise<Rank[]> {
        return this.repository.find({ where: { region: null }, select: ["id"] })
    }

    private getAllRegionalRanks(): Promise<Rank[]> {
        return this.repository.find({
            where: {
                region: Not(IsNull())
            }, select: ["id"]
        })
    }

    private saveMany(teams: TeamDto[]) {
        const registers: Rank[] = teams.map(item => {
            return new Rank(null, item.name, item.place, item.externalId, item.region)
        })

        return this.repository.createQueryBuilder()
            .insert()
            .into(Rank)
            .values(registers)
            .execute()
    }

}
