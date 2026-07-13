const ffmpeg = require("fluent-ffmpeg");


function getMediaDate(file){

    return new Promise((resolve,reject)=>{


        ffmpeg.ffprobe(
            file,
            (err,data)=>{


                if(err){
                    reject(err);
                    return;
                }


                const tags =
                    data.format.tags || {};


                const date =
                    tags.creation_time ||
                    tags["com.apple.quicktime.creationdate"];


                resolve(
                    date ? new Date(date) : new Date()
                );

            }
        );


    });

}


module.exports = getMediaDate;