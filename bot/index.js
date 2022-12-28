const { HLTV, BestOfFilter } = require('hltv')
const Queue = require('bull');

const subscribeQueue = new Queue('subscribe', 'redis://127.0.0.1:6379');
subscribeQueue.add({ userId: "1278195288139890689" })
// get events
// HLTV.getEvents().then(console.log)

// get event details
// HLTV.getEvent({ id: 6926 }).then((data) => console.log({
//     teams: data.teams,
//     mapPool: data.mapPool,
//     formats: data.formats,
//     name: data.name,
//     startAt: new Date(data.dateStart),
//     endAt: new Date(data.dateEnd),
//     location: data.location,
//     numberOfTeams: data.numberOfTeams,
//     prizePool: data.prizePool
// }))

// Get news
// const currentDate = new Date();
// const months = {
//     0: "january", 1: 'february', 3: 'march',
//     4: 'april', 5: 'may', 6: 'june', 7: 'july',
//     7: 'august', 8: 'september', 9: 'october',
//     10: 'november', 11: 'december'
// };
// HLTV.getNews({ 
//     year: currentDate.getFullYear(), 
//     month: months[currentDate.getMonth()] 
// }).then(console.log)

// Get team ranking the best 30 teams csgo
// const currentDate = new Date();
// console.log(currentDate.getFullYear())
// HLTV.getTeamRanking({})
//     .then(console.log)

// Get team ranking by region
// HLTV.getTeamRanking({ country: 'Russia' })
//     .then(console.log)

// HLTV.getMatches({ eventIds: 6965 }).then(console.log)

// Get all details one event by id
// // HLTV.getResults({ eventIds: [6965] }).then(console.log)

// const LINK_AUTH_BOT_IN_SERVER = 'https://discord.com/api/oauth2/authorize?client_id=1057278569589526658&permissions=8&scope=bot'
// const TOKEN = 
// const { Client, Intents } = require('discord.js');
// const client = new Client({
//     intents: [
//         Intents.FLAGS.GUILDS,
//         Intents.FLAGS.GUILD_MESSAGES,
//         Intents.FLAGS.MESSAGE_CONTENT,
//         Intents.FLAGS.DIRECT_MESSAGES
//     ]
// });

// const clientsSubscribed = [];

// const command = {
//     "!global-rank": (message, args) => {},
//     "!regional-rank": (message, args) => {},
//     "!last-events": (message, args) => {},
//     "!last-events": (message, args) => {},
//     "!subscribe": (message, args) => {}
// };

// (async () => {
//     client.on('ready', () => {
//         console.log(`Logged in as ${client.user.tag}!`);
//         // client.application.commands.create({
//         //     name: 'global_rank',
//         //     description: 'Show csgo global rank',
//         // })
//         // client.application.commands.create({
//         //     name: 'regional_rank',
//         //     description: 'Show csgo regional rank'
//         // })
//         // client.application.commands.create({
//         //     name: 'last-events',
//         //     description: 'Show csgo events the last month',
//         // })
//         // client.application.commands.create({
//         //     name: 'subscribe',
//         //     description: 'You will receive notification when have csgo events',
//         // })
//     });

//     // client.on("interactionCreate", async (interation) => {
//     //      if (!interation.isCommand()) return;

//     //      console.log(interation)
//     //     if (interation.commandName === 'subscribe') {
//     //         clientsSubscribed.push(interation.user.id)
//     //         await interation.reply('Ok!');
//     //     }
//     // })

//     client.on('message', async message => {
//         if (message.author.bot) {
//             return;
//         }
//         const args = message.content.split(/\s/)
//         const command = args[0]
//         console.log(args)
//         // console.log("@@@@@@@@@@@@@@@@@@@@@")
//         // console.log("@@@@@@@@@@@@@@@@@@@@@")
//         // console.log("@@@@@@@@@@@@@@@@@@@@@")
//         // console.log(message)
//         // console.log(message.content)
//         // console.log(message.cleanContent)



//     });

//     // setInterval(() => {
//     //     console.log(clientsSubscribed)
//     // }, 3000)


//     client.login(TOKEN).then(() => {
//         // client.users.fetch("278195288139890689").then(user => {
//         //     user.send("Hi user")
//         // })
//         // console.log("afsdfsa")
//         // console.log("afsdfsa")
//     });

// })()

