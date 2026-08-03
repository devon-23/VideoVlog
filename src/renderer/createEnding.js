const ffmpeg = require("fluent-ffmpeg");


function createEnding(duration, output){

    return new Promise((resolve,reject)=>{


        ffmpeg()

        .input(
            `color=c=black:s=1920x1080:d=${duration}`
        )

        .inputFormat("lavfi")

        .outputOptions([
            "-pix_fmt yuv420p"
        ])

        .on("end",()=>{

            console.log("⬛ Ending created");

            resolve();

        })

        .on("error",reject)

        .save(output);


    });

}


module.exports = createEnding;