function UploadCard({

    fileInput,
    handleFiles,
    upload,
    disabled

}){


return (

<div className="card">


<input

    ref={fileInput}

    type="file"

    accept="video/*"

    multiple

    onChange={handleFiles}

/>



<button

    onClick={upload}

    disabled={disabled}

>

🎬 Create Vlog

</button>


</div>


);


}


export default UploadCard;