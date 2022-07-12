const translate = require('translation-google');
const { langs } = require('./langs.js');

module.exports.telegram = (bot) => {
    let codeLang = 'en';

    bot.start(ctx => {
        ctx.replyWithChatAction('typing');
        const { first_name } = ctx.chat;
        const { id } = ctx.chat;
        bot.telegram.sendMessage(id, ` Welcome ${first_name}🖐🖐, Send me a text and I'll translate it for you! \nSelect the language to translate. Your current default language is: <code>detect language</code> &gt&gt <code>${getNameLang()}</code>\n/setlang to change language settings`, {
            parse_mode: 'HTML'
        });
    });

    bot.command('setlang', async ctx => {
        const id = ctx.chat.id;
        bot.telegram.sendMessage(id, `please choose language to translate. Your current language is <code>detect language</code>  &gt&gt  <code>${codeLang}</code> - <code>${getNameLang()}</code>`, {
            reply_markup: { inline_keyboard: pageOption() },
            parse_mode: 'HTML'
        });
    });


    bot.action(['next', 'previous'], async ctx => {
        const { id } = ctx.chat;
        const { message_id } = ctx.callbackQuery.message;
        const cb = ctx.callbackQuery.data;
        bot.telegram.editMessageText(id, message_id, undefined, `please choose language to translate. Your current language is <code>detect language</code>  &gt&gt  <code>${codeLang}</code> - <code>${getNameLang()}</code>`, {
            reply_markup: { inline_keyboard: pageOption(cb) },
            parse_mode: 'HTML'
        });
    });


    bot.on("callback_query", async (ctx) => {
        const id = ctx.chat.id;
        const { message_id } = ctx.callbackQuery.message;
        codeLang = ctx.callbackQuery.data;
        bot.telegram.editMessageText(id, message_id, undefined, `Your current language: <code>detect language</code>  &gt&gt  <code>${codeLang}</code> - <code>${getNameLang()}</code>`, {
            parse_mode: 'HTML'
        });
    });

    bot.on('text', async ctx => {
        ctx.replyWithChatAction('typing');
        const { id } = ctx.chat;
        const { text } = ctx.message;
        const textAfterTranslate = await TranslatorApi(text);
        bot.telegram.sendMessage(id, `<i>Translated from <code>${textAfterTranslate.code}</code> - <code>${textAfterTranslate.language}</code>  to  <code>${codeLang}</code> - <code>${getNameLang()}</code></i>\n\n\n<code>${textAfterTranslate.text}</code >`, {
            parse_mode: 'HTML'
        });
    });

    const pageOption = cb => {
        const el = [];
        let el2 = [];
        for (let i = 0; i < langs.length; i++) {
            el2.push(langs[i]);
            if (el2.length === 3) {
                el.push(el2);
                el2 = [];
            };
        };
        const page = [
            { callback_data: 'next', text: 'next -->' },
            { callback_data: 'previous', text: '<-- previous' },
        ]


        let firstPage = true;

        if (cb === 'next') {
            firstPage = false;
        } else if (cb === 'previous') {
            firstPage = true;
        }

        const data = firstPage ? el.slice(0, el.length / 2) : el.slice(el.length / 2, el.length);
        data.push([firstPage ? page[0] : page[1]]);
        return data;
    }

    const getNameLang = (code = codeLang) => langs.find(lang => lang.callback_data === code).text;

    const TranslatorApi = async (text) => {
        try {
            const res = await translate(text, { to: codeLang });
            const language = getNameLang(res.from.language.iso);
            const code = res.from.language.iso;
            return { text: res.text, language, code };

        } catch (error) {
            console.log(error);
        };
    };
};