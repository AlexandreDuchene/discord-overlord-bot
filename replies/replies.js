// YAML parsing
const fs = require('fs');
const yaml = require('js-yaml');

try {
    var replyMessageContains = yaml.load(fs.readFileSync(__dirname+'/messageContains.yml'));
    var replyByUserNameMessageContainsExactWords = yaml.load(fs.readFileSync(__dirname+'/byUserNameMessageContainsExactWords.yml'));
} catch (e) {
    console.log(e);
}

exports.reply = function(message)
{
    // We convert to Set then back to array to remove duplicates
    let words = [...new Set(message.content.split(' '))];

    // Reply to message content
    Object.keys(replyMessageContains).forEach(function(triggerWord) {
        if (message.content.toLowerCase().includes(triggerWord.toLowerCase())) {
            replyMessageContains[triggerWord].forEach(function(replyMessage) {
                reply(message, replyMessage);
            });
        }
    });

    // React to message content, matching exact word (case insensitive)
    words.forEach(function (word) {
        // Reply if sent by specific user name
        for (const userName in replyByUserNameMessageContainsExactWords) {
            if (message.author.username.toLowerCase() === (userName.toLowerCase())) {
                for (const triggerMessage in replyByUserNameMessageContainsExactWords[userName]) {
                    if (word.toLowerCase() === triggerMessage.toLowerCase()) {
                        replyByUserNameMessageContainsExactWords[userName][triggerMessage].forEach(function (replyMessage) {
                            reply(message, replyMessage);
                        });
                    }
                }
            }
        }
    });
}

function reply(message, replyMessage)
{
    // Replies starting with "/" are images
    if (replyMessage.slice(0, 1) === '/') {
        message.channel.send('', {
            files: [__dirname + '/..' + replyMessage]
        });
    } else {
        message.channel.send(replyMessage);
    }
}
