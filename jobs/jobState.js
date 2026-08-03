let currentJob = {
    status:"idle",
    stage:"",
    files:[]
};


const listeners = [];


function updateJob(data){

    currentJob = {
        ...currentJob,
        ...data
    };


    listeners.forEach(res=>{
        res.write(
            `data: ${JSON.stringify(currentJob)}\n\n`
        );
    });

}



function getJob(){

    return currentJob;

}



function subscribe(res){

    listeners.push(res);

}


module.exports = {
    updateJob,
    getJob,
    subscribe
};