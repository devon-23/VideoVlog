const quotes = require("./quotes.json");

const {
    wasUsed,
    markUsed
} = require("../../history/historyManager.js");

function getRandomQuote(){
    let available =
        quotes.filter(q => {


            const quoteText =
                q.sections.join(" ");


            return !wasUsed(
                "quotes",
                quoteText
            );


        });

    if(available.length === 0){
        throw new Error(
            "No unused quotes remaining"
        );
    }

    const quote =
        available[
            Math.floor(
                Math.random()
                *
                available.length
            )
        ];

    markUsed(
        "quotes",
        quote.sections.join(" ")
    );

    return quote;

}

module.exports = getRandomQuote;