const memberCounter = require("../counters/memberCounter");

module.exports = {
    name: "ready",
    once: true,
    async execute(Discord, client) {
        console.log("Bot is ready.");
        await memberCounter(client);
    },
};
