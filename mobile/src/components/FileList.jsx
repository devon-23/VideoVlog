function FileList({files}){


return (

<div className="card">


<h3>
Selected Clips
</h3>


{

files.map((file,index)=>(

<div 
    className="file"
    key={index}
>

🎥 {file.name}


</div>

))

}


</div>

);


}


export default FileList;