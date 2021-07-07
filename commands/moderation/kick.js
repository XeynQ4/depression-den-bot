module.exports = {
    name: "kick",
    description: "This command kicks a member.",
    args: true,
    guildOnly: true,
    permissions: ["KICK_MEMBERS"],
    usage: "<user>",
    async execute(message, args) {
        const member = message.mentions.users.first();
        if (!member) {
            return message.channel.send("You couldn't kick that member.");
        }
        const memberTarget = message.guild.members.cache.get(member.id);
        await memberTarget
            .kick()
            .then(
                message.channel.send(
                    `<@${memberTarget.user.id}> has been kicked.`
                )
            );
    },
};
