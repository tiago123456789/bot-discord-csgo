const APP = require("../constants/App")

class RankService {

    constructor(rankRepository) {
        this.rankRepository = rankRepository;
    }

    getGlobalRank() {
        return this.rankRepository.getGlobalRank()
    }

    getValidRegions() {
        return Object.keys(APP.RANK_REGIONS).map(region => APP.RANK_REGIONS[region])
    }

    getRankByRegion(region) {
        if (!APP.RANK_REGIONS[region]) {
            const validRegions = this.getValidRegions().join(", ")
            throw new Error(`You typed invalid region. Valid regions: ${validRegions}`)
        }
        return this.rankRepository.getRankByRegion(region);
    }
}

module.exports = RankService