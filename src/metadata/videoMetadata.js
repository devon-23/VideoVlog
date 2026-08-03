const { exiftool } = require("exiftool-vendored");


async function getCreationDate(files){


    let dates = [];


    for(const file of files){


        const data =
            await exiftool.read(file);


        if(data.CreateDate){
            dates.push(
                new Date(data.CreateDate)
            );

        }
        else if(data.MediaCreateDate){

            dates.push(
                new Date(data.MediaCreateDate)
            );

        }
        else if(data.TrackCreateDate){

            dates.push(
                new Date(data.TrackCreateDate)
            );

        }


    }


    await exiftool.end();


    if(dates.length === 0){

        return new Date();

    }


    return new Date(
        Math.min(
            ...dates
            .map(d => d.getTime())
        )
    );

}


module.exports = getCreationDate;