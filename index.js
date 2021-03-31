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

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', message => {
    if (message.guild !== null) {
        reactions.react(message);
    }
    if (!message.author.bot) {
        chatLog.logMessage(message);
        commands.execute(message);
        replies.reply(message);
    }
});

client.login(process.env.BOT_TOKEN);

// To run the bot :
// nodemon --inspect index.js
