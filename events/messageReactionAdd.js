const {
    reactionChannelName: channelName,
    maleEmoji,
    femaleEmoji,
} = require("../config.json");

module.exports = {
    name: "messageReactionAdd",
    async execute(reaction, user) {
        const maleRole = reaction.message.guild.roles.cache.find(
            (role) => role.name === "Male"
        );
        const femaleRole = reaction.message.guild.roles.cache.find(
            (role) => role.name === "Female"
        );

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;
        if (!reaction.message.channel.name === channelName) return;

        if (reaction.emoji.name === maleEmoji) {
            await reaction.message.guild.members.cache
                .get(user.id)
                .roles.add(maleRole);
        }
        if (reaction.emoji.name === femaleEmoji) {
            await reaction.message.guild.members.cache
                .get(user.id)
                .roles.add(femaleRole);
        }
    },
};
