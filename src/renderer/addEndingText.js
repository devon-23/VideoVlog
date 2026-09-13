const ffmpeg = require("fluent-ffmpeg");
const { escapeDrawtext } = require("../text/textRenderer");
const { getRandomPosition } = require("../text/textPosition");


function addEndingText(video, quote, output, startTime, endTime){

    return new Promise((resolve,reject)=>{

        const enableExpr = `between(t\\,${startTime}\\,${endTime})`;
        const position = getRandomPosition();

        const filter =
        `[0:v]drawtext=` +
        `text=${escapeDrawtext(quote)}:` +
        `fontfile='\\/System\\/Library\\/Fonts\\/Supplemental\\/DIN Alternate Bold.ttf':` +
        `fontsize=110:` +
        `fontcolor=white:` +
        //`borderw=1:` +
        //`bordercolor=black:` +
        `x=${position.x}:` +
        `y=${position.y}:` +
        `enable='${enableExpr}'` +
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