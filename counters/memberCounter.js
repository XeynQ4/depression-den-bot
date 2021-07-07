const {
    serverId,
    memberCounterChannelId: channelId,
} = require("../config.json");

module.exports = async (client) => {
    const guild = client.guilds.cache.get(serverId);
    setInterval(() => {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get(channelId);
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
        console.log("Updating member count.");
    }, 300000);
};
