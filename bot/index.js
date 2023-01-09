require('dotenv').config({ path: ".env" })
const Queue = require('bull');

const bot = require("./configs/Bot")
const database = require("./configs/Database")
const commands = require("./commands/index");
const EventService = require('./services/EventService');
const EventRepository = require('./repositories/EventRepository');

// const subscribeQueue = new Queue('subscribe', 'redis://127.0.0.1:6379');
// const unSubscribeQueue = new Queue('unsubscribe', 'redis://127.0.0.1:6379');

// // unSubscribeQueue.add({ userId: "1278195288139890689" })
// subscribeQueue.add({ userId: "1278195288139890689" })


// var cacheManager = require('cache-manager');
// var ioRedisStore = require('cache-manager-redis-store')

// var redisCache = cacheManager.caching(ioRedisStore, {
//     host: 'localhost', // default value
//     port: 6380, // default value
// });

async function startApplication() {
    bot(async message => {
        const args = message.content.split(/\s/)
        const commandTyped = args[0]

        if (commands[commandTyped]) {
            await commands[commandTyped](message, args.slice(1))
        }
    });

}

startApplication();

