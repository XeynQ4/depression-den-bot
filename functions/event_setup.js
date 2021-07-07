const fs = require("fs");
const path = require("path");

module.exports = (Discord, client) => {
    const eventFiles = fs
        .readdirSync(path.resolve(__dirname, "../events"))
        .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        if (event.once) {
            client.once(
                event.name,
                async (...args) => await event.execute(...args, Discord, client)
            );
        } else {
            client.on(
                event.name,
                async (...args) => await event.execute(...args, Discord, client)
            );
        }
    }
};
