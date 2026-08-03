import { 
    View, 
    Text, 
    Pressable,
    StyleSheet
} from "react-native";

import { router } from "expo-router";


export default function Home(){

    return (

        <View style={styles.container}>

            <Text style={styles.logo}>
                📼
            </Text>

            <Text style={styles.title}>
                VideoVlog
            </Text>

            <Text style={styles.subtitle}>
                Turn your daily moments into a vlog
            </Text>


            <Pressable
                style={styles.button}
                onPress={() => router.push("./upload")}
            >

                <Text style={styles.buttonText}>
                    Choose Videos
                </Text>

            </Pressable>


        </View>

    );

}



const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#111"
    },


    logo:{
        fontSize:70
    },


    title:{
        fontSize:40,
        color:"white",
        fontWeight:"700",
        marginTop:20
    },


    subtitle:{
        color:"#aaa",
        fontSize:16,
        marginTop:10,
        marginBottom:40
    },


    button:{
        backgroundColor:"white",
        paddingHorizontal:40,
        paddingVertical:15,
        borderRadius:30
    },


    buttonText:{
        color:"#111",
        fontSize:18,
        fontWeight:"600"
    }

});