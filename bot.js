const { Telegraf, Router, Context, Markup } = require("telegraf");
const LocalSession = require("telegraf-session-local");
const { message } = require("telegraf/filters");

const bot = new Telegraf("7044967471:AAE2LjXlasCi2DCjFTQ8qej9mZK7vNcKFGs");
const session = new LocalSession('sessions.json');
bot.use(session.middleware())

bot.start((ctx) => {
    if (!ctx.session.userData) {
        ctx.session.userData = {};
        ctx.session.userData['local'] = String(Math.floor(Math.random() * 100));
        ctx.reply(
            'Your number is ' + ctx.session.userData['local'],
            Markup.inlineKeyboard([
                {text: 'ok', callback_data: '1'}
            ])
        )
    } else {
        ctx.reply('Bot is ready!')
    }
});

bot.action('1', (ctx) => {
    ctx.deleteMessage();
})

bot.command("number", (ctx) => ctx.reply(ctx.session.userData['local']));

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
