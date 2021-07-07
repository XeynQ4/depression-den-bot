const Discord = require("discord.js");

require("dotenv").config();
const token = process.env.TEST_BOT_TOKEN;

const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

require("./functions/command_setup")(Discord, client);
require("./functions/event_setup")(Discord, client);

client.login(token);
