const {
    prefix,
    botChannelName,
    botHelpChannelName,
    messageDuration,
} = require("../../config.json");

const helpBase = require("../../functions/help_base");

module.exports = {
    name: "help",
    description: "List of all commands.",
    aliases: ["h"],
    usage: "<command: name (optional)>",
    channels: [botChannelName, botHelpChannelName],
    async execute(message, args, Discord, client) {
        let embed = new Discord.MessageEmbed().setColor("#4287f5");
        const { commands } = client;

        if (!args.length) {
            if (message.channel.name === botHelpChannelName) {
                message.delete();
                const reply = await message.reply(
                    "you can't use this usage in this channel!"
                );

                return setTimeout(() => {
                    reply.delete();
                }, messageDuration);
            }

            embed = helpBase(embed, commands);

            return message.author
                .send(embed)
                .then(() => {
                    if (message.channel.type === "dm") return;
                    message.reply(
                        "I've sent you a DM with all commands and their description!"
                    );
                })
                .catch((error) => {
                    console.error(
                        `Could not send help DM to ${message.author.tag}.\n`,
                        error
                    );
                    message.reply(
                        "I can't dm you. Are you sure you have them enabled?"
                    );
                });
        }

        const name = args[0].toLowerCase();
        const command =
            commands.get(name) ||
            commands.find((c) => c.aliases && c.aliases.includes(name));

        if (!command) {
            const reply = await message.reply("that's not a valid command!");
            if (message.channel.name === botHelpChannelName) {
                message.delete();
                return setTimeout(() => reply.delete(), messageDuration);
            }
            return;
        }

        embed
            .setDescription(
                `**Description:** ${command.description}\n**Aliases:** \`${
                    command.aliases ? command.aliases.join(", ") : "-"
                }\`\n**Usage:** \`${
                    command.usage
                        ? `${prefix}${command.name} ${command.usage}`
                        : `${prefix}${command.name}`
                }\`\n**Cooldown:** ${
                    command.cooldown || 0
                } second(s)\n**Permissions:** \`${
                    command.permissions
                        ? command.permissions.join(", ")
                        : "none"
                }\`\n**Channels:** \`${
                    command.channels
                        ? command.channels.join(", ")
                        : botChannelName
                }\``
            )
            .setTitle(command.name);

        const reply = await message.channel.send(embed);

        if (message.channel.name === botHelpChannelName) {
            message.delete();
            return setTimeout(() => reply.delete(), messageDuration);
        }
    },
};
