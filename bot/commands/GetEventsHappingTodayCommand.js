const eventFactory = require("../factories/EventFactory")

module.exports = async (discordClient, args) => {
    const eventService = eventFactory()
    const events = await eventService.getEventsHappingToday()
    let message = events.map(item => {
        return `Name: ${item.name} | Start at => ${item.startAt} | endAt ${item.endAt}`
    }).join("\n")

    return discordClient.reply(message)
}