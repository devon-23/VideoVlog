const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");


function getFileDate(file) {

    return new Promise((resolve) => {


        ffmpeg.ffprobe(
            file,
            (err, metadata) => {


                if (err) {
                    console.log(
                        "Metadata failed:",
                        file
                    );

                    resolve(null);
                    return;
                }


                const tags =
                    metadata.format.tags || {};


                const date =
                    tags["com.apple.quicktime.creationdate"] ||
                    tags.creation_time;


                if(date) {
                    resolve(
                        new Date(date)
                    );
                }
                else {
                    resolve(null);
                }

            }
        );


    });

}



async function getCreationDate(media) {


    if (!media || media.length === 0) {
        return new Date().toISOString();
    }


    const dates = await Promise.all(

        media.map(item =>
            getFileDate(item.fullPath)
        )

    );


    const validDates =
        dates.filter(Boolean);



    if(validDates.length === 0){

        console.log(
            "No metadata dates found, using current date"
        );

        return new Date().toISOString();

    }



    const earliest =
        validDates.reduce(
            (min,date)=>
                date < min ? date : min,
            validDates[0]
        );


    return earliest.toISOString();

}



module.exports = getCreationDate;