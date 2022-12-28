import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("events")
export class Event {

    @PrimaryGeneratedColumn()
    id: String;

    @Column({ length: 255, nullable: false })
    name: String;

    @Column({ length: 255, nullable: true })
    location: String;

    @Column({ nullable: true })
    externalId: Number;

    @Column({ type: 'timestamp', nullable: false })
    startAt: Date;

    @Column({ type: 'timestamp', nullable: false })
    endAt: Date;

    constructor(
        id: null, name: String, location: String, 
        externelId: Number, startAt: Date, endAt: Date,
    ) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.externalId = externelId;
        this.startAt = startAt;
        this.endAt = endAt;
    }

}