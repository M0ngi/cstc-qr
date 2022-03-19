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
        marginTop: 20,
    },
    nameStyle:{
        fontSize: 20, 
        fontWeight: "bold",
        marginLeft: 15
    },
    mainContent:{
        marginTop: Dimensions.get("screen").height * 0.08,
        marginBottom: Dimensions.get("screen").height * 0.01,
        fontSize: 18,
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