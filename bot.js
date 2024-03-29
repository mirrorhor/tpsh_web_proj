const { Telegraf, Router, Context, Markup } = require('telegraf');
const LocalSession = require('telegraf-session-local');
const { message } = require('telegraf/filters');
const express = require('express');


const bot = new Telegraf('7044967471:AAE2LjXlasCi2DCjFTQ8qej9mZK7vNcKFGs');
const session = new LocalSession('sessions.json');
var context = 0
bot.start((ctx) => {context = ctx.chat.id; console.log(context)})
bot.use(session.middleware())

bot.command("register", (ctx) => {
  return ctx.reply(
    "open webapp",
    Markup.keyboard([
      Markup.button.webApp(
        "Open",
        "https://tg-bot-web-app-pps.vercel.app/"
      )
    ])
  );
});
bot.on("message", async (ctx) => {
  console.log(ctx.message.web_app_data)
  return ctx.reply(ctx.message.web_app_data.data)

});

bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
