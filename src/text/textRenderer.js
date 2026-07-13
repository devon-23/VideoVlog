const fs = require("fs");
const os = require("os");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const getPosition = require("./textPosition");

// Escape text for safe use inside a single-quoted drawtext text value
function escapeDrawtext(text) {
    return String(text)
        .replace(/'/g, "\u2019")   // swap straight apostrophe for typographic one — sidesteps escaping entirely
        .replace(/\\/g, "\\\\")    // backslash
        .replace(/:/g, "\\:")      // colon (option separator)
        .replace(/%/g, "\\%");     // percent (drawtext expansion char)
}

function addText(video, textTimeline, output) {
    return new Promise((resolve, reject) => {

        const filterParts = textTimeline.map((item, index) => {
            const outputName = index === textTimeline.length - 1
                ? "outv"
                : `v${index}`;

            const input = index === 0 ? "[0:v]" : `[v${index - 1}]`;

            const fontsize = item.type === "date" ? 70 : 90;
            const position = getPosition(item.position);

            const enableExpr = `'between(t,${item.start},${item.end})'`;

            const drawtext = [
                `drawtext=text=${escapeDrawtext(item.text)}`,   // <-- no surrounding quotes
                `fontfile='/System/Library/Fonts/Supplemental/DIN Alternate Bold.ttf'`,
                `fontsize=${fontsize}`,
                `fontcolor=white`,
                //`borderw=2`,
                //`bordercolor=black`,
                `x=${position.x}`,
                `y=${position.y}`,
                `enable=${enableExpr}`   // this one was already working fine, leave as-is
            ].join(":");

            return `${input}${drawtext}[${outputName}]`;
        });

        const filterComplex = filterParts.join(";\n");

        // Write the filter graph to a temp script file to avoid any
        // command-line escaping issues entirely
        const scriptPath = path.join(os.tmpdir(), `filter_${Date.now()}.txt`);
        fs.writeFileSync(scriptPath, filterComplex, "utf8");

        console.log("Filter script:\n", filterComplex);

        ffmpeg(video)
            .outputOptions([
                "-filter_complex_script", scriptPath,
                "-map", "[outv]",
                "-map", "0:a?"
            ])
            .on("start", command => {
                console.log("Adding text...");
                console.log(command);
            })
            .on("end", () => {
                fs.unlink(scriptPath, () => {});
                console.log("✏️ Text added");
                resolve();
            })
            .on("error", (err, stdout, stderr) => {
                fs.unlink(scriptPath, () => {});
                console.log(stderr);
                reject(err);
            })
            .save(output);
    });
}

module.exports = addText;