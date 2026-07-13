const multer = require("multer");
const fs = require("fs");
const path = require("path");
const express = require("express");
const generateVlog = require("./pipeline/generateVlog");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("VideoVlog server is running");
});

const jobsFolder = path.join(
    __dirname,
    "../jobs"
);

if (!fs.existsSync(jobsFolder)) {
    fs.mkdirSync(jobsFolder);
}

const upload = multer({
    dest: jobsFolder
});

app.post("/generate", async (req, res) => {
    console.log("Generate request received");

    try {
        const result = await generateVlog();

        res.json({
            success: true,
            result
        });

    } catch(error) {
        console.error(error);

        res.status(500).json({
            success:false,
            error:error.message
        });
    }
});

app.post(
    "/upload",
    upload.array("media"),
    async (req,res)=>{
        console.log(
            "📱 Files received:",
            req.files.length
        );

        try {
            const jobFolder =
                path.join(
                    jobsFolder,
                    Date.now().toString()
                );
            fs.mkdirSync(jobFolder);
            // move uploaded files into job folder

            req.files.forEach(file=>{

                fs.renameSync(
                    file.path,
                    path.join(
                        jobFolder,
                        file.originalname
                    )
                );
                console.log(
                    "JOB FOLDER CONTENTS:",
                    fs.readdirSync(jobFolder)
                );
            });
            console.log(
                "Job folder:",
                jobFolder
            );
            try {
                const result =
                    await generateVlog({
                        uploadsFolder: jobFolder
                    });
                res.json({
                    success:true,
                    result
                });
            }
            finally {
                fs.rmSync(
                    jobFolder,
                    {
                        recursive:true,
                        force:true
                    }
                );
                console.log(
                    "Job folder deleted"
                );
            }
        }
        catch(error){
            console.error(error);
            res.status(500).json({
                success:false,
                error:error.message
            });
        }
    }
);

app.listen(PORT, ()=>{
    console.log(
        `VideoVlog server running on port ${PORT}`
    );

});

app.get("/status",(req,res)=>{

    res.json({

        running:true,

        service:"VideoVlog"

    });

});