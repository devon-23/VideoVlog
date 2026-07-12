const fs = require("fs");

async function getCreationDate(media) {
    if (!media || media.length === 0) {
        return new Date().toISOString();
    }

    const stats = await Promise.all(
        media.map(item => fs.promises.stat(item.fullPath))
    );

    const earliest = stats.reduce((min, s) =>
        s.birthtime < min ? s.birthtime : min,
        stats[0].birthtime
    );

    return earliest.toISOString();
}

module.exports = getCreationDate;