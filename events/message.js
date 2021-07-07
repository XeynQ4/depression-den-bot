const { prefix, botChannel } = require("../config.json");
const cooldownSetup = require("../functions/cooldown_setup");

module.exports = {
    name: "message",
    async execute(message, Discord, client) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command =
            client.commands.get(commandName) ||
            client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        if (!command) return;

        if (command.guildOnly && message.channel.type === "dm") {
            return message.reply("This command is only for servers!");
        }

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms) {
                return message.reply("You can not do this!");
            }

            for (let permission of command.permissions) {
                if (!authorPerms.has(permission))
                    return message.reply("You can not do this!");
            }
        }

        if (command.channels) {
            if (
                !command.channels.find(
                    (channel) => channel === message.channel.name
                )
            )
                return message.reply(
                    "you can't use this command in this channel!"
                );
        } else {
            if (!(botChannel === message.channel.name))
                return message.reply(
                    "you can't use this command in this channel!"
                );
        }

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply);
        }

        const { cooldowns } = client;

        await cooldownSetup(cooldowns, command, message, Discord);

        try {
            await command.execute(message, args, Discord, client);
        } catch (error) {
            console.error(error);
            message.reply("There was an error trying to execute that command.");
        }
    },
};
