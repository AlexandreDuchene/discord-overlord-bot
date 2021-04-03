const fs = require('fs');

exports.executeCommand = function(message)
{
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            throw err;
        }

        let msg = '====== LIST OF COMMANDS ======';

        files.forEach(file => {
            if (file !== 'index.js') {
                const command = require(__dirname + '/' + file);

                msg += '\n`!' + file.toLowerCase().slice(0, -3) + '` : ' + command.help;
            }
        });

        message.author.send(msg);
    });
}

exports.help = "displays this help message";
