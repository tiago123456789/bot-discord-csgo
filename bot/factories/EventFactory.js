const EventRepository = require("../repositories/EventRepository");
const EventService = require("../services/EventService");

module.exports = () => {
    const eventRepository = new EventRepository();
    const eventService = new EventService(eventRepository);

    return eventService;
}