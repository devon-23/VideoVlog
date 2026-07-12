const ffmpeg = require("fluent-ffmpeg");


function addEndingText(video, quote, output){

    return new Promise((resolve,reject)=>{


        const filter = 
        `[0:v]drawtext=` +
        `text='${quote}':` +
        `fontfile='\\/System\\/Library\\/Fonts\\/Supplemental\\/Arial.ttf':` +
        `fontsize=60:` +
        `fontcolor=white:` +
        `borderw=1:` +
        `bordercolor=black:` +
        `x=(w-text_w)/2:` +
        `y=(h-text_h)/2` +
        `[outv]`;



        ffmpeg(video)

        .complexFilter(filter)

        .outputOptions([
            "-map [outv]",
            "-map 0:a?"
        ])

        .on("end",()=>{

            console.log("🌑 Ending quote added");

            resolve();

        })

        .on("error",(err,stdout,stderr)=>{

            console.log(stderr);

            reject(err);

        })

        .save(output);


    });

}


module.exports = addEndingText;