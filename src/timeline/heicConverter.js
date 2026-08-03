const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function convertHeicFiles(folder) {
    const files = fs.readdirSync(folder);

    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();

        if (ext === ".heic") {
            const fullPath = path.join(folder, file);
            const jpgPath = fullPath.replace(/\.heic$/i, ".jpg");

            if (fs.existsSync(jpgPath)) {
                return; // already converted
            }

            console.log(`Converting ${file} to JPEG...`);

            try {
                execSync(
                    `sips -s format jpeg "${fullPath}" --out "${jpgPath}"`,
                    { stdio: "pipe" }
                );
            } catch (err) {
                console.error(`Failed to convert ${file}:`, err.message);
            }
        }
    });
}

module.exports = convertHeicFiles;