module.exports = {
    name: "guildMemberAdd",
    async execute(guildMember) {
        const welcomeRole = guildMember.guild.roles.cache.find(
            (role) => role.name === "member"
        );

        guildMember.roles.add(welcomeRole);
        guildMember.guild.channels.cache
            .find((channel) => channel.name === "welcome")
            .send(`Welcome <@${guildMember.user.id}>, hope you like it!`);
    },
};
