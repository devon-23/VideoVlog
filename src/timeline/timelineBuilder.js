const ffmpeg = require("fluent-ffmpeg");
const ffprobe = require("ffprobe-static");

ffmpeg.setFfprobePath(ffprobe.path);

async function getVideoDuration(file) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(file, (err, metadata) => {
            if (err)
                return reject(err);

            resolve(metadata.format.duration);
        });
    });
}

async function buildTimeline(media, config) {
    const timeline = [];
    for (const item of media) {
        if (item.type === "image") {
            timeline.push({
                ...item,
                duration: config.imageDuration
            });
        } else {
            const duration = await getVideoDuration(item.fullPath);
            timeline.push({

                ...item,

                duration
            });
        }
    }
    return timeline;
}
module.exports = buildTimeline;