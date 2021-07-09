const { botHelpChannelName, prefix } = require("../../config.json");

module.exports = {
    name: "helpsetup",
    description: "Setup help channel.",
    guildOnly: true,
    permissions: ["MANAGE_MESSAGES"],
    usage: "",
    async execute(message, args, Discord, client) {
        let embed = new Discord.MessageEmbed().setColor("#4287f5");
        const { commands } = client;

        embed.setTitle("List of all commands");
        commands.forEach((command) =>
            embed.addField(
                `***${command.name}***`,
                `**Description:** ${command.description}\n**Aliases:** \`${
                    command.aliases ? command.aliases.join(", ") : "-"
                }\`\n**Usage:** \`${
                    command.usage
                        ? `${prefix}${command.name} ${command.usage}`
                        : `${prefix}${command.name}`
                }\`\n**Cooldown:** ${command.cooldown || 0} second(s)`
            )
        );
        embed.setDescription(
            `You can send \`${prefix}help <command: name (optional)>\` to get info on a specific command!`
        );

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
