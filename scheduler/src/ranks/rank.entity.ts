import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ranks", {
    orderBy: {
        place: "ASC",
    }
})
export class Rank {

    @PrimaryGeneratedColumn()
    id: String;

    @Column({ length: 150, nullable: false })
    name: String;

    @Column({ length: 150, nullable: true })
    region: String;

    @Column({ nullable: false })
    externalId: Number;

    @Column({ nullable: false })
    place: Number;

    constructor(id: null, name: String, place: Number, externelId: Number, region: String) {
        this.id = id;
        this.name = name;
        this.place = place;
        this.externalId = externelId;
        this.region = region;
    }

}