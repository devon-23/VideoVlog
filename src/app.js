const generateVlog = require("./pipeline/generateVlog");

generateVlog()
    .then(() => console.log("Done!"))
    .catch(console.error);