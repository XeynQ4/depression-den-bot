const { mainRoleName, muteRoleName } = require("../../config.json");

module.exports = {
    name: "unmute",
    description: "This command unmutes a member.",
    args: true,
    guildOnly: true,
    permissions: ["KICK_MEMBERS"],
    usage: "<user>",
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

        memberTarget.roles.remove(muteRole.id);
        memberTarget.roles.add(mainRole.id);
        message.channel.send(`<@${memberTarget.user.id}> has been unmuted.`);
    },
};
