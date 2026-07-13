function StatusCard({status}){


return (

<div className="card">


<h3>
Status
</h3>


<p>

{
status.stage
}

</p>


</div>

);


}


export default StatusCard;