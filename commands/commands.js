const fs = require('fs');

exports.executeCommand = function (message)
{
    if (message.content.slice(0, 1) === '!') {
        const words = message.content.split(' ');

        let commandName = words[0].slice(1);

        if (commandName.length <= 0) {
            return;
        }

        fs.readdir(__dirname, (err, files) => {
            if (err) {
                throw err;
            }

            files.forEach(file => {
                if (file.toLowerCase().startsWith(commandName.toLowerCase())) {
                    const command = require(__dirname + '/' + file);
                    command.executeCommand(message);
                }
            });
        });
    }
}
