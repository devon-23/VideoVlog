const fs = require("fs");
const path = require("path");

const VIDEO_EXTENSIONS = [
    ".mp4",
    ".mov",
    ".m4v",
    ".avi",
    ".webm"
];

const IMAGE_EXTENSIONS = [
    ".jpg",
    ".jpeg",
    ".png",
    ".heic",
    ".gif"
];
function scanFolder(folder) {
    const files = fs.readdirSync(folder);
    const media = [];
    for (const file of files) {
        const extension = path.extname(file).toLowerCase();
        if (VIDEO_EXTENSIONS.includes(extension)) {
            media.push({
                type: "video",
                fileName: file,
                fullPath: path.join(folder, file)
            });
        } else if (IMAGE_EXTENSIONS.includes(extension)) {
            media.push({
                type: "image",
                fileName: file,
                fullPath: path.join(folder, file)
            });
        }
    }
    return media;
}

module.exports = scanFolder;