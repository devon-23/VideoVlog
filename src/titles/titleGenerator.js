const {
    wasUsed,
    markUsed
} = require("../../history/historyManager.js");


function getDayOfYear(date = new Date()) {


    const start =
        new Date(
            date.getFullYear(),
            0,
            0
        );


    const diff =
        date - start;


    const oneDay =
        1000 * 60 * 60 * 24;


    const day =
        Math.floor(
            diff / oneDay
        );


    return String(day)
        .padStart(3, "0");

}



function generateTitle(vlogDate) {


    const dayNumber =
        getDayOfYear(vlogDate);



    const titles = [

        "(don't) look back in anger",

        "a very normal day that definitely happened normally",

        "I went outside and immediately regretted it",

        "somewhere between yesterday and tomorrow",

        "I paid an Etsy witch to give us clear skies",

        "another day of pretending I know what I'm doing",

        "small moments, big memories",

        "the world kept spinning and I kept walking"

    ];

    
    let title;
    let attempts = 0;
    const maxAttempts = titles.length * 3; // generous, but finite

    do {
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        title = `${randomTitle} #${dayNumber}`;
        attempts++;
    } while (wasUsed("titles", title) && attempts < maxAttempts);

    markUsed("titles", title);
    return title;
}


module.exports = generateTitle;