const {
    agreeEmoji,
    disagreeEmoji,
    suggestionsChannelName: channelName,
} = require("../../config.json");

module.exports = {
    name: "suggestions",
    description: "Creates a suggestion.",
    usage: "<suggestion>",
    args: true,
    guildOnly: true,
    aliases: ["suggestion", "suggest"],
    async execute(message, args, Discord, client) {
        const channel = message.guild.channels.cache.find(
            (c) => c.name === channelName
        );
        if (!channel)
            return message.channel.send(
                `${channelName} channel does not exist!`
            );

        let messageArgs = args.join(" ");
        const embed = new Discord.MessageEmbed()
            .setColor("#fadf2e")
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setDescription(messageArgs);

        channel
            .send(embed)
            .then((msg) => {
                msg.react(agreeEmoji);
                msg.react(disagreeEmoji);
                message.delete();
            })
            .catch((err) => {
                throw err;
            });
    },
};
