const {
    commandsCooldown: { remove: cooldown },
    musicChannel,
} = require("../../config.json");

module.exports = {
    name: "remove",
    description: "Removes song from queue.",
    guildOnly: true,
    aliases: ["r"],
    args: true,
    cooldown,
    channels: [musicChannel],
    permissions: ["SPEAK"],
    usage: "<song: position in queue>",
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
            return message.channel.send("There is nothing in queue.");

        const songs = serverQueue.songs;

        if (Number.isNaN(parseInt(args[0])))
            return message.channel.send("Argument must be a number!");

        if (songs.length - 1 < parseInt(args[0]) || parseInt(args[0]) <= 0)
            return message.channel.send("Position doesn't exist in queue.");

        const removedSong = songs.splice(parseInt(args[0]), 1);

        message.channel.send(
            `***${removedSong[0].title}*** was removed from queue!`
        );
    },
};
