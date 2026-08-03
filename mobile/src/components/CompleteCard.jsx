function CompleteCard({reset}){


return (

<div className="card complete">


<h2>
Reel developed
</h2>


<p>
Your vlog is ready and uploaded.
</p>


<button

className="shutter-btn"

onClick={reset}

>

Create another

</button>


</div>


);


}


export default CompleteCard;
