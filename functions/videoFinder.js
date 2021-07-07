const ytSearch = require("yt-search");

module.exports = async function (query) {
    const videoResult = await ytSearch(query);

    return videoResult.videos.length >= 1 ? videoResult.videos[0] : null;
};
