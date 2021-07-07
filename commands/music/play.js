const ytdl = require("ytdl-core");
const videoFinder = require("../../functions/videoFinder");
const videoPlayer = require("../../functions/videoPlayer");

const {
    commandsCooldown: { play: cooldown },
} = require("../../config.json");

module.exports = {
    name: "play",
    description: "Joins and plays video from youtube.",
    args: true,
    guildOnly: true,
    aliases: ["p"],
    cooldown,
    permissions: ["SPEAK"],
    usage: "<video: name || url>",
    async execute(message, args, Discord, client) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel)
            return message.channel.send(
                "You need to be in voice channel to execute this command!"
            );

        const serverQueue = client.queue.get(message.guild.id);

        let song = {};

        if (ytdl.validateURL(args[0])) {
            const songInfo = await ytdl.getInfo(args[0]);
            console.log(songInfo);
            song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
            };
        } else {
            const video = await videoFinder(args.join(" "));
            if (video) song = { title: video.title, url: video.url };
            else message.channel.send("There was an error finding the video.");
        }

        if (!serverQueue) {
            const queueConstructor = {
                voiceChannel,
                textChannel: message.channel,
                connection: null,
                songs: [],
            };

            client.queue.set(message.guild.id, queueConstructor);
            queueConstructor.songs.push(song);

            try {
                const connection = await voiceChannel.join();
                queueConstructor.connection = connection;
                videoPlayer(message.guild, queueConstructor.songs[0], client);
            } catch (err) {
                client.queue.delete(message.guild.id);
                message.channel.send("There was an error connecting!");
            }
        } else {
            serverQueue.songs.push(song);
            return message.channel.send(`***${song.title}*** added to queue!`);
        }
    },
};
