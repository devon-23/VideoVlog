import { useState, useEffect, useRef } from "react";

import UploadCard from "./components/UploadCard";
import FileList from "./components/FileList";
import StatusCard from "./components/StatusCard";
import CompleteCard from "./components/CompleteCard";


function App(){

    const [files,setFiles] = useState([]);

    const [status,setStatus] = useState({

        status:"idle",

        stage:"Ready"

    });


    const fileInput = useRef(null);



    useEffect(()=>{


        const events = new EventSource(
            "http://localhost:3000/events"
        );


        events.onmessage = (event)=>{

            const data =
                JSON.parse(event.data);


            console.log(
                "STATUS:",
                data
            );


            setStatus(data);

        };


        return ()=>{

            events.close();

        };


    },[]);




    function handleFiles(event){

        const selected =
            Array.from(
                event.target.files
            );


        setFiles(selected);

    }





    async function upload(){


        const form =
            new FormData();



        files.forEach(file=>{

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



        // clear selected files

        setFiles([]);


        if(fileInput.current){

            fileInput.current.value="";

        }


    }




    function reset(){


        setStatus({

            status:"idle",

            stage:"Ready"

        });


        setFiles([]);

    }




    return (

        <div className="app">


            <h1>
                📼 VideoVlog
            </h1>


            <p className="subtitle">
                Turn today's clips into a story
            </p>



            {
                status.status === "complete"
                ?

                <CompleteCard
                    reset={reset}
                />

                :

                <>


                <UploadCard

                    fileInput={fileInput}

                    handleFiles={handleFiles}

                    upload={upload}

                    disabled={
                        files.length===0
                    }

                />



                {
                    files.length > 0 &&
                    <FileList
                        files={files}
                    />
                }



                <StatusCard

                    status={status}

                />


                </>


            }


        </div>

    );

}


export default App;