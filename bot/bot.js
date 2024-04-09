import { configDotenv } from "dotenv";

// dotenv.config({ path: "../.env" });
import { Telegraf } from "telegraf";
configDotenv({ path: "../.env" });

// Create a new instance of Telegraf bot with your bot token
const bot = new Telegraf(process.env.BOT_TOKEN);

// Command handler for /start command
bot.start((ctx) =>
  ctx.reply(
    "Welcome to the Echo bot! Send me a message and I will echo it back."
  )
);

// Echo handler for text messages

// Start the bot
bot.launch();
