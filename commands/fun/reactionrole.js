const { maleEmoji, femaleEmoji } = require("../../config.json");

module.exports = {
    name: "reactionrole",
    description: "Sets up a reaction role message.",
    guildOnly: true,
    permissions: ["MANAGE_MESSAGES"],
    usage: "",
    async execute(message, args, Discord, client) {
        let embed = new Discord.MessageEmbed()
            .setColor("#e42643")
            .setTitle("Choose your sex")
            .setDescription(`${maleEmoji} => Male\n${femaleEmoji} => Female`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(maleEmoji);
        messageEmbed.react(femaleEmoji);
    },
};
