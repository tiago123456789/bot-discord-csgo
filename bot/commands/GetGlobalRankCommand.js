const rankFactory = require("../factories/RankFactory")

module.exports = async (discordClient, args) => {
    const rankService = rankFactory();
    const teamsInGlobalRank = await rankService.getGlobalRank()
    const message = teamsInGlobalRank.map(item => {
        return `${item.place}º ${item.name}`
    }).join("\n")

    return discordClient.reply(message)
}