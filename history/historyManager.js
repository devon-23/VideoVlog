const fs = require("fs");
const path = require("path");


const historyFile =
    path.join(
        __dirname,
        "../../videovlog/history/used.json"
    );


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


    return history[type]
        .includes(value);

}



function markUsed(type,value){

    const history =
        loadHistory();


    history[type].push(value);


    saveHistory(history);

}

module.exports = {
    wasUsed,
    markUsed
};