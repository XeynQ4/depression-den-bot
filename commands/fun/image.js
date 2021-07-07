var Scraper = require("images-scraper");
const google = new Scraper({ puppeteer: { headless: true } });
const {
    commandsCooldown: { image: cooldown },
} = require("../../config.json");

module.exports = {
    name: "image",
    description: "Sends image to discord channel.",
    usage: "<image: name>",
    cooldown,
    async execute(message, args, Discord, client) {
        const imageQuery = args.join(" ");

        const imageResults = await google.scrape(imageQuery, 1);
        message.channel.send(imageResults[0].url);
    },
};
