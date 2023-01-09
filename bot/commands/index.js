const GetEventsHappingTodayCommand = require("./GetEventsHappingTodayCommand")
const GetGlobalRankCommand = require("./GetGlobalRankCommand")
const GetRankByRegionCommand = require("./GetRegionRankCommand")

module.exports = {
    "!global-rank": GetGlobalRankCommand,
    "!regional-rank": GetRankByRegionCommand,
    "!last-events": GetEventsHappingTodayCommand,
    "!subscribe": (message, args) => { message.reply("Command subscribe") },
    "!unsubscribe": (message, args) => { message.reply("Command unsubscribe") }
}