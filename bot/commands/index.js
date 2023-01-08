const GetEventsHappingTodayCommand = require("./GetEventsHappingTodayCommand")

module.exports = {
    "!global-rank": (message, args) => { message.reply("Command global-rank") },
    "!regional-rank": (message, args) => { message.reply("Command regional-rank") },
    "!last-events": GetEventsHappingTodayCommand,
    "!subscribe": (message, args) => { message.reply("Command subscribe") },
    "!unsubscribe": (message, args) => { message.reply("Command unsubscribe") }
}