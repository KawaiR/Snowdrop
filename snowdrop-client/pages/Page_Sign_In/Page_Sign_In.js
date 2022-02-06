import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, ScrollView, TextInput, StyleSheet, Animated, Dimensions, Vibration, Alert, KeyboardAvoidingView, Platform} from "react-native";
import { TouchableOpacity, PixelRatio } from "react-native";
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AppLoading from 'expo-app-loading';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import {Lato_400Regular} from '@expo-google-fonts/lato';


function pxRD (px) {
	const {
		width,
		height,
	} = Dimensions.get("window");

	return Math.round(PixelRatio.roundToNearestPixel(height * px / 896));
}

const Page_Sign_In  = ({navigation}) => {
	useEffect(() => {
	}, []);
	const [email, onChangeEmail] = React.useState("");
	const [password, onChangePassword] = React.useState("");
	
	let [fontsLoaded] = useFonts({
		Alata_400Regular,
		Lato_400Regular,
	});
	if (!fontsLoaded) {
		return <AppLoading/>
	}
	return (
	<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{height: Dimensions.get("window").height}}>
	<ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{height: Dimensions.get("window").height}}>
		<View style = {noneModeStyles._Page}    >
			<View style = {noneModeStyles._Sign_Up_Navigation_Button}>
				<Text style = {noneModeStyles._Optional_Page_Description}>
					Don’t have an account?
				</Text>
				<Text style = {noneModeStyles._Optional_Button_Description} onPress={() => navigation.navigate('Page_Create_Account')}>
					Sign Up
				</Text>
			</View>
			<TouchableOpacity style = {noneModeStyles._Main_Navigation_Button}    >
				<Text style = {noneModeStyles._Main_Button_Description}   >
					Sign In
				</Text>
			</TouchableOpacity>
			<TextInput
				onChangeText={onChangePassword}
				value={password}
				placeholder="Password"
				style = {[noneModeStyles._Text_Field,noneModeStyles._Password_Location]}
			/>
			<Text style = {noneModeStyles._Forgot_Password_Navigation_Button} onPress={() => navigation.navigate('Page_Forgot_Password')}  >
				Forgot Password?
			</Text>
			<TextInput
				autoFocus={true}
				onChangeText={onChangeEmail}
				value={email}
				placeholder="Email"
				style = {[noneModeStyles._Text_Field,noneModeStyles._Email_Location]}
			/>


			<View style = {noneModeStyles._Icon_Frame}>
				<Image style = {noneModeStyles._Icon_Image} source = {require("./assets/icon_circle.png")}/>
				<Text  style = {noneModeStyles._App_Name}>SNOWDROP</Text>
			</View>
			<Text style = {noneModeStyles._Title_Description}   >
				Welcome back,{'\n'}Sign in to continue with your journey
			</Text>
			
		</View>
	</ScrollView>
	</KeyboardAvoidingView>
)}
export default Page_Sign_In

const noneModeStyles = StyleSheet.create({
	_Page: { 
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		backgroundColor:"#EDEECB",
	},
	_Snowdrop_Image: { 
		width: "auto",
		height: "auto",
		opacity: 0.3,
		position: "absolute",
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	},
	_Sign_Up_Navigation_Button: {
		width: "auto",
		height: "auto",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		right: "4.83091787%",
		left: "4.83091787%",
		top: "89.28571429%",
		bottom: "3.34821429%",
		paddingRight: "2.41545894%",
		paddingLeft: "2.41545894%",
		paddingTop: "1.11607143%",
		paddingBottom: "1.11607143%",
	},
	_Optional_Page_Description: {
		width: "auto",
		height: "auto",
		flexShrink: 0,
		marginRight: "2.41545894%",
		color: "rgba(60, 60, 67, 0.6)",
		fontSize: 15,
		fontWeight: "400",
		// fontFamily: "SF Pro Display",
		letterSpacing: -0.24,
		textAlign: "center",
	},
	_Optional_Button_Description: {
		width: "auto",
		height: "auto",
		flexShrink: 0,
		color: "rgb(0, 122, 255)",
		fontSize: 15,
		fontWeight: "600",
		// fontFamily: "SF Pro Text",
		letterSpacing: -0.24,
		textAlign: "center",
	},
	_Main_Navigation_Button: { 
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingRight: "19.3236715%",
		paddingLeft: "19.3236715%",
		paddingTop: "2.23214286%",
		paddingBottom: "2.23214286%",
		
		position: "absolute",
		right: "20.77294686%",
		left: "20.53140097%",
		top: "79.79910714%",
		bottom: "12.946429%",
		
		backgroundColor: "rgba(0, 122, 255, 0.6)",
		borderRightWidth: 4,
		borderLeftWidth: 4,
		borderTopWidth: 4,
		borderBottomWidth: 4,
		borderStyle: "solid",
		borderColor: "rgb(0, 0, 0)",
		borderRadius: 14,
	},
	_Main_Button_Description: { 
		width: "auto",
		height: "auto",
		flexShrink: 0,
		color: "rgb(255, 255, 255)",
		fontSize: 17,
		fontWeight: "600",
		// fontFamily: "SF Pro Text",
		letterSpacing: -0.408,
		textAlign: "center",
	},
	_Forgot_Password_Navigation_Button: { 
		width: "auto",
		height: "auto",
		position: "absolute",
		right: "9.6618357488%",
		top: "45.2008928571%",
		color: "rgb(0, 122, 255)",
		fontSize: 15,
		fontWeight: "600",
		// fontFamily: "SF Pro Text",
		letterSpacing: -0.24,
		textAlign: "right",
	},
	_Text_Field: { 
		width: "87.92%",
		height: "6.36%",
		alignSelf: "center",
		display: "flex",
		flexDirection: "column",
		position: "absolute",
		paddingTop: 16,
		paddingRight: 8,
		paddingBottom: 8,
		paddingLeft: 8,
		borderBottomWidth: 2,
		borderBottomColor: "rgba(0,0,0,0.4)"
	},
	_Email_Location: { 
		top: "35.6026785714%",
	},
	_Password_Location: { 
		top: "43.0803571429%",
	},
	_Title_Description: { 
		position: "absolute",
		alignSelf: "center",
		width: "87.92%",
		height: "6.36%",
		top: "28.125%",
		bottom: "65.51339286%",
		fontSize: pxRD(14),
		fontFamily: "Lato_400Regular",
		textAlign: "center",
		color: "#898C7B",
	},
	_Icon_Frame: {
		position: "absolute",
		alignSelf:"center",
		height: "21.43%",
		width: "58.21%",
		top: "5.58035714%",
	},
	_App_Name: {
		width: "91.70%",
		marginHorizontal: "4.14937759%",
		alignSelf: "center",
		alignContent: "center",
		textAlign: "center",
		color: "#005500",
		fontSize: pxRD(36),
		fontFamily: "Alata_400Regular",
	},
	_Icon_Image: {
		height: "72.9%",
		marginHorizontal: "4.14937759%",
		alignSelf: "center",
		aspectRatio: 1,
	}
})

