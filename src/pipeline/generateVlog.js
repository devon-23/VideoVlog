const config = require("../config");
const ffmpeg = require("fluent-ffmpeg");
const scanFolder = require("../timeline/mediaScanner");
const buildTimeline = require("../timeline/timelineBuilder");
const renderVideo = require("../renderer/ffmpegRenderer");
const getRandomSong = require("../../music/musicSelector");
const addMusic = require("../../music/audioMixer");
const path = require("path");
const splitQuote = require("../text/quoteSplitter");
const buildTextTimeline = require("../text/textTimeline");
const createDateText = require("../text/dateOverlay");
const addText = require("../text/textRenderer");
const addEndingText = require("../renderer/addEndingText");
const getRandomQuote = require("../quotes/quoteSelector");
const generateTitle = require("../titles/titleGenerator");
const writeManifest = require("../project/writeManifest");
const getCreationDate = require("../timeline/getCreationDate");
const uploadVideo = require("../youtube/youtubeUploader.js");
const convertHeicFiles = require("../timeline/heicConverter");
const cleanUploadsFolder = require("../timeline/cleanup");

async function generateVlog(jobFolder, jobId) {
    console.log("");
    console.log("📼 Vlog Maker");
    console.log("");

    const uploadsFolder = jobFolder || config.uploadsFolder;

    convertHeicFiles(uploadsFolder);

    let media = scanFolder(uploadsFolder);

    // Get creation dates BEFORE adding the ending clip, then order the
    // clips earliest to latest so the vlog plays in chronological order
    const mediaWithDates =
        await getCreationDate.attachCreationDates(media);

    media = getCreationDate.sortMediaByDate(mediaWithDates);

    const validDates =
        media
            .map(item => item.creationDate)
            .filter(Boolean);

    const rawDate =
        validDates.length > 0
            ? validDates.reduce(
                (min, d) => (d < min ? d : min),
                validDates[0]
            ).toISOString()
            : new Date().toISOString();

    const endingBlack = {
        fullPath: path.join(
            __dirname,
            "../../assets/ending.mov"
        ),
        type: "video",
        name: "ending.mov"
    };

    media.push(endingBlack);

    const timeline = await buildTimeline(
        media,
        config
    );

    console.log("TIMELINE:");
    timeline.forEach((item, i) => {
        console.log(`[${i}] type=${item.type} duration=${item.duration} file=${item.fileName}`);
    });

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

    // Get the real date from photo/video metadata
    //const rawDate = await getCreationDate(media);
    const vlogDate = createDateText(rawDate);

    // Pick quote
    const quote = getRandomQuote();

    console.log(
        "Today's quote:",
        quote.text
    );

    // make video title — using the real metadata date, not today's date
    const videoTitle = generateTitle(new Date(rawDate));

    console.log(
        "Video title:",
        videoTitle
    );

    console.log(
        "Using music:",
        song
    );

    const manifest = {

        created:
            new Date()
            .toISOString()
            .split("T")[0],


        title:
            videoTitle,


        quote:
            quote.sections,


        music:
            path.basename(song)

    };


    writeManifest(

        manifest,

        path.join(
            config.outputFolder,
            "vlog.json"
        )

    );

    // Add music

    await addMusic(
        silentVideo,
        song,
        finalVideo,
        duration
    );


    const sections = quote.sections;

    console.log("QUOTE:");
    console.log(quote);

    console.log("SECTIONS:");
    console.log(sections);

    console.log("DATE VALUE:", vlogDate);
    console.log("DATE TYPE:", typeof vlogDate);

    const endingDuration =
        timeline[timeline.length - 1].duration;

    const endingStart = duration - endingDuration;

    // The final quote section is shown once, on the black ending screen
    // (via addEndingText below) — leave it out here so it doesn't also
    // flash over the last bit of the video itself
    const mainSections = sections.slice(0, -1);

    const textTimeline =
    buildTextTimeline(
        vlogDate,
        mainSections,
        duration,
        endingStart
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

    const finalOutput =
    path.join(
        config.outputFolder,
        "vlog.mp4"
    );

    const quoteSections = quote.sections;

    const finalQuote =
        quoteSections[
            quoteSections.length - 1
        ];

    await addEndingText(
        textVideo,
        finalQuote,
        finalOutput,
        endingStart,
        duration
    );

    /*
       Upload to YouTube
    */

    const youtubeId = await uploadVideo(
        finalOutput,
        videoTitle,
        sections.join("\n")
    );

    cleanUploadsFolder(uploadsFolder, ["ending.mov"]);

    console.log(
        "🎬 Uploaded:",
        youtubeId
    );

    return {

        success:true,

        videoTitle,

        vlogDate,

        finalQuote,

        outputVideo: finalVideo

    };

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

module.exports = generateVlog;