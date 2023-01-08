
class EventService {

    constructor(eventRepository) {
        this.eventRepository = eventRepository;
        this.getEventsHappingToday = this.getEventsHappingToday.bind(this)
    }

    getEventsHappingToday() {
        return this.eventRepository.getEventsHappingToday()
    }
}

module.exports = EventService