const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const config = require("../config");

ffmpeg.setFfmpegPath(ffmpegPath);


function renderVideo(timeline, outputPath) {

    return new Promise((resolve, reject) => {

        const profile = config.profiles[config.exportProfile];

        const totalDuration = timeline.reduce(
            (sum, item) => sum + Number(item.duration || 0),
            0
        );

        let command = ffmpeg();


        timeline.forEach(item => {

            if(item.type === "video") {

                command.input(item.fullPath);

            }

            else if(item.type === "image") {

                // -loop (image2 demuxer) not -stream_loop: stream_loop
                // restarts the image's timestamps on every loop, so the
                // input -t never fires and the demuxer feeds concat forever
                command
                    .input(item.fullPath)
                    .inputOptions([
                        "-loop 1",
                        `-framerate ${profile.fps}`,
                        `-t ${item.duration}`
                    ]);

            }

        });


        const filters = [];


        timeline.forEach((item,index)=>{

            filters.push(
                `[${index}:v]` +
                `scale=${profile.width}:${profile.height}:force_original_aspect_ratio=increase,` +
                `crop=${profile.width}:${profile.height},` +
                `fps=${profile.fps},` +
                `format=yuv420p,` +
                `setsar=1` +
                `[v${index}]`
            );

        });


        filters.push(
            timeline
                .map((_,i)=>`[v${i}]`)
                .join("") +
            `concat=n=${timeline.length}:v=1:a=0[outv]`
        );


        command

            .complexFilter(filters)

            .outputOptions([
                "-map [outv]",
                "-c:v libx264",
                "-pix_fmt yuv420p",
                "-movflags +faststart"
            ])

            .on("start", cmd=>{
                console.log("🎬 Starting render");
                console.log(cmd);
            })

            // fluent-ffmpeg's own percent is meaningless here (many inputs,
            // no single Duration to measure against) — derive it from the
            // timemark and the timeline length we already know
            .on("progress", progress=>{

                const seconds = parseTimemark(progress.timemark);

                if(seconds === null || totalDuration <= 0)
                    return;

                const percent = Math.min(
                    100,
                    (seconds / totalDuration) * 100
                );

                console.log(
                    `${percent.toFixed(1)}%`
                );

            })

            .on("end", ()=>{
                console.log("✅ Finished!");
                resolve();
            })

            .on("error",(err,stdout,stderr)=>{

                console.log(stderr);

                reject(err);

            })

            .save(outputPath);


    });

}


function parseTimemark(timemark){

    if(typeof timemark !== "string")
        return null;

    const parts = timemark.split(":").map(Number);

    if(parts.length !== 3 || parts.some(Number.isNaN))
        return null;

    const seconds =
        parts[0] * 3600 +
        parts[1] * 60 +
        parts[2];

    // ffmpeg reports AV_NOPTS as a huge negative timemark
    return seconds < 0 ? null : seconds;

}


module.exports = renderVideo;