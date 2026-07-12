const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const fs = require("fs");
const os = require("os");
const path = require("path");

ffmpeg.setFfmpegPath(ffmpegPath);

function appendEnding(video, output, seconds = 2) {

    return new Promise((resolve, reject) => {

        const script = path.join(
            os.tmpdir(),
            `ending_${Date.now()}.txt`
        );

        const filter = `
[0:v]tpad=stop_mode=add:stop_duration=${seconds}:color=black[v];
[0:a]apad=pad_dur=${seconds}[a]
`;

        fs.writeFileSync(script, filter);

        ffmpeg(video)

            .outputOptions([
                "-filter_complex_script", script,
                "-map", "[v]",
                "-map", "[a]",
                "-c:v", "libx264",
                "-c:a", "aac",
                "-pix_fmt", "yuv420p",
                "-movflags", "+faststart",
                "-shortest"
            ])

            .on("start", cmd => {

                console.log("");
                console.log("⬛ Adding ending...");
                console.log(cmd);

            })

            .on("end", () => {

                fs.unlink(script, ()=>{});

                console.log("✅ Ending added");

                resolve();

            })

            .on("error", err => {

                fs.unlink(script, ()=>{});

                reject(err);

            })

            .save(output);

    });

}

module.exports = appendEnding;