const {
    commandsCooldown: { skip: cooldown },
    musicChannel,
} = require("../../config.json");

module.exports = {
    name: "skip",
    description: "Skips to the next song.",
    guildOnly: true,
    aliases: ["next", "s"],
    cooldown,
    channels: [musicChannel],
    permissions: ["SPEAK"],
    usage: "",
    async execute(message, args, Discord, client) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel)
            return message.channel.send(
                "You need to be in voice channel to execute this command!"
            );

        if (
            message.guild.me.voice.channel &&
            message.member.voice.channel.id !==
                message.guild.me.voice.channel.id
        )
            return message.channel.send(
                "You must be in the same voice channel as me!"
            );

        const serverQueue = client.queue.get(message.guild.id);

        if (!serverQueue)
            return message.channel.send("There are no songs in queue!");
        serverQueue.connection.dispatcher.end();
    },
};
