import { Injectable } from "@nestjs/common";
import { Client, Intents } from 'discord.js'

@Injectable()
export class DiscordService {

    private client: Client;

    constructor() {
        this.client = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.MESSAGE_CONTENT,
                Intents.FLAGS.DIRECT_MESSAGES
            ]
        });
        this.client.login(process.env.DISCORD_TOKEN)
    }

    async sendMessageToUser(userId: String, message: String) {
        const user = await this.client.users.fetch(userId.toString())
        return user.send(message.toString());
    }
}