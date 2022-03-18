import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./SimpleTextButtonStyles";

interface ISimpleTextButton {
    onPress?: (ev : any) => void,
    text?: string,
    style?: any
}

export default function SimpleTextButton (props : ISimpleTextButton){
    return (

        <TouchableOpacity onPress = {props.onPress} >
            <Text style={[styles.TextButtonText, props.style]}>{props.text}</Text>
        </TouchableOpacity>
    );    
} 