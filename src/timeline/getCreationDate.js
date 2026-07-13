const fs = require("fs");
const path = require("path");
const exifr = require("exifr");
const ffmpeg = require("fluent-ffmpeg");
const ffprobe = require("ffprobe-static");

ffmpeg.setFfprobePath(ffprobe.path);

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"];
const VIDEO_EXTENSIONS = [".mp4", ".mov", ".m4v"];

function getVideoCreationTime(filePath) {
    return new Promise((resolve) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) {
                return resolve(null);
            }

            const creationTime =
                metadata?.format?.tags?.creation_time ||
                metadata?.streams?.[0]?.tags?.creation_time;

            resolve(creationTime ? new Date(creationTime) : null);
        });
    });
}

async function getImageCreationTime(filePath) {
    try {
        const exifDate = await exifr.parse(filePath, ["DateTimeOriginal"]);
        return exifDate?.DateTimeOriginal || null;
    } catch (err) {
        return null;
    }
}

async function getFileCreationDate(fullPath) {
    const ext = path.extname(fullPath).toLowerCase();

    let date = null;

    if (IMAGE_EXTENSIONS.includes(ext)) {
        date = await getImageCreationTime(fullPath);
    } else if (VIDEO_EXTENSIONS.includes(ext)) {
        date = await getVideoCreationTime(fullPath);
    }

    // fallback to filesystem birthtime only if no embedded metadata found
    if (!date) {
        const stats = fs.statSync(fullPath);
        date = stats.birthtime;
    }

    return date;
}

async function getCreationDate(media) {
    if (!media || media.length === 0) {
        return new Date().toISOString();
    }

    const dates = await Promise.all(
        media
            .filter(item => item.fullPath) // skip anything without a real file (e.g. the ending clip)
            .map(item => getFileCreationDate(item.fullPath))
    );

    const validDates = dates.filter(Boolean);

    if (validDates.length === 0) {
        return new Date().toISOString();
    }

    const earliest = validDates.reduce((min, d) =>
        d < min ? d : min,
        validDates[0]
    );

    return earliest.toISOString();
}

module.exports = getCreationDate;