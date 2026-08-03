const ffmpeg = require("fluent-ffmpeg");

function addMusic(videoPath, musicPath, outputPath, duration) {

    return new Promise((resolve, reject) => {

        ffmpeg()

            .input(videoPath)

            .input(musicPath)

            .inputOptions([
                "-stream_loop -1"
            ])

            .complexFilter([

                {
                    filter: "volume",
                    options: "0.35",
                    inputs: "1:a",
                    outputs: "music"
                },

                {
                    filter: "afade",
                    options: {
                        type: "out",
                        start_time: duration - 2,
                        duration: 2
                    },
                    inputs: "music",
                    outputs: "fadedMusic"
                }

            ])

            .outputOptions([

                "-map 0:v",
                "-map [fadedMusic]",

                "-shortest",

                "-c:v copy",
                "-c:a aac"

            ])

            .on("end", () => {

                console.log("🎵 Music added");

                resolve();

            })

            .on("error", (err, stdout, stderr) => {

                console.log(stderr);

                reject(err);

            })

            .save(outputPath);

    });

}

module.exports = addMusic;