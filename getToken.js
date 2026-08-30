const fs = require("fs");
const http = require("http");
const { exec } = require("child_process");
const { google } = require("googleapis");

const credentials = JSON.parse(
    fs.readFileSync("credentials.json", "utf8")
);
const { client_id, client_secret } = credentials.installed;

const SCOPES = ["https://www.googleapis.com/auth/youtube.upload"];

let oAuth2Client;
let redirectUri;

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");

    if (url.pathname !== "/") {
        res.writeHead(404).end();
        return;
    }

    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h2>Authorization denied. You can close this tab.</h2>");
        console.error("Authorization denied:", error);
        server.close();
        process.exit(1);
    }

    if (!code) {
        res.writeHead(400).end();
        return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h2>YouTube authorized. You can close this tab.</h2>");

    server.close();

    try {
        const { tokens } = await oAuth2Client.getToken({
            code,
            redirect_uri: redirectUri
        });

        fs.writeFileSync("./token.json", JSON.stringify(tokens, null, 2));
        console.log("✅ Token stored to token.json");
        process.exit(0);
    } catch (err) {
        console.error("Error retrieving access token:", err.message);
        process.exit(1);
    }
});

server.listen(0, () => {
    const port = server.address().port;
    redirectUri = `http://localhost:${port}`;

    oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirectUri
    );

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        prompt: "consent"
    });

    console.log("Opening browser to authorize YouTube access...");
    console.log("If it doesn't open automatically, visit:\n", authUrl);

    exec(`open "${authUrl}"`, (err) => {
        if (err) {
            console.log("\nCouldn't auto-open a browser — copy the URL above into one manually.");
        }
    });
});
