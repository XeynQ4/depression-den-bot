const {
    commandsCooldown: { queue: cooldown },
    musicChannelName,
} = require("../../config.json");

module.exports = {
    name: "queue",
    description: "Shows queue of songs.",
    guildOnly: true,
    aliases: ["q"],
    cooldown,
    channels: [musicChannelName],
    permissions: ["SPEAK"],
    usage: "",
    async execute(message, args, Discord, client) {
        const serverQueue = client.queue.get(message.guild.id);

        if (!serverQueue)
            return message.channel.send("There is nothing in queue.");

        let embed = new Discord.MessageEmbed()
            .setTitle("Queue")
            .setColor("#47c2ff")
            .addField("Now Playing", serverQueue.songs[0].title)
            .addField("\u200B", "\u200B");

        for (let i = 1; i < serverQueue.songs.length; i++) {
            embed.addField(i, serverQueue.songs[i].title);
        }

        message.channel.send(embed);
    },
};
