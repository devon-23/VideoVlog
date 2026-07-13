const fs = require("fs");
const path = require("path");


const historyFile =
    path.join(
        __dirname,
        "../../videovlog/history/used.json"
    );



function normalize(value){

    return String(value)

        // normalize curly quotes
        .replace(/[’‘]/g, "'")
        .replace(/[“”]/g, '"')

        // remove punctuation
        .replace(/[.,!?]/g, "")

        // remove extra spaces
        .replace(/\s+/g, " ")

        // lowercase
        .trim()
        .toLowerCase();

}



function loadHistory(){

    return JSON.parse(
        fs.readFileSync(
            historyFile,
            "utf8"
        )
    );

}



function saveHistory(history){

    fs.writeFileSync(

        historyFile,

        JSON.stringify(
            history,
            null,
            4
        )

    );

}



function wasUsed(type,value){

    const history =
        loadHistory();


    const normalizedValue =
        normalize(value);


    return history[type]
        .some(item =>
            normalize(item) === normalizedValue
        );

}



function markUsed(type,value){

    const history =
        loadHistory();


    const normalizedValue =
        normalize(value);


    if(!history[type].includes(normalizedValue)){

        history[type].push(
            normalizedValue
        );

    }


    saveHistory(history);

}



module.exports = {

    wasUsed,

    markUsed

};