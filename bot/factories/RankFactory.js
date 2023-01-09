const RankRepository = require("../repositories/RankRepository")
const RankService = require("../services/RankService")

module.exports = () => {
    const rankRepository = new RankRepository()
    const rankService = new RankService(
        rankRepository
    ) 

    return rankService;
}