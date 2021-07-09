const { botHelpChannelName, prefix } = require("../../config.json");
const helpBase = require("../../functions/help_base");

module.exports = {
    name: "helpsetup",
    description: "Setup help channel.",
    guildOnly: true,
    permissions: ["MANAGE_MESSAGES"],
    usage: "",
    async execute(message, args, Discord, client) {
        let embed = new Discord.MessageEmbed().setColor("#4287f5");
        const { commands } = client;

        embed = helpBase(embed, commands);

        const botHelpChannel = message.guild.channels.cache.find(
            (channel) => channel.name === botHelpChannelName
        );

        if (!botHelpChannel) {
            console.log(
                `In ${guild}, there is no channel ${botHelpChannelName}.`
            );
            return message.channel.send(
                `There is no channel ${botHelpChannelName}!`
            );
        }

        message.delete();
        botHelpChannel.send(embed);
    },
};
