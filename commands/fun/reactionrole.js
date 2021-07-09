const {
    heEmoji,
    sheEmoji,
    theyEmoji,
    heRoleName,
    sheRoleName,
    theyRoleName,
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

        const heRole = message.guild.roles.cache.find(
            (role) => role.name === heRoleName
        );
        const sheRole = message.guild.roles.cache.find(
            (role) => role.name === sheRoleName
        );
        const theyRole = message.guild.roles.cache.find(
            (role) => role.name === theyRoleName
        );

        let embed = new Discord.MessageEmbed()
            .setColor("#e42643")
            .setTitle("Choose your pronouns")
            .setDescription(
                `${heEmoji} => he/him\n${sheEmoji} => she/her\n${theyEmoji} => they/them`
            );

        const messageEmbed = await channel.send(embed);

        messageEmbed.react(heEmoji);
        messageEmbed.react(sheEmoji);
        messageEmbed.react(theyEmoji);
        message.delete();

        const collector = messageEmbed.createReactionCollector(
            (reaction, user) =>
                !user.bot &&
                (reaction.emoji.name === heEmoji ||
                    reaction.emoji.name === sheEmoji ||
                    reaction.emoji.name === theyEmoji),
            {
                dispose: true,
            }
        );

        collector.on("collect", async (reaction, user) => {
            if (reaction.emoji.name === heEmoji) {
                await reaction.message.guild.members.cache
                    .get(user.id)
                    .roles.add(heRole);
            }
            if (reaction.emoji.name === sheEmoji) {
                await reaction.message.guild.members.cache
                    .get(user.id)
                    .roles.add(sheRole);
            }
            if (reaction.emoji.name === theyEmoji) {
                await reaction.message.guild.members.cache
                    .get(user.id)
                    .roles.add(theyRole);
            }
        });
        collector.on("remove", async (reaction, user) => {
            if (reaction.emoji.name === heEmoji) {
                await reaction.message.guild.members.cache
                    .get(user.id)
                    .roles.remove(heRole);
            }
            if (reaction.emoji.name === sheEmoji) {
                await reaction.message.guild.members.cache
                    .get(user.id)
                    .roles.remove(sheRole);
            }
            if (reaction.emoji.name === theyEmoji) {
                await reaction.message.guild.members.cache
                    .get(user.id)
                    .roles.remove(theyRole);
            }
        });
    },
};
