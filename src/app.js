const config = require("./config");
const ffmpeg = require("fluent-ffmpeg");
const scanFolder = require("./timeline/mediaScanner");
const buildTimeline = require("./timeline/timelineBuilder");
const renderVideo = require("./renderer/ffmpegRenderer");
const getRandomSong = require("../music/musicSelector");
const addMusic = require("../music/audioMixer");
const path = require("path");
const splitQuote = require("./text/quoteSplitter");
const buildTextTimeline = require("./text/textTimeline");
const createDateText = require("./text/dateOverlay");
const addText = require("./text/textRenderer");

async function main() {

    console.log("");

    console.log("📼 Vlog Maker");

    console.log("");


    const media = scanFolder(
        config.uploadsFolder
    );


    const timeline = await buildTimeline(
        media,
        config
    );


    console.log("Timeline ready.");

    console.log("");


    const silentVideo = path.join(
        config.outputFolder,
        "silent.mp4"
    );


    const finalVideo = path.join(
        config.outputFolder,
        "final.mp4"
    );


    // Render video without audio

    await renderVideo(
        timeline,
        silentVideo
    );


    // Get video length

    const duration = await getDuration(
        silentVideo
    );


    // Pick random instrumental

    const song = getRandomSong(
        config.musicFolder
    );


    console.log(
        "Using music:",
        song
    );


    // Add music

    await addMusic(
        silentVideo,
        song,
        finalVideo,
        duration
    );

    const date = createDateText();


    const quote =
    "Oh come on dance with me. I know you want to. It's a beautiful day.";


    const sections =
    splitQuote(
        quote,
        duration
    );



    const textTimeline =
    buildTextTimeline(
        date,
        sections,
        duration
    );



    const textVideo =
    path.join(
        config.outputFolder,
        "text.mp4"
    );



    await addText(
        finalVideo,
        textTimeline,
        textVideo
    );

    const addEnding =
require("./renderer/addEnding");


const completedVideo =
path.join(
    config.outputFolder,
    "vlog.mp4"
);


await addEnding(
    textVideo,
    config.endingVideo,
    completedVideo
);

    console.log("");
    console.log("🎉 Done!");
    console.log(finalVideo);

}

function getDuration(file){
    return new Promise((resolve,reject)=>{

        ffmpeg.ffprobe(
            file,
            (err,data)=>{

                if(err)
                    reject(err);

                else
                    resolve(
                        data.format.duration
                    );
            }
        );
    });
}

main();