
export class TeamDto {

    externalId: Number;
    name: String;
    place: Number;
    region: String;

    constructor(externalId: Number, name: String, place: Number, region: String = null) {
        this.externalId = externalId;
        this.name = name;
        this.place = place;
        this.region = region;
    }
}