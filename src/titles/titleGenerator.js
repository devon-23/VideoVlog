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
    "so on so on so on",
    "and so on",
    "coordination",
    "etc",
    "ampersand",
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
    "non-linear",
    "life out of order",
    "dresden and its destruction",
    "ignore the awful times",
    "and concentrate on the good ones.",
    "and so forth",
    "it was alright",
    "which was true",
    "there they were",
    "stuck in amber",
    "bugs",
    "last of the bugs",
    "there is no why",
    "the childrens crusade",
    "vision vs. perception",
    "art is dead",
    "life is reason",
    "what an empty epitaph",
    "oh my days",
    "deju vu that hasn't happened yet",
    "nothing special, filmed anyway",
    "i'm not lost, I'm just plot twisting",
    "running on empty and vibes",
    "taking things one take at a time",
    "i peaked in the establishing shot",
    "currently buffering",
    "chud maxxing",
    "days like this",
    "oldest version",
    "gonna make it",
    "never really understand it",
    "coffee first, thoughts later",
    "did things, felt things, filmed things",
    "an unremarkable day, remarked upon anyway",
    "living my life at 1.5x speed",
    "don't blink",
    "you might miss it",
    "the algorithm doesn't know I'm sad",
    "we were just kids playing house on a Tuesday",
    "dancing badly in a kitchen that wasn't mine",
    "the radio knew before I did",
    "living in echos",
    "nostolgia of it all",
    "tour tour tour",
    "pause",
    "deny deny deny",
    "can't be choosers",
    "moggin on the daily",
    "pack all of our things",
    "never be the cure",
    "some days are just a bridge with no chorus",
    "i called it a season, it called itself a phase",
    "is this thing on?",
    "bop city",
    "boots on the ground",
    "next hyperfixation",
    "movie madness",
    "you blinked",
    "cross the shifting sands",
    "fate picks its favourites",
    "bouquet of whoopsie-daisies",
    "might actually be happy",
    "what an injustice",
    "spite the world",
    "backrooms of the backrooms",
    "yellow",
    "few thousand years",
    "Everything happens so much",
    "nothing less than beautiful",
    "everything not saved will be lost.",
    "safe with my indifference",
    "but i still work",
    "can't be normal about it",
    "excited for whats to come",
    "can i get a room tone check?",
    "all the same",
    "before it happened",
    "after everything",
    "the long way home",
    "nothing to report",
    "everything, eventually",
    "before the silence",
    "borrowed time",
    "somewhere a dog barked",
    "all at once",
    "out of sequence",
    "in another timeline",
    "still here",
    "for now",
    "ordinary miracles",
    "there goes tomorrow",
    "the impossible afternoon",
    "what remains",
    "the small forever",
    "until further notice",
    "half remembered",
    "this happened too",
    "between then and now",
    "the shape of memory",
    "without explanation",
    "a beautiful mistake",
    "past tense",
    "future imperfect",
    "before the ending",
    "everybody leaves",
    "the quiet catastrophe",
    "an ordinary apocalypse",
    "proof of nothing",
    "things that stay",
    "still becoming",
    "the wrong century",
    "accidentally alive",
    "the unfinished version",
    "there wasn't much to say",
    "all things considered",
    "in spite of everything",
    "one more sunrise",
    "the longest minute",
    "gravity won",
    "the happy interruption",
    "borrowed sunlight",
    "a temporary forever",
    "no particular order",
    "before anyone noticed",
    "where time bent",
    "everything after this",
    "echoes first",
    "nothing unusual",
    "just another miracle",
    "the almost life",
    "just passing through",
    "it never stopped",
    "when the music ended",
    "the forgotten future",
    "another version of us",
    "before the dust settled",
    "the good old someday",
    "soft endings",
    "this part matters",
    "the next moment",
    "after the laughter",
    "quiet evidence",
    "you blinked first",
    "meanwhile",
    "still not finished",
    "exactly once",
    "something survives",
    "for a little while",
    "until then",
    "what comes next",
    "everything was temporary",
    "the impossible ordinary",
    "waiting for yesterday",
    "more or less",
    "close enough",
    "this is enough",
    "alive on accident",
    "small infinities",
    "before forever",
    "nothing stays still",
    "the middle of forever",
    "just because",
    "for no reason",
    "where the light went",
    "the sound afterward",
    "holding the present",
    "the missing pages",
    "the last good moment",
    "everything between",
    "one of those days",
    "today, again",
    "if nothing else",
    "the beautiful confusion",
    "still counting",
    "not quite gone",
    "another quiet ending",
    "the weight of maybe",
    "all the unlived lives",
    "one impossible thing",
    "stuck between moments",
    "the color of time",
    "somebody had to remember",
    "the first goodbye",
    "the last tomorrow",
    "the slow collapse",
    "life in fragments",
    "the echo of now",
    "nothing but time",
    "all our yesterdays",
    "the space between",
    "the things we keep",
    "the unfinished goodbye",
    "the sound of forever",
    "everything is borrowed",
    "where the story bends",
    "the moment after",
    "all that remains",
    "time, misplaced",
    "the illusion of always",
    "every ordinary day",
    "when forever ended",
    "history repeats quietly",
    "what survives us",
    "the forgotten minutes",
    "all the little infinities",
    "this version of forever"
];

    
    let baseTitle;
    let attempts = 0;
    const maxAttempts = titles.length * 3;

    do {
        baseTitle = titles[Math.floor(Math.random() * titles.length)];
        attempts++;
    } while (wasUsed("titles", baseTitle) && attempts < maxAttempts);

    markUsed("titles", baseTitle);

    return `${baseTitle} #${dayNumber}`;
}


module.exports = generateTitle;