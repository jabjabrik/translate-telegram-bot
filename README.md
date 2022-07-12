# translate-telegram-Bot-nodejs
This is a bot translator on Telegram. (NodeJS)
bot demo [@TranslatoApiBot](https://t.me/TranslatoApiBot)

### Available Bot Commands
- `/start` Start bot
- `/setlang` set language to translate

### Required 
- Node.js `v12x` or later
- Telegram account 
- AWS account

## Get Started

1.  Install serverless via npm

```
$ npm install -g serverless
$ npm install
```

2. Create a bot from Telegram, sending this message to [@BotFather](https://t.me/BotFather)
```
$ /newbot
```


3. Put the token received into a file called `handler.js`.
```
const token = "YOUR_API_TOKEN";
```
4. Run Locally
uncomment this code on handler.js
`// telegram(bot);`
`// bot.launch();`
```
$ node handler
```
5. Deploy it!
```
$ serverless deploy
```

6. Configure webhook
```
curl --request POST --url https://api.telegram.org/bot{token}/setWebhook --header 'content-type: application/json' --data '{"url": "{end-point}"}'
```
example:
`curl --request POST --url https://api.telegram.org/bot1845938332:5tXPT7mvH9EkmmWpszev9KwFDUmdfgMyDfw/setWebhook --header 'content-type: application/json' --data '{"url": "https://luoj5fga9.execute-api.us-east-1.amazonaws.com/dev/webhook"}'`
