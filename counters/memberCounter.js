const {
    memberCounterChannelNameStart: channelNameStart,
    logChannelName,
    memberCountUpdateDuration,
} = require("../config.json");

module.exports = async (client) => {
    client.guilds.cache.forEach((guild) => {
        setInterval(() => {
            const memberCount = guild.memberCount;
            const channel = guild.channels.cache.find((c) =>
                c.name.startsWith(channelNameStart)
            );
            channel.setName(`Total Members: ${memberCount.toLocaleString()}`);

            console.log("Updating member count.");
        }, memberCountUpdateDuration);
    });
};
