const { verifyChannelName, prefix } = require("../../config.json");

module.exports = {
    name: "verifysetup",
    description: "Setup verify channel.",
    guildOnly: true,
    permissions: ["MANAGE_MESSAGES"],
    usage: "",
    async execute(message, args, Discord, client) {
        client.guilds.cache.forEach((guild) => {
            const verifyChannel = guild.channels.cache.find(
                (c) => c.name === verifyChannelName
            );

            if (!verifyChannel)
                return console.log(
                    `In ${guild.name}, there is no channel ${verifyChannelName}.`
                );

            let embed = new Discord.MessageEmbed()
                .setTitle("Verify")
                .setColor("#4287f5")
                .setDescription(
                    `Send \`${prefix}verify\` to this channel to get member role.`
                );

            message.delete();
            verifyChannel.send(embed);
        });
    },
};
