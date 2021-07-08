const { verifyChannelName, verifiedRoleName } = require("../../config.json");

module.exports = {
    name: "verify",
    description: "This command verifies you.",
    guildOnly: true,
    usage: "",
    channels: [verifyChannelName],
    async execute(message, args) {
        message.delete();

        const verifiedRole = message.guild.roles.cache.find(
            (r) => r.name === verifiedRoleName
        );

        if (!verifiedRole) {
            message.channel.send(
                `There is no ${verifiedRoleName} role in this server!`
            );
            return console.log(
                `In ${message.guild.name}, there is no role ${verifiedRoleName}.`
            );
        }

        if (
            message.member.roles.cache.find((r) => r.name === verifiedRoleName)
        ) {
            const alreadyVerifiedMessage = await message.channel.send(
                "You are already verified!"
            );
            setTimeout(() => alreadyVerifiedMessage.delete(), 10000);
            return;
        }

        message.member.roles.add(verifiedRole);
        const verifiedMessage = await message.channel.send(
            "Congrats! You are verified!"
        );
        setTimeout(() => verifiedMessage.delete(), 10000);
    },
};
