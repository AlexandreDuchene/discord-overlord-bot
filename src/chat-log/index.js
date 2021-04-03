const fs = require('fs');

exports.logMessage = function(message) {
    const guild = message.guild.name;
    const channel = message.channel.name;
    const loggedAt = message.createdAt;
    const author = message.author.username;

    const date = loggedAt.getFullYear() + '-' + ("0" + (loggedAt.getMonth() + 1)).slice(-2) + '-' + ("0" + loggedAt.getDate()).slice(-2);
    const dateTime = date + ' ' + ("0" + loggedAt.getHours()).slice(-2) + ':' + ("0" + loggedAt.getMinutes()).slice(-2) + ':' + ("0" + loggedAt.getSeconds()).slice(-2);
    const logEntry = dateTime + ' ' + author + ' : ' + message.content + '\n';

    const channelPath = __dirname + '/../../logs/' + guild + '/' + channel;
    const filePath = channelPath + '/' + date + '.log';

    fs.mkdir(channelPath, { recursive: true }, error => {
        if (error) {
            console.log(error);
        } else {
            fs.appendFile(filePath, logEntry,error => {
                if (error) {
                    console.log(error);
                }
            });
        }
    });
}