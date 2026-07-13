import { useState, useEffect } from "react";


function App() {

    const [files, setFiles] = useState([]);

    const [status, setStatus] = useState({
        status: "idle",
        stage: "Ready"
    });


    useEffect(() => {

        const events = new EventSource(
            "http://localhost:3000/events"
        );


        events.onmessage = (event) => {

            const data = JSON.parse(event.data);

            console.log("STATUS UPDATE:", data);

            setStatus(data);

        };


        return () => {
            events.close();
        };


    }, []);



    function handleFiles(e){

        setFiles(
            Array.from(e.target.files)
        );

    }



    async function upload(){

        const form = new FormData();


        files.forEach(file => {

            form.append(
                "media",
                file
            );

        });


        await fetch(
            "http://localhost:3000/upload",
            {
                method:"POST",
                body:form
            }
        );

    }



    return (

        <div>

            <h1>
                📼 VideoVlog
            </h1>


            <h3>
                Create today's vlog
            </h3>


            <h2>
                {status.stage}
            </h2>


            <input
                type="file"
                accept="video/*,image/*"
                multiple
                onChange={handleFiles}
            />


            <p>
                {files.length} files selected
            </p>


            <button
                onClick={upload}
                disabled={!files.length}
            >
                Create Vlog
            </button>


        </div>

    );

}


export default App;