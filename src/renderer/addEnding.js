const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");


function addEnding(video, ending, output){

    return new Promise((resolve,reject)=>{


        const listFile =
            `concat_${Date.now()}.txt`;


        fs.writeFileSync(
            listFile,

            `file '${video}'\nfile '${ending}'`
        );


        ffmpeg()

            .input(listFile)

            .inputOptions([
                "-f concat",
                "-safe 0"
            ])

            .outputOptions([
                "-c copy"
            ])

            .on("start", cmd=>{

                console.log("Adding ending...");
                console.log(cmd);

            })


            .on("end",()=>{

                fs.unlinkSync(listFile);

                console.log("🌑 Ending added");

                resolve();

            })


            .on("error",(err)=>{

                console.log(err);

                reject(err);

            })


            .save(output);


    });

}


module.exports = addEnding;