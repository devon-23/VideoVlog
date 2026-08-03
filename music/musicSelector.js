const fs = require("fs");
const path = require("path");

function getRandomSong(folder) {
    const files = fs.readdirSync(folder)
        .filter(file =>
            file.endsWith(".mp3")
        );
    if(files.length === 0) {
        throw new Error(
            "No music files found"
        );
    }
    const random =
        files[Math.floor(Math.random() * files.length)];

    return path.join(folder, random);
}

module.exports = getRandomSong;