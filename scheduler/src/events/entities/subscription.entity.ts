import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("subscriptions")
export class Subscription {

    @PrimaryGeneratedColumn()
    id: String;

    @Column({ name: "user_id", length: 255, nullable: false })
    userId: String;

    constructor(
        id: null, userId: String
    ) {
        this.id = id;
        this.userId = userId;
    }

}