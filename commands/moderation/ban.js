module.exports = {
    name: "ban",
    description: "This command bans a member.",
    args: true,
    guildOnly: true,
    permissions: ["BAN_MEMBERS"],
    usage: "<user>",
    async execute(message, args) {
        const member = message.mentions.users.first();
        if (!member) {
            return message.channel.send("You couldn't ban that member.");
        }
        const memberTarget = message.guild.members.cache.get(member.id);
        await memberTarget
            .ban()
            .then(
                message.channel.send(
                    `<@${memberTarget.user.id}> has been banned.`
                )
            );
    },
};
