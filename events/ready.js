const { logChannelName } = require("../config.json");

const memberCounter = require("../counters/memberCounter");

module.exports = {
    name: "ready",
    once: true,
    async execute(Discord, client) {
        client.guilds.cache.forEach((guild) => {
            const channel = guild.channels.cache.find(
                (c) => c.name === logChannelName
            );
            if (!channel)
                return console.log(
                    `In ${guild.name}, there is no channel ${logChannelName}`
                );

            channel.send("Bot was started.");
        });

        console.log("Bot is ready.");

        await memberCounter(client);
    },
};
