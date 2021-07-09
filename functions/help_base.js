const { prefix } = require("../config.json");

const { botChannelName } = require("../config.json");

module.exports = (embed, commands) => {
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
            }\`\n**Cooldown:** ${
                command.cooldown || 0
            } second(s)\n**Permissions:** \`${
                command.permissions ? command.permissions.join(", ") : "none"
            }\`\n**Channels:** \`${
                command.channels ? command.channels.join(", ") : botChannelName
            }\``
        )
    );
    embed.setDescription(
        `You can send \`${prefix}help <command: name (optional)>\` to get info on a specific command!`
    );

    return embed;
};
