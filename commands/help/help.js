const { prefix } = require("../../config.json");

module.exports = {
    name: "help",
    description: "List of all commands.",
    aliases: ["h"],
    usage: "<command: name, optional>",
    async execute(message, args, Discord, client) {
        let embed = new Discord.MessageEmbed().setColor("#4287f5");
        const { commands } = message.client;

        if (!args.length) {
            embed.setTitle("List of all commands");
            commands.forEach((command) =>
                embed.addField(
                    `***${command.name}***`,
                    `**Description:** ${command.description}\n**Aliases:** \`${
                        command.aliases ? command.aliases.join(", ") : "-"
                    }\`\n**Usage:** ${
                        command.usage
                            ? `${prefix}${command.name} ${command.usage}`
                            : `${prefix}${command.name}`
                    }\n**Cooldown:** ${command.cooldown || 0} second(s)`
                )
            );
            embed.setDescription(
                `You can send \`${prefix}${this.name} ${this.usage}\` to get info on a specific command!`
            );

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
            return message.reply("that's not a valid command!");
        }

        embed
            .setDescription(
                `**Description:** ${command.description}\n**Aliases:** \`${
                    command.aliases ? command.aliases.join(", ") : "-"
                }\`\n**Usage:** ${
                    command.usage
                        ? `${prefix}${command.name} ${command.usage}`
                        : `${prefix}${command.name}`
                }\n**Cooldown:** ${command.cooldown || 0} second(s)`
            )
            .setTitle(command.name);

        message.channel.send(embed);
    },
};
