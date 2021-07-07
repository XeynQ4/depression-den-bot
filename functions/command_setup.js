const fs = require("fs");
const path = require("path");

module.exports = (Discord, client) => {
    client.commands = new Discord.Collection();
    client.cooldowns = new Discord.Collection();
    client.queue = new Discord.Collection();

    const commandFolders = fs.readdirSync(
        path.resolve(__dirname, "../commands")
    );

    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(path.resolve(__dirname, `../commands/${folder}`))
            .filter((file) => file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            client.commands.set(command.name, command);
        }
    }
};
