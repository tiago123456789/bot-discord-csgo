const database = require("../configs/Database")

class EventRepository {

    getEventsHappingToday() {
        return database("events")
            .where(database.raw(`CURRENT_TIMESTAMP >= "startAt"`))
            .where(database.raw(`CURRENT_TIMESTAMP <= "endAt"`))
            .orderBy("externalId", "desc")
    }
}

module.exports = EventRepository;