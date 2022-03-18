import React, { useContext, useState } from "react";
import {
	View,
	TextInput,
	Image,
	Keyboard,
	StyleSheet,
	Dimensions,
	Text
} from "react-native";
import { Card } from 'react-native-elements';

import { Entypo, MaterialIcons } from "@expo/vector-icons";

import Background from "../../components/Background/Background";
import { signinWithFacebook, loginUser } from "../../services/auth/loginService";

import BlueButton from "../../components/BlueButton/BlueButton";
import SimpleTextButton from "../../components/SimpleTextButton/SimpleTextButton";
import Seperator from "../../components/Seperator/Seperator";
import { InfoDispatcher } from "../../contexts/InfoProvider";


type eyeIconValues = "eye-with-line" | "eye" | undefined; 
const defaultValue : eyeIconValues = "eye"


export function LoginPageScreen () {
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPassowrdInput] = useState("");
	const [isSecureText, setIsSecureText] = useState(true);
	const [eyeIcon, setEyeIcon] = useState(defaultValue);
	const [validEmail, setValidEmail] = useState(true);
	const [validPassword, setValidPassword] = useState(true);

	const dispatchInfo = useContext(InfoDispatcher);

	const signUpButtonHandler = async () => {
		if((validEmail && validPassword)){
			Keyboard.dismiss();
			dispatchInfo({loading: true});
			await loginUser(emailInput, passwordInput)
			.then(() => { 
				dispatchInfo({loading: false});
			})
			.catch((error : any)=> {
				dispatchInfo({loading: false, error:error});
			})
		}

		
	};

	const handlePasswordVisibility = () => {
		if (eyeIcon == "eye") {
			setIsSecureText(false);
			setEyeIcon("eye-with-line");
		} else {
			setIsSecureText(true);
			setEyeIcon("eye");
		}
	};
	const emailInputHandler = (textInput : string) => {
		setEmailInput(textInput);
		(String(textInput)
		.toLowerCase()
		.match(
		  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)) ? setValidEmail(true) : setValidEmail(false);
	};
	const passwordInputHandler = (textInput : string) => {
		setPassowrdInput(textInput);
		(textInput.length >= 8) ? setValidPassword(true) : setValidPassword(false);
	};

	// To add later
	const forgotButtonHandler = () => {
	};

	const SigninFBHandler = () => {
		signinWithFacebook().catch((error : any)=> {
		// 	dispatchInfo({payload : {error}});	
		})	

	};

	return (
		<Background>
			<Image
                source={require('../../assets/logo-name-slogan.png')}
                style={styles.logo}
            />

			<Card containerStyle={styles.container} >	
				<Text style ={{alignSelf:"center", fontSize: 20, fontWeight: "bold", marginBottom: 30}} >Staff login</Text>
				<View style={[styles.inputContainer, !validEmail && styles.invalidInput]}>
					{/*Email Box */}
					<Entypo
						name='email'
						size={20}
						color='#507686'
						style={styles.inputIcon}
					/>
					<TextInput
						style={styles.inputBox}
						placeholder={"E-mail or phone"}
						placeholderTextColor='#507686'
						keyboardType='email-address'
						onChangeText={emailInputHandler}
						value={emailInput}
					/>
				</View>

				<View style={[styles.inputContainer, !validPassword && styles.invalidInput ]}>
					{/*Password Box */}
					<MaterialIcons
						name='lock'
						size={20}
						color='#507686'
						style={styles.inputIcon}
					/>
					<TextInput
						style={styles.inputBox}
						placeholder={"Password"}
						placeholderTextColor='#507686'
						secureTextEntry={isSecureText}
						onChangeText={passwordInputHandler}
						value={passwordInput}	
					/>
					<Entypo
						name={eyeIcon}
						size={20}
						color='#507686'
						style={(styles.inputIcon, { marginRight: 10 })}
						onPress={handlePasswordVisibility}
					/>
				</View>

				<SimpleTextButton
					style={{ color: "#000", textDecorationLine: "underline"}}
					text=''
					onPress={forgotButtonHandler}
				/>

			<BlueButton text={"Sign in"} buttonHandler={signUpButtonHandler} />

			<Seperator />

			<BlueButton
				text={"Sign in with Facebook"}
				buttonHandler={SigninFBHandler}
			/>
			</Card>

		</Background>
	);
};




const styles = StyleSheet.create({
    container:{
        borderRadius: 20,
        width: Dimensions.get("screen").width-50,
        height:Dimensions.get("screen").height/1.7,
        display:"flex",
        flexDirection: "column",
        alignItems:"center",
        justifyContent:"flex-start",
    },
    logo:{
        width:"70%",
        resizeMode: "contain",
        
    },
	loginContainer: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		backgroundColor: "#F8F8F8",
		borderColor: "#A8A8A8",
		borderWidth: 1,
		borderRadius: 10,
		marginVertical: 10,
		alignSelf: "center"
	},
	inputIcon: {
		marginLeft: 10,
	},
	inputBox: {
		flex: 1,
		width:"60%",
		color: "#525252",
		fontSize: 16,
		padding: 10,
		fontWeight:"bold"
	},
	invalidInput:{
		borderColor: "red",
		borderWidth: 2
	}

  });

