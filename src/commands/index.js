const fs = require('fs');

exports.execute = function (message)
{
    if (message.content.slice(0, 1) === '!') {
        const words = message.content.split(' ');

        let commandName = words[0].slice(1);

        if (commandName.length <= 0 || commandName === 'index') {
            return;
        }

        fs.readdir(__dirname, (err, files) => {
            if (err) {
                throw err;
            }

            files.forEach(file => {
                if (file.toLowerCase().slice(0, -3) === commandName.toLowerCase()) {
                    const command = require(__dirname + '/' + file);
                    command.executeCommand(message);
                }
            });
        });
    }
}
