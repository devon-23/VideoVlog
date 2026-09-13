import { File } from "expo-file-system";
import { SERVER } from "../constants/config";


export async function uploadVideos(videos:any[]) {

    const formData = new FormData();


    videos.forEach((video,index)=>{

        const name =
            video.fileName ??
            `media_${index}`;

        const file = new File(video.uri);

        formData.append(
            "media",
            file,
            name
        );

    });


    const response =
        await fetch(
            `${SERVER}/upload`,
            {
                method:"POST",
                body:formData
            }
        );


    return response.json();

}