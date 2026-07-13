const multer = require("multer");
const fs = require("fs");
const path = require("path");
const express = require("express");
const generateVlog = require("./pipeline/generateVlog");

const app = express();

const PORT = 3000;

const {
    updateJob
} = require("../jobs/jobState");

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
        const result = await generateVlog(jobFolder);

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
        updateJob({
            status:"uploading",
            stage:"Receiving videos..."
        });
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

            console.log("Job folder:", jobFolder);

            updateJob({
                status:"uploading",
                stage:`Received ${req.files.length} videos`
            });

            try {
                updateJob({
                    status:"processing",
                    stage:"Creating vlog..."
                });

                const result =
                    await generateVlog(jobFolder); // <-- fixed: pass the string directly

                res.json({
                    success:true,
                    result
                });

                updateJob({
                    status:"complete",
                    stage:"Vlog complete 🎉"
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
                console.log("Job folder deleted");
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

app.get("/status/:id",(req,res)=>{

    const {
        getJob
    } = require("../jobs/jobTracker");


    const job =
        getJob(req.params.id);


    res.json(
        job || {
            error:"Job not found"
        }
    );

});

const {
    subscribe,
    getJob
} = require("../jobs/jobState");


app.get("/events",(req,res)=>{

    res.setHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:5173"
    );

    res.setHeader(
        "Content-Type",
        "text/event-stream"
    );

    res.setHeader(
        "Cache-Control",
        "no-cache"
    );

    res.setHeader(
        "Connection",
        "keep-alive"
    );


    res.write(
        `data: ${JSON.stringify(getJob())}\n\n`
    );


    subscribe(res);

});