const {
    verifyChannelName,
    verifiedRoleName,
    messageDuration,
} = require("../../config.json");

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
            const alreadyVerifiedMessage = await message.reply(
                "you are already verified!"
            );
            setTimeout(() => alreadyVerifiedMessage.delete(), messageDuration);
            return;
        }

        message.member.roles.add(verifiedRole);
        const verifiedMessage = await message.reply(
            "congrats! You are verified!"
        );
        setTimeout(() => verifiedMessage.delete(), messageDuration);
    },
};
