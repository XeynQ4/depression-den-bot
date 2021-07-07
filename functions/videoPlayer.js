const ytdl = require("ytdl-core");

module.exports = function videoPlayer(guild, song, client) {
    const songQueue = client.queue.get(guild.id);

    if (!song) {
        songQueue.voiceChannel.leave();
        return client.queue.delete(guild.id);
    }

    const stream = ytdl(song.url, { filter: "audioonly" });
    songQueue.connection
        .play(stream, { seek: 0, volume: 1 })
        .on("finish", () => {
            songQueue.songs.shift();
            videoPlayer(guild, songQueue.songs[0], client);
        });

    songQueue.textChannel.send(`Now playing ***${song.title}***`);
};
