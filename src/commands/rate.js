const client = require('https');
const pretty = require('pretty-number');
pretty.fractSign = ', ';

const endPoint = 'https://api.cryptonator.com/api/ticker/';

exports.executeCommand = function(message)
{
    const words = message.content.split(' ');

    let currency = 'btc';

    if (words[1] !== undefined) {
        currency = words[1].toLowerCase();
    }

    if (currency === 'malka') {
        message.channel.send("Worst currency ever. Do NOT buy.");
        return;
    }

    const url = endPoint + currency + '-eur';

    client.get(url, (result) => {
        const { statusCode } = result;

        if (statusCode !== 200) {
            result.resume();

            console.log(
                'Request GET ' + url + ' failed.\n' +
                'Status Code:' + statusCode
            );
        }

        result.setEncoding('utf8');
        let rawData = '';
        result.on('data', (chunk) => { rawData += chunk; });
        result.on('end', () => {
            try {
                const json = JSON.parse(rawData);

                if (!json.success) {
                    console.log(
                        'Request GET ' + url + ' failed.\n' +
                        'Error: ' + rawData
                    );
                    return;
                }

                message.channel.send('1 ' + json.ticker.base + ' = ' + pretty(Math.round(json.ticker.price * 100) / 100) + ' ' + json.ticker.target);
            } catch (e) {
                console.log(
                    'Request GET ' + url + ' failed.\n' +
                    'Error: ' + e.message
                );
            }
        });
    }).on('error', (e) => {
        console.log(
            'Request GET ' + url + ' failed.\n' +
            'Error: ' + e.message
        );
    });
}

exports.help = "get currency exchange rates. Go to https://www.cryptonator.com/converter/ for a list of currencies";
