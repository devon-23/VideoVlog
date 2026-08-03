const fs = require("fs");


function writeManifest(data, outputPath){


    fs.writeFileSync(

        outputPath,

        JSON.stringify(
            data,
            null,
            4
        )

    );


    console.log("📄 vlog.json created");

}


module.exports = writeManifest;