const eventFactory = require("../factories/EventFactory")
const dayjs = require("dayjs")

module.exports = async (discordClient, args) => {
    const eventService = eventFactory()
    const events = await eventService.getEventsHappingToday()
    let message = events.map(item => {
        item.startAt = dayjs(item.startAt).format("DD/MM/YYYY HH:mm")
        item.endAt = dayjs(item.endAt).format("DD/MM/YYYY HH:mm")
        return `Name: ${item.name} | Start at => ${item.startAt} | endAt ${item.endAt}`
    }).join("\n")

    return discordClient.reply(message)
}