const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

const credentials = JSON.parse(
    fs.readFileSync("../../credentials.json", "utf8")
);
console.log("Loaded client_id:", credentials.installed.client_id);
const { client_id, client_secret, redirect_uris } = credentials.installed;

const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris ? redirect_uris[0] : "urn:ietf:wg:oauth:2.0:oob"
);

const SCOPES = ["https://www.googleapis.com/auth/youtube.upload"];

const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent"
});

console.log("Authorize this app by visiting this url:\n", authUrl);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("\nPaste the code from that page here: ", (code) => {
    rl.close();

    oAuth2Client.getToken(code, (err, token) => {
        if (err) {
            console.error("Error retrieving access token", err);
            return;
        }

        fs.writeFileSync("./token.json", JSON.stringify(token, null, 2));
        console.log("Token stored to token.json");
    });
});