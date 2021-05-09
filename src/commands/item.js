const Discord = require('discord.js');
const wowheadFetch = require('wowhead-fetch');
const parser = wowheadFetch.parser;
const iconEndPoint = 'https://wow.zamimg.com/images/wow/icons/large/';

exports.executeCommand = function(message)
{
    const words = message.content.split(' ');

    wowheadFetch.apis.classic.fetchItem(words[1], 'fr')
        .then((item) => {
            const name = item.name.toString();
            const url = item.link.toString();
            const image = iconEndPoint + item.icon[0]._ + '.jpg';
            const json = parser.extractJsonData(item);

            console.log(json);
            embedMessage = new Discord.MessageEmbed()
                .setTitle(name)
                .setURL(url)
                .setThumbnail(image)
            ;
            message.channel.send(embedMessage);
        });
}

exports.help = "work in progress - be patient :)";
