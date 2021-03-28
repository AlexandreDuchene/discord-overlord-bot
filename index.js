// Get env variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Init Discord
const Discord = require('discord.js');
const client = new Discord.Client();

// Custom bot behaviour
const commands = require('./commands/commands')
const reactions = require('./reactions/reactions');
const replies = require('./replies/replies');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.guild !== null) {
        reactions.react(message);
    }
    if (!message.author.bot) {
        commands.executeCommand(message);
        replies.reply(message);
    }
});

client.login(process.env.BOT_TOKEN);

// To run the bot :
// nodemon --inspect index.js
