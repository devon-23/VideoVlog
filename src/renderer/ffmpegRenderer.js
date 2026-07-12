const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");

ffmpeg.setFfmpegPath(ffmpegPath);


function renderVideo(timeline, outputPath) {

    return new Promise((resolve, reject) => {

        let command = ffmpeg();


        timeline.forEach(item => {

            if(item.type === "video") {

                command.input(item.fullPath);

            }

            else if(item.type === "image") {

                command
                    .input(item.fullPath)
                    .inputOptions([
                        "-loop 1",
                        `-t ${item.duration}`
                    ]);

            }

        });


        const filters = [];


        timeline.forEach((item,index)=>{

            filters.push(
                `[${index}:v]` +
                `scale=1920:1080:force_original_aspect_ratio=increase,` +
                `crop=1920:1080,` +
                `fps=30,` +
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

            .on("progress", progress=>{
                if(progress.percent){
                    console.log(
                        `${progress.percent.toFixed(1)}%`
                    );
                }
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


module.exports = renderVideo;