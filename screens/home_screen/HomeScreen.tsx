import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements/dist/card/Card";
import Background from "../../components/Background/Background";
import BlueButton from "../../components/BlueButton/BlueButton";
import { InfoDispatcher } from "../../contexts/InfoProvider";
import { signOut } from "../../services/auth/loginService";
import { CurrentUser } from "../../utils/user";
import styles from "./styles";

export function HomeScreen() : JSX.Element{
    const infoDispatcher = useContext(InfoDispatcher);

    const CheckinMode = ()=>{

    }

    const EditProfileMode = () =>{
        
    }

    const logoutHandler = async () =>{
        infoDispatcher({loading: true});
        await signOut();
        infoDispatcher({loading: false});
    }
    return (
        <>
            <Background>
                <Card containerStyle={styles.container} >
                    <Text style ={styles.welcomeStyle} >Welcome back, {CurrentUser.user.name?.split(' ')[0]}!</Text>

                    <Text style ={styles.mainContent} >Here are your tools</Text>
                    <View style={styles.buttonsView}>
                        <BlueButton text={"Checkin Scanner"} buttonHandler={CheckinMode} />
                        <BlueButton text={"Edit profile scanner"} buttonHandler={EditProfileMode} />
                    </View>

                    <BlueButton style={styles.logoutView} text={"Sign out"} buttonHandler={logoutHandler} />
                </Card>
            </Background>
        </>
    );
}