const {
    maleEmoji,
    femaleEmoji,
    reactionChannelName: channelName,
} = require("../../config.json");

module.exports = {
    name: "reactionrole",
    description: "Sets up a reaction role message.",
    guildOnly: true,
    permissions: ["MANAGE_MESSAGES"],
    usage: "",
    async execute(message, args, Discord, client) {
        const channel = message.guild.channels.cache.find(
            (c) => c.name === channelName
        );
        if (!channel)
            return message.channel.send(
                `${channelName} channel does not exist!`
            );

        let embed = new Discord.MessageEmbed()
            .setColor("#e42643")
            .setTitle("Choose your sex")
            .setDescription(`${maleEmoji} => Male\n${femaleEmoji} => Female`);

        try {
            let messageEmbed = await channel.send(embed);
            messageEmbed.react(maleEmoji);
            messageEmbed.react(femaleEmoji);
            message.delete();
        } catch (e) {
            throw e;
        }
    },
};
