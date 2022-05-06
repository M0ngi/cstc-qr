import React from "react";
import {
	View,
	TouchableWithoutFeedback,
	Keyboard,
	StyleSheet,
	ScrollView,
	ImageBackground
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import bg from "./../../assets/bg.jpg"

interface BackgroundProps {
    children?: React.ReactNode;
}

export default function Background({ children } : BackgroundProps){
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<ImageBackground source={bg} resizeMode="cover" style={{width: "100%", height:"100%" }} >
				<SafeAreaView>
					<View style={{ justifyContent: "center" }}>
						<ScrollView
							contentContainerStyle={styles.registerContainer}>
							{children}
						</ScrollView>
					</View>
				</SafeAreaView>
			</ImageBackground>
		
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
	},
	registerContainer: {
		justifyContent: "center",
		alignItems: "center",
		minWidth: "100%",
	},
});
