const { welcomeChannelName } = require("../config.json");

module.exports = {
    name: "guildMemberAdd",
    async execute(guildMember) {
        guildMember.guild.channels.cache
            .find((channel) => channel.name === welcomeChannelName)
            .send(`Welcome <@${guildMember.user.id}>, hope you like it!`);
    },
};
