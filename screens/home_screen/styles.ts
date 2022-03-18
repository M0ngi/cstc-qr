import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        borderRadius: 20,
        width: Dimensions.get("screen").width-50,
        height:Dimensions.get("screen").height/1.3,
        marginTop: Dimensions.get("screen").height/20,
        display:"flex",
        flexDirection: "column",
        justifyContent:"flex-start",
        backgroundColor: "white"
    },
    welcomeStyle: {
        fontSize: 20, 
        fontWeight: "bold", 
        marginTop: 30,
        alignSelf: "center"
    },
    mainContent:{
        marginTop: Dimensions.get("screen").height * 0.08,
        marginBottom: Dimensions.get("screen").height * 0.01,
        fontSize: 18,
        fontWeight: "bold", 
    },
    buttonsView: {
        alignSelf: "center"
    },
    logoutView:{
        marginTop: Dimensions.get("screen").height*0.1,
        backgroundColor: "red"
    }
});

export default styles;