function StatusCard({status}){


return (

<div className="card status-card">


<h3>
Status
</h3>


<div className="status-row">

    <span className="tally-light" aria-hidden="true" />

    <span className="stage">
        {status.stage}
    </span>

</div>


<div className="filmstrip-track" aria-hidden="true">
    <span className="scan" />
</div>


</div>

);


}


export default StatusCard;
