const database = require("../configs/Database")

class RankRepository {

    getGlobalRank() {
        return database("ranks")
            .where(database.raw(`region is null`))
            .orderBy("place", "asc")
    }

    getRankByRegion(region) {
        return database("ranks")
            .where("region", region)
            .orderBy("place", "asc")   
    }
}

module.exports = RankRepository;