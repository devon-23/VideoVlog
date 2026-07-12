const path = require("path");

module.exports = {
    uploadsFolder: path.join(__dirname, "../uploads"),
    outputFolder: path.join(__dirname, "../output"),
    musicFolder: path.join(__dirname, "../music"),

    imageDuration: 3,

    endingDuration: 2,


    exportProfile: "youtube",


    profiles: {

        youtube: {
            width: 1920,
            height: 1080,
            fps: 30
        },


        tiktok: {
            width: 1080,
            height: 1920,
            fps: 30
        }

    }

};