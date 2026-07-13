const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const generateVlog = require("./pipeline/generateVlog");

const {
    updateJob,
    getJob,
    subscribe
} = require("../jobs/jobState");


const app = express();

const PORT = 3000;


// -------------------------
// Middleware
// -------------------------

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());


// -------------------------
// File Upload Setup
// -------------------------

const upload = multer({
    dest: "temp/"
});


// -------------------------
// Live Status Stream
// -------------------------

app.get("/events", (req, res) => {

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



// -------------------------
// Upload Endpoint
// -------------------------

app.post(
    "/upload",
    upload.array("media"),
    async (req,res)=>{


    try {


        console.log(
            "📱 Files received:",
            req.files.length
        );


        updateJob({

            status:"uploading",

            stage:
            `Receiving ${req.files.length} videos`

        });



        const jobId =
            Date.now();



        const jobFolder =
            path.join(
                __dirname,
                "jobs",
                String(jobId)
            );



        fs.mkdirSync(
            jobFolder,
            {
                recursive:true
            }
        );



        for(const file of req.files){


            fs.renameSync(
                file.path,
                path.join(
                    jobFolder,
                    file.originalname
                )
            );


        }



        console.log(
            "Job folder:",
            jobFolder
        );



        updateJob({

            status:"processing",

            stage:"Creating vlog..."

        });



        await generateVlog(
            jobFolder,
            jobId
        );



        updateJob({

            status:"complete",

            stage:"Vlog complete 🎉"

        });



        res.json({

            success:true,

            jobId

        });



    }
    catch(err){


        console.error(err);


        updateJob({

            status:"error",

            stage:
            "Something went wrong"

        });


        res.status(500).json({

            success:false,

            error:err.message

        });


    }


});



// -------------------------
// Start Server
// -------------------------

app.listen(
    PORT,
    ()=>{
        console.log(
            `🚀 VideoVlog server running on port ${PORT}`
        );
    }
);