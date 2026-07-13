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
    "the sun set like it had somewhere better to be",
    "a eulogy for the version of me from this morning",
    "everything felt cinematic except the part where nothing happened",
    "i stared into the void and the void asked what i was filming",
    "the quiet kind of falling apart",
    "you guys go on without me",
    "idk what day it is",
    "and so on",
    "it was like the moon",
    "late movie backwards",
    "ivory and blue",
    "buy a mobile home and sell all of our things",
    "mustard gas and roses",
    "filmed it anyways",
    "a day in the life of a day",
    "the day i filmed nothing and called it content",
    "i filmed the mundane and called it art",
    "the day i realized my camera was a mirror",
    "a day in the life of a person who doesn't know what day it is",
    "the day i filmed my own reflection and called it a vlog",
    "just a tuesday",
    "not much happened, and that was kind of nice",
    "today, probably",
    "here's the day",
    "art is dead",
    "life is reason",
    "pnp",
    "nothing special, filmed anyway",
    "i'm not lost, I'm just plot twisting",
    "running on empty and vibes",
    "taking things one take at a time",
    "i peaked in the establishing shot",
    "currently buffering",
    "coffee first, thoughts later",
    "did things, felt things, filmed things",
    "an unremarkable day, remarked upon anyway",
    "living my life at 1.5x speed",
    "don't blink",
    "poo-tee-weet",
    "you might miss it",
    "the algorithm doesn't know I'm sad",
    "we were just kids playing house on a Tuesday",
    "dancing badly in a kitchen that wasn't mine",
    "the radio knew before I did",
    "living in echos",
    "tour tour tour",
    "pause",
    "moggin on the daily",
    "some days are just a bridge with no chorus",
    "i called it a season, it called itself a phase",
    "is this thing on?",
    "can i get a room tone check?"
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