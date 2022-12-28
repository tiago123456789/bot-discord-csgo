import { Injectable } from "@nestjs/common";
import { HLTV } from "hltv"


@Injectable()
export class HltvRepository {

    getEvents() {
        return HLTV.getEvents();
    }

    getEventById(id) {
        return HLTV.getEvent({ id: id })
    }

    getGlobalRank() {
        return HLTV.getTeamRanking({})
    }

    getRankByRegion(region) {
        return HLTV.getTeamRanking({ country: region })
    }

}