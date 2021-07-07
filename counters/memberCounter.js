const {
    memberCounterChannelNameStart: channelNameStart,
    logChannelName,
} = require("../config.json");

module.exports = async (client) => {
    client.guilds.cache.forEach((guild) => {
        setInterval(() => {
            const memberCount = guild.memberCount;
            const channel = guild.channels.cache.find((c) =>
                c.name.startsWith(channelNameStart)
            );
            channel.setName(`Total Members: ${memberCount.toLocaleString()}`);

            const logChannel = guild.channels.cache.find(
                (c) => c.name === logChannelName
            );

            if (!logChannel)
                console.log(
                    `In ${guild.name}, there is no channel ${logChannelName}`
                );

            logChannel.send("Updating member count.");
            console.log("Updating member count.");
        }, 300000);
    });
};
