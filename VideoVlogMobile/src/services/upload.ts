import { SERVER } from "../constants/config";


export async function uploadVideos(videos:any[]) {

    const formData = new FormData();


    videos.forEach((video,index)=>{

        formData.append(
            "media",
            {
                uri: video.uri,
                name:
                    video.fileName ??
                    `media_${index}`,

                type:
                    video.mimeType ??
                    "application/octet-stream"

            } as any
        );

    });


    const response =
        await fetch(
            `${SERVER}/upload`,
            {
                method:"POST",
                body:formData,

                headers:{
                    "Content-Type":
                        "multipart/form-data"
                }
            }
        );


    return response.json();

}