import {
    View,
    Text,
    Pressable,
    StyleSheet
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import { uploadVideos } from "./upload";


export default function Upload(){

    const [videos,setVideos] = useState<any[]>([]);
    const [uploading,setUploading] = useState(false);
    const [message,setMessage] = useState("");


    async function pickVideos(){

        const result =
            await ImagePicker.launchImageLibraryAsync({

                mediaTypes:[
                    "videos",
                    "images"
                ],

                allowsMultipleSelection:true,

                quality:1

            });


        if(!result.canceled){

            setVideos(result.assets);

        }

    }


    async function sendVideos(){

        try {

            setUploading(true);
            setMessage("Uploading...");


            const result =
                await uploadVideos(videos);


            console.log(result);


            setMessage(
                "Upload complete 🎉"
            );


        }
        catch(error){

            console.log(error);

            setMessage(
                "Upload failed 😭"
            );

        }
        finally{

            setUploading(false);

        }

    }


    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                Choose your clips 🎬
            </Text>


            <Pressable
                style={styles.button}
                onPress={pickVideos}
            >
                <Text>
                    Select Videos
                </Text>

            </Pressable>


            {
                videos.length > 0 && (

                    <Pressable
                        style={styles.button}
                        onPress={sendVideos}
                        disabled={uploading}
                    >

                        <Text>
                            {
                            uploading
                                ? "Uploading..."
                                : "Build Vlog"
                            }
                        </Text>

                    </Pressable>

                )
            }


            <Text style={styles.count}>
                {videos.length} videos selected
            </Text>


            <Text>
                {message}
            </Text>


        </View>

    );

}


const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },


    title:{
        fontSize:28,
        marginBottom:30
    },


    button:{
        padding:20,
        backgroundColor:"#ddd",
        borderRadius:20,
        margin:10
    },


    count:{
        marginTop:20
    }

});