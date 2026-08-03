function FileList({files}){


return (

<div className="card filelist">


<h3>
Contact sheet · {files.length} {files.length === 1 ? "clip" : "clips"}
</h3>


{

files.map((file,index)=>(

<div
    className="frame"
    key={index}
>

    <span className="frame-index">
        {String(index + 1).padStart(2, "0")}
    </span>

    <span className="frame-name">
        {file.name}
    </span>

</div>

))

}


</div>

);


}


export default FileList;
