// cleanup.js
const fs = require("fs");
const path = require("path");

function cleanUploadsFolder(uploadsFolder, keepFiles = []) {
    const files = fs.readdirSync(uploadsFolder);

    files.forEach(file => {
        if (keepFiles.includes(file)) {
            return; // skip files we want to keep
        }

        const fullPath = path.join(uploadsFolder, file);

        try {
            fs.unlinkSync(fullPath);
            console.log(`🗑️  Deleted: ${file}`);
        } catch (err) {
            console.error(`Failed to delete ${file}:`, err.message);
        }
    });
}

module.exports = cleanUploadsFolder;