const fetchAll = require('discord-fetch-all');

exports.executeCommand = function(message)
{
    const words = message.content.split(' ');

    if (words.length <2 ) {
        message.author.send("Please provide an expression to search, for example :\n`!count textToSearch` or `!count \"caseSensitiveSearch\"`");

        return;
    }

    let expression = words.slice(1).join(' ');
    let exactSearch = false;
    if (expression.slice(0, 1) === '"' && expression.slice(-1) === '"') {
        expression = expression.slice(1, -1);
        if (expression.length <= 0) {
            message.author.send("Please provide an expression to search, for example :\n`!count textToSearch` or `!count \"caseSensitiveSearch\"`");

            return;
        }

        exactSearch = true;
    }

    fetchAll.messages(message.channel)
        .then(channelMessages => {
            var count = {};
            var totalCount = 0;

            channelMessages.forEach(function(channelMessage) {
                if (channelMessage.author.bot) {
                    return;
                }

                // const words = channelMessage.content.split(/[\s,\r]+/);
                //
                // words.forEach(function(word) {
                //     if ((exactSearch && word === searchWord) || (!exactSearch && word.toLowerCase() === searchWord.toLowerCase())) {
                //         if (channelMessage.author.username in count) {
                //             count[channelMessage.author.username]++;
                //         } else {
                //             count[channelMessage.author.username] = 1;
                //         }
                //
                //         totalCount++;
                //     }
                // });

                if ((exactSearch && channelMessage.content.includes(expression)) || (!exactSearch && channelMessage.content.toLowerCase().includes(expression.toLowerCase()))) {
                    if (channelMessage.author.username in count) {
                        count[channelMessage.author.username]++;
                    } else {
                        count[channelMessage.author.username] = 1;
                    }

                    totalCount++;
                }
            });

            let msg = 'Expression `' + expression + '` has been found `' + totalCount + '` times in this channel.';

            // Sorting with an array
            let countArray = []

            for (const username in count) {
                countArray.push([username, count[username]])
            }

            countArray.sort((a, b) => {
                return b[1] - a[1];
            });

            countArray.forEach(usernameCount => {
                msg += '\n' + usernameCount[0] + ' : `' + usernameCount[1] + '`'
            });

            message.channel.send(msg);
        });

    message.channel.send('⏲ Searching messages, please wait a moment ⏲')
}

exports.help = "count words from a channel";

