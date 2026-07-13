import { useState } from "react";

function UploadCard({

    fileInput,
    handleFiles,
    handleDrop,
    upload,
    disabled,
    isProcessing

}){

    const [isDragging, setIsDragging] = useState(false);


    function onDragOver(event){
        event.preventDefault();
        setIsDragging(true);
    }

    function onDragLeave(event){
        event.preventDefault();
        setIsDragging(false);
    }

    function onDrop(event){
        event.preventDefault();
        setIsDragging(false);

        if (event.dataTransfer?.files?.length) {
            handleDrop(event.dataTransfer.files);
        }
    }

    // clicking anywhere in the dropzone opens the file picker too,
    // as long as the click didn't originate on the input itself
    function onDropzoneClick(event){
        if (event.target !== fileInput.current) {
            fileInput.current?.click();
        }
    }


return (

<div className="card upload-card">

    <h3>Load clips</h3>

    <div
        className={`dropzone${isDragging ? " dragging" : ""}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={onDropzoneClick}
        role="button"
        tabIndex={0}
    >

        <span className="dropzone-label">
            {isDragging
                ? "Drop to load"
                : "Drag clips here, or click to browse"}
        </span>

        <input

            ref={fileInput}

            type="file"

            accept="video/*"

            multiple

            onChange={handleFiles}

        />

    </div>

    <button

        className="shutter-btn"

        onClick={upload}

        disabled={disabled}

    >

        <span className="shutter-dot" aria-hidden="true" />
        {isProcessing ? "Developing…" : "Create vlog"}

    </button>


</div>


);


}


export default UploadCard;
