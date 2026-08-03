const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload"
];

function getAuthClient() {
    const credentials = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, "../../client_secret.json"),
            "utf8"
        )
    );

    const token = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, "../../token.json"),
            "utf8"
        )
    );

    const { client_id, client_secret, redirect_uris } = credentials.installed;

    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris ? redirect_uris[0] : "urn:ietf:wg:oauth:2.0:oob"
    );

    oAuth2Client.setCredentials(token);

    return oAuth2Client;
}

async function uploadVideo(videoPath, title, description) {

    const auth = getAuthClient();

    const youtube = google.youtube({
        version: "v3",
        auth
    });

    const response = await youtube.videos.insert({
        part: [
            "snippet",
            "status"
        ],
        requestBody: {
            snippet: {
                title: title,
                description: description,
                tags: [
                    "vlog",
                    "daily vlog",
                    "memories"
                ]
            },
            status: {
                privacyStatus: "public"
            }
        },
        media: {
            body: fs.createReadStream(videoPath)
        }
    });

    console.log("Uploaded:", response.data.id);

    return response.data.id;
}

module.exports = uploadVideo;