const ms = require("ms");
const { mainRoleName, muteRoleName } = require("../../config.json");

module.exports = {
    name: "mute",
    description: "This command mutes a member.",
    args: true,
    guildOnly: true,
    permissions: ["KICK_MEMBERS"],
    usage: "<user> <time: optional>",
    async execute(message, args) {
        const target = message.mentions.users.first();

        if (!target) return message.channel.send("Can't find that member.");

        let mainRole = message.guild.roles.cache.find(
            (role) => role.name === mainRoleName
        );
        let muteRole = message.guild.roles.cache.find(
            (role) => role.name === muteRoleName
        );

        let memberTarget = message.guild.members.cache.get(target.id);

        memberTarget.roles.remove(mainRole.id);
        memberTarget.roles.add(muteRole.id);
        if (!args[1])
            return message.channel.send(
                `<@${memberTarget.user.id}> has been muted.`
            );
        message.channel.send(
            `<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}.`
        );

        setTimeout(() => {
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
        }, ms(args[1]));
    },
};
