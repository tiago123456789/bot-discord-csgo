const rankFactory = require("../factories/RankFactory")

module.exports = async (discordClient, args) => {
    try {
        const rankService = rankFactory();
        const region = args[0]
        const teamsInRegionRank = await rankService.getRankByRegion(region)
        let message = teamsInRegionRank.map(item => {
            return `${item.place}º ${item.name}`
        }).join("\n")

        if (teamsInRegionRank.length == 0) {
            message = "Sorry, but is no possible return this region rank"
        }
        return discordClient.reply(message)
    } catch (error) {
        discordClient.reply(error.message)
    }

}