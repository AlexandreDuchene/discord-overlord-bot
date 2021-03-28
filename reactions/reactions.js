// YAML parsing
const fs = require('fs');
const yaml = require('js-yaml');

try {
    var reactionsMessageContains = yaml.load(fs.readFileSync(__dirname+'/messageContains.yml'));
    var reactionsByUserName = yaml.load(fs.readFileSync(__dirname+'/byUserName.yml'));
} catch (e) {
    console.log(e);
}

exports.react = function(message)
{
    // React to message content
    const words = message.content.split(' ');
    Object.keys(reactionsMessageContains).forEach(function(key) {
        if (message.content.toLowerCase().includes(key.toLowerCase())) {
            reactionsMessageContains[key].forEach(function(emojiName) {
                react(message, emojiName);
            });
        }
    });

    // React to User name
    Object.keys(reactionsByUserName).forEach(function(key) {
        if (message.author.username === key) {
            reactionsByUserName[key].forEach(function(emojiName) {
                react(message, emojiName);
            });
        }
    });

    // Automatically react if the message contains a custom emoji name
    message.guild.emojis.cache.map(emoji => emoji.name).forEach(function(emojiName) {
        if (message.content.toLowerCase().includes(emojiName.toLowerCase())) {
            react(message, ':' + emojiName + ':');
        }
    });
}

function react(message, emojiName)
{
    let reactEmoji;

    // Custom emoji starts and ends with ":"
    if (emojiName.slice(0, 1) === ':' && emojiName.slice(-1) === ':') {
        reactEmoji = message.guild.emojis.cache.find(
            emoji => emoji.name === emojiName.slice(1, -1)
        );
    } else {
        reactEmoji = emojiName;
    }

    if (reactEmoji !== undefined) {
        message.react(reactEmoji);
    }
}
