// Random wisdom.js quotes
const wisdom = require("wisdom-of-chopra");

exports.executeCommand = function(message)
{
    message.channel.send(wisdom.getQuote());
}

exports.help = "displays a random quote from https://github.com/GabrielMorris/wisdom-of-chopra";
