function CompleteCard({reset}){


return (

<div className="card complete">


<h2>
🎉 Complete!
</h2>


<p>
Your vlog is ready.
</p>


<button

onClick={reset}

>

Create Another

</button>


</div>


);


}


export default CompleteCard;