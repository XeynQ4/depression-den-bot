const {
    maleEmoji,
    femaleEmoji,
    maleRoleName,
    femaleRoleName,
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

        const maleRole = message.guild.roles.cache.find(
            (role) => role.name === maleRoleName
        );
        const femaleRole = message.guild.roles.cache.find(
            (role) => role.name === femaleRoleName
        );

        let embed = new Discord.MessageEmbed()
            .setColor("#e42643")
            .setTitle("Choose your sex")
            .setDescription(`${maleEmoji} => Male\n${femaleEmoji} => Female`);

        const messageEmbed = await channel.send(embed);

        messageEmbed.react(maleEmoji);
        messageEmbed.react(femaleEmoji);
        message.delete();
        exists = true;

        const collector = messageEmbed.createReactionCollector(
            (reaction, user) =>
                !user.bot &&
                (reaction.emoji.name === maleEmoji ||
                    reaction.emoji.name === femaleEmoji),
            {
                dispose: true,
            }
        );

        collector.on("collect", async (reaction, user) => {
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
        });
        collector.on("remove", async (reaction, user) => {
            if (reaction.emoji.name === maleEmoji) {
                await reaction.message.guild.members.cache
                    .get(user.id)
                    .roles.remove(maleRole);
            }
            if (reaction.emoji.name === femaleEmoji) {
                await reaction.message.guild.members.cache
                    .get(user.id)
                    .roles.remove(femaleRole);
            }
        });
    },
};
