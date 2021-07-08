const {
    commandsCooldown: { resume: cooldown },
    musicChannelName,
} = require("../../config.json");

module.exports = {
    name: "resume",
    description: "Resumes the song.",
    guildOnly: true,
    aliases: ["rs"],
    cooldown,
    channels: [musicChannelName],
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

        if (!serverQueue) return message.channel.send("Nothing is playing!");

        if (!serverQueue.connection.dispatcher.paused)
            return message.channel.send("Song is already playing!");

        serverQueue.connection.dispatcher.resume();

        message.channel.send("Song has been resumed!");
    },
};
