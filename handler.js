const { Telegraf } = require('telegraf');
const { telegram } = require('./src/telegram');
const token = 'YOUR_API_TOKEN';
const bot = new Telegraf(token);

// telegram(bot);
// bot.launch().then(() => console.log('bot is ready'));

module.exports.webhook = (event, context, callback) => {
    const body = JSON.parse(event.body);
    bot.handleUpdate(body);
    telegram(bot);


    const response = {
        statusCode: 200,
        body: JSON.stringify({
            input: event,
        }),
    };

    return callback(null, response);

};