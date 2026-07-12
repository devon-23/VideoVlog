const quotes = require("./quotes.json");


function getRandomQuote(){


    const index =
        Math.floor(
            Math.random() * quotes.length
        );


    return quotes[index];

}


module.exports = getRandomQuote;