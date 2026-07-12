const config = require("./config");

const scanFolder = require("./timeline/mediaScanner");

const buildTimeline = require("./timeline/timelineBuilder");

const renderVideo = require("./renderer/ffmpegRenderer");


const path = require("path");


async function main() {


    console.log("");

    console.log("📼 Vlog Maker");

    console.log("");


    const media = scanFolder(config.uploadsFolder);


    const timeline = await buildTimeline(
        media,
        config
    );


    console.log("Timeline ready.");

    console.log("");


    const output = path.join(
        config.outputFolder,
        "final.mp4"
    );


    await renderVideo(
        timeline,
        output
    );


}


main();