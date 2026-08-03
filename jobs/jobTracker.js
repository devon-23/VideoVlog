const jobs = {};


function createJob(id){

    jobs[id] = {
        status:"starting",
        stage:"Starting...",
        created:new Date()
    };

    const {
        createJob
    } = require("../jobs/jobTracker");


    createJob(jobId);

}


function updateJob(id, data){

    if(!jobs[id]) return;

    jobs[id] = {
        ...jobs[id],
        ...data
    };

}


function getJob(id){

    return jobs[id];

}


module.exports = {
    createJob,
    updateJob,
    getJob
};