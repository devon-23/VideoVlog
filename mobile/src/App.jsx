import { useState, useEffect, useRef } from "react";

import UploadCard from "./components/UploadCard";
import FileList from "./components/FileList";
import StatusCard from "./components/StatusCard";
import CompleteCard from "./components/CompleteCard";

import "./styles.css";

function App(){

    const [files,setFiles] = useState([]);

    const [status,setStatus] = useState({
        status:"idle",
        stage:"Ready"
    });

    const [isProcessing, setIsProcessing] = useState(false);

    const fileInput = useRef(null);


    useEffect(()=>{

        const events = new EventSource(
            "http://localhost:3000/events"
        );

        events.onmessage = (event)=>{

            const data = JSON.parse(event.data);

            console.log("STATUS:", data);

            setStatus(data);

            if (data.status === "complete") {
                setIsProcessing(false);
            }

        };

        return ()=>{
            events.close();
        };

    },[]);


    function handleFiles(event){
        const selected = Array.from(event.target.files);
        addFiles(selected);
    }


    // shared by both the file picker and drag-and-drop
    function addFiles(newFiles){

        const incoming = Array.from(newFiles);

        setFiles(prev => {

            // skip exact duplicates (same name + size) if dropped twice
            const existingKeys = new Set(
                prev.map(f => `${f.name}-${f.size}`)
            );

            const deduped = incoming.filter(
                f => !existingKeys.has(`${f.name}-${f.size}`)
            );

            return [...prev, ...deduped];

        });

    }


    function handleDrop(droppedFiles){
        addFiles(droppedFiles);
    }


    async function upload(){

        setIsProcessing(true);

        const form = new FormData();

        files.forEach(file=>{
            form.append("media", file);
        });

        await fetch(
            "http://localhost:3000/upload",
            {
                method:"POST",
                body:form
            }
        );

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
        setIsProcessing(false);

    }


    return (

        <div className="app">

            <header className="app-header">
                <span className="eyebrow">
                    Reel #{new Date().getMonth()+1}/{new Date().getDate()}
                </span>
                <h1>VideoVlog</h1>
                <p className="subtitle">
                    Load today's clips — we'll develop the rest
                </p>
            </header>

            {
                status.status === "complete"
                ?
                <CompleteCard reset={reset} />
                :
                <>

                <UploadCard
                    fileInput={fileInput}
                    handleFiles={handleFiles}
                    handleDrop={handleDrop}
                    upload={upload}
                    disabled={files.length===0 || isProcessing}
                    isProcessing={isProcessing}
                />

                {
                    files.length > 0 &&
                    <FileList files={files} />
                }

                <StatusCard status={status} />

                </>
            }

        </div>

    );

}

export default App;
