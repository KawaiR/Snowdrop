import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, ScrollView, TextInput, StyleSheet, Animated, Dimensions, Vibration, Alert, KeyboardAvoidingView, Platform} from "react-native";
import { TouchableOpacity } from "react-native";
import {image_Snowdrop_Image_2_link} from './assets/imageLinks.js'
import {image_icon_circle_2_link} from './assets/imageLinks.js'
const Page_Create_Account  = ({navigation}) => {
	useEffect(() => {
	}, []);
	const [email, onChangeEmail] = React.useState("");
	const [password, onChangePassword] = React.useState("");
	const [username, onChangeUsername] = React.useState("");
	return (
	<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{height: Dimensions.get("window").height}}>
	<ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{height: Dimensions.get("window").height}}>
		<View style = {noneModeStyles._Page}    >
			<View style = {noneModeStyles._Snowdrop_Image}    >
				<Image style={{height: "100%", width: "100%"}} source = {{uri: image_Snowdrop_Image_2_link}}/>
			</View>
			<View style = {noneModeStyles._Sign_In_Navigation_Button}    >
				<Text style = {noneModeStyles._Optional_Page_Description}   >
					Already have an account?
				</Text>
				<Text style = {noneModeStyles._Optional_Button_Description} onPress={() => navigation.navigate('Page_Sign_In')}  >
					Sign In
				</Text>
			</View>
			<TouchableOpacity style = {noneModeStyles._Main_Navigation_Button}    >
				<Text style = {noneModeStyles._Main_Button_Description}   >
					Sign Up
				</Text>
			</TouchableOpacity>
			<Text style = {noneModeStyles._Title_Description}   >
				Welcome aboard,{'\n'}Create an account to start your journey
			</Text>
			<TextInput
				onChangeText={onChangePassword}
				value={password}
				placeholder="Password"
				style = {[noneModeStyles._Text_Field,noneModeStyles._Password_Location]}
			/>
			<TextInput
				onChangeText={onChangeEmail}
				value={email}
				placeholder="Email"
				style = {[noneModeStyles._Text_Field,noneModeStyles._Email_Location]}
			/>
			<TextInput
				autoFocus={true}
				onChangeText={onChangeUsername}
				value={username}
				placeholder="Username"
				style = {[noneModeStyles._Text_Field,noneModeStyles._Username_Location]}
			/>
			<Image style = {noneModeStyles._Icon_Frame} source = {{uri: image_icon_circle_2_link}}/>
		</View>
	</ScrollView>
	</KeyboardAvoidingView>
)}
export default Page_Create_Account

const noneModeStyles = StyleSheet.create({
	_Page: { 
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		backgroundColor: "rgb(255, 255, 255)",
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
	_Sign_In_Navigation_Button: {
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
		right: "6.76328502%",
		top: "44%",
		color: "rgb(0, 122, 255)",
		fontSize: 15,
		fontWeight: "600",
		// fontFamily: "SF Pro Text",
		letterSpacing: -0.24,
		textAlign: "right",
	},
	_Text_Field: { 
		width: "auto",
		height: "auto",
		display: "flex",
		flexDirection: "column",
		position: "absolute",
		paddingTop: 8,
		paddingRight: 8,
		paddingBottom: 8,
		paddingLeft: 8,
		borderBottomWidth: 2,
		borderBottomColor: "rgba(0,0,0,0.4)"
	},
	_Username_Location: { 
		left: "4.83091787%",
		right: "4.83091787%",
		top: "32.03125%",
		bottom: "60.71428571%"
	},
	_Email_Location: { 
		left: "4.83091787%",
		right: "4.83091787%",
		top: "41.51785714%",
		bottom: "51.11607143%"
	},
	_Password_Location: {
		left: "4.83091787%",
		right: "4.83091787%",
		top: "51.11607143%",
		bottom: "41.51785714%"
	},
	_Title_Description: { 
		width: "auto",
		height: "auto",
		position: "absolute",
		left: "4.83091787%",
		right: "4.83091787%",
		top: "22.43303571%",
		bottom: "70.20089286%",
		color: "rgba(60, 60, 67, 0.6)",
		fontSize: 17,
		fontWeight: "400",
		// fontFamily: "Abel",
		letterSpacing: -0.408,
		textAlign: "center",
	},
	_Icon_Frame: {
		position: "absolute",
		alignSelf:"center",
		top: "7.70089286%",
		bottom: "79.79910714%",
		height: "12.5%",
		aspectRatio:1
	},
})
