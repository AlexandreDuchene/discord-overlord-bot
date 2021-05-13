const Discord = require('discord.js');
const wowheadFetch = require('wowhead-fetch');
const parser = wowheadFetch.parser;
const iconEndPoint = 'https://wow.zamimg.com/images/wow/icons/large/';
const fs = require('fs');
const yaml = require('js-yaml');

try {
    var wowheadTranslations = yaml.load(fs.readFileSync(__dirname + '/../../translation/wowhead.yml'));
} catch (e) {
    console.log(e);
}

exports.executeCommand = function(message)
{

    const words = message.content.split(' ');

    wowheadFetch.apis.classic.fetchItem(words[1], 'fr')
        .then((item) => {
            const name = item.name.toString();
            const url = item.link.toString();
            const image = iconEndPoint + item.icon[0]._ + '.jpg';
            const json = parser.extractJsonData(item);

            let messageEmbed = new Discord.MessageEmbed()
                .setTitle(name)
                .setURL(url)
                .setThumbnail(image)
            ;

            if (json.hasOwnProperty('quality')) {
                messageEmbed.setColor(wowheadTranslations['quality'][json['quality']]);
            }

            // if (json.hasOwnProperty('level')) {
            //     messageEmbed.addField(wowheadTranslations['level'], json['level']);
            // }

            for (const prop in json) {
                if (json.hasOwnProperty(prop)) {
                    messageEmbed.addField(prop, json[prop], true);
                }
            }

            message.channel.send(messageEmbed);
        });
}

exports.help = "work in progress - be patient :)";
