import React from "react"
import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native"
import styles from "./BlueButtonStyles"

interface IBlueButton {
    style ?: any
    text : string;
    buttonHandler : (event : any) => void,
    disabled ?: boolean
}

const BlueButton = (props : IBlueButton ) => {

    return (
        <TouchableOpacity style={{...styles.signInButton,...props.style}} onPress={props.buttonHandler} disabled={props.disabled} >
            <Text style={styles.signInButtonText}>{props.text}</Text>
        </TouchableOpacity>
    );
}

export default BlueButton;