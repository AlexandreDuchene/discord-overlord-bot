// Get env variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Init Discord
const Discord = require('discord.js');
const client = new Discord.Client();

// Custom bot behaviour
const chatLog = require('./src/chat-log/index')
const commands = require('./src/commands/index')
const reactions = require('./src/reactions/index');
const replies = require('./src/replies/index');
const messageDelete = require('./src/messageDelete/index');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', message => {
    if (message.guild !== null) {
        reactions.react(message);
        chatLog.logMessage(message);
        commands.execute(message);
    }
    if (!message.author.bot) {
        replies.reply(message);
    }
});

client.on('messageDelete', message => {
    if (!message.author.bot) {
        // messageDelete.shameDeleted(message);
    }
});

client.login(process.env.BOT_TOKEN);

// To run the bot :
// nodemon --inspect index.js
