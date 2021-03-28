// YAML parsing
const fs = require('fs');
const yaml = require('js-yaml');

try {
    var reactionsMessageContains = yaml.load(fs.readFileSync(__dirname+'/messageContains.yml'));
    var reactionsMessageContainsExactWords = yaml.load(fs.readFileSync(__dirname+'/messageContainsExactWords.yml'));
    var reactionsByUserName = yaml.load(fs.readFileSync(__dirname+'/byUserName.yml'));
} catch (e) {
    console.log(e);
}

exports.react = function(message)
{
    // We convert to Set then back to array to remove duplicates
    let words = [...new Set(message.content.split(' '))];

    // React to message content, matching exact word (case insensitive)
    words.forEach(function (word) {
        Object.keys(reactionsMessageContainsExactWords).forEach(function(key) {
            if (word.toLowerCase() === key.toLowerCase()) {
                reactionsMessageContainsExactWords[key].forEach(function(emojiName) {
                    react(message, emojiName);
                });
            }
        });

        // Automatically react if the message contains a custom emoji name
        message.guild.emojis.cache.map(emoji => emoji.name).forEach(function(emojiName) {
            if (word.toLowerCase() === emojiName.toLowerCase()) {
                react(message, ':' + emojiName + ':');
            }
        });
    });

    // React to message content
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
