import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, ScrollView, TextInput, StyleSheet, Animated, Dimensions, Vibration, Alert, KeyboardAvoidingView, Platform} from "react-native";
import { TouchableOpacity, PixelRatio } from "react-native";
import AppLoading from 'expo-app-loading';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import {Lato_400Regular, Lato_700Bold} from '@expo-google-fonts/lato';

const {
	width,
	height,
} = Dimensions.get("window");

const base_width = 414;
const base_height = 896;

const color_title = "#005500";
const color_description = "#898C7B";
const color_main_button = "white";
const color_opt_button = "#007AFF";


function pxRD (px, cur_screen, base) {
	return Math.round(PixelRatio.roundToNearestPixel(cur_screen / base * px));
}

const Page_Password_Reset  = ({navigation}) => {
	
	const [email, onChangeEmail] = React.useState(global.email);
	const [resetToken, onChangeResetToken] = React.useState(global.resetToken);
	const [oldPassword, onChangeOldPassword] = React.useState(global.oldPassword);
	global.email = undefined;
	global.resetToken = undefined;
	global.oldPassword = undefined;
	const [title, onChangeTitle] = React.useState("Create an new password,\nRecover your account to continue.");
	const [newPassword, onChangeNewPassword] = React.useState("");
	const [confirm, onChangeConfirm] = React.useState("");
	const [optionalPageDescription, onChangeOptionalPageDescription] = React.useState("Remember the password?");
	const [optionalButtonDescription, onChangeOptionalButtonDescription] = React.useState("Sign In");
	useEffect(() => {
		if (resetToken == undefined) {
			onChangeOptionalPageDescription("Changed your mind?");
			onChangeOptionalButtonDescription("Profile");
		}
	}, []);

	function OptionalNavigation() {
		if (resetToken == undefined) navigation.navigate("Page_Profile_Email_Account")
		else navigation.navigate("Page_Sign_In");
	}
	async function UpdatePassword() {
		if (!newPassword || !confirm) {
			onChangeTitle("Password Cannot Be Empty!");
			return;
		}
		if (newPassword != confirm) {
			onChangeTitle("Password Does Not Match!");
			return;
		}
		if (resetToken != undefined) {
			try {
				let response = await fetch(`http://192.168.1.15:8080/users/update-forgot-password`, {
					method: "POST",
					headers: {
					"Content-Type": "application/json; charset=utf-8",
					},
					body: JSON.stringify({
						email: email,
						newPassword: newPassword,
						resetToken: resetToken,
					}),
				})
				.then((response) => {
					if (response.status == 400) {
						response.json().then((result) => {
							onChangeTitle(result.message);
						});
					}
					else if (response.status == 200 || response.status == 201) {
						navigation.navigate('Page_Sign_In');
					}
				})
			} catch (err) {
				console.log("Fetch didnt work.");
				console.log(err);
			}
		}
		else {
			try {
				let response = await fetch(`http://192.168.1.15:8080/users/update-password`, {
					method: "POST",
					headers: {
					"Content-Type": "application/json; charset=utf-8",
					},
					body: JSON.stringify({
						email: email,
						newPassword: newPassword,
						oldPassword: oldPassword,
					}),
				})
				.then((response) => {
					if (response.status == 400) {
						response.json().then((result) => {
							onChangeTitle(result.message);
						});
					}
					else if (response.status == 200 || response.status == 201) {
						navigation.navigate('Page_Profile_Email_Account');
					}
				})
			} catch (err) {
				console.log("Fetch didnt work.");
				console.log(err);
			}
		}
	}

	let [fontsLoaded] = useFonts({
		Alata_400Regular,
		Lato_400Regular,
		Lato_700Bold,
	});
	if (!fontsLoaded) {
		return <AppLoading/>
	}
	return (
	<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{height: Dimensions.get("window").height}}>
	<ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{height: Dimensions.get("window").height}}>
		<View style = {noneModeStyles._Page}    >
			
			<Image style = {noneModeStyles._Cactus_Image} source = {require("../../assets/background/cactus.png")}/>
			<Image style = {noneModeStyles._Monstera_Image} source = {require("../../assets/background/monstera.png")}/>
			<Image style = {noneModeStyles._Philodendron_Image} source = {require("../../assets/background/philodendron.png")}/>
			<Image style = {noneModeStyles._Left_Leaf_Image} source = {require("../../assets/background/leftleaf.png")}/>
			<Image style = {noneModeStyles._Right_Leaf_Image} source = {require("../../assets/background/rightleaf.png")}/>
			<View style = {noneModeStyles._Optional_Navigation_Button}>
				<Text style = {noneModeStyles._Optional_Page_Description}>
					{optionalPageDescription}
				</Text>
				<Text style = {noneModeStyles._Optional_Button_Description} onPress={() => OptionalNavigation()}>
					{optionalButtonDescription}
				</Text>
			</View>
			<View style = {noneModeStyles._White_Box}/>
			<TouchableOpacity style = {[noneModeStyles._Main_Navigation_Button, noneModeStyles._Submit_Button]} onPress={()=>UpdatePassword()}>
				<Text style = {noneModeStyles._Main_Button_Description} >
					Submit
				</Text>
			</TouchableOpacity>
			<View style = {[noneModeStyles._Text_Field_Line,noneModeStyles._Verification_Code_Line]}></View>
			<TextInput 
				autoCapitalized='none'
				autoCorrect={false}
				onChangeText={onChangeConfirm}
				value={confirm}
				placeholder="Re-enter Password"
				secureTextEntry={true}
				textContentType="password"
				style = {[noneModeStyles._Text_Field,noneModeStyles._Verification_Code_Location]}
			/>
			<View style = {[noneModeStyles._Text_Field_Line,noneModeStyles._Email_Line]}></View>
			<TextInput 
				autoCapitalized='none'
				autoCorrect={false}
				autoFocus={true}
				onChangeText={onChangeNewPassword}
				value={newPassword}
				placeholder="New Password"
				secureTextEntry={true}
				textContentType="password"
				style = {[noneModeStyles._Text_Field,noneModeStyles._Email_Location]}
			/>
			<Text style = {noneModeStyles._Title_Description}   >
				{title}
			</Text>
			<View style = {noneModeStyles._Icon_Frame}>
				<Image style = {noneModeStyles._Icon_Image} source = {require("../../assets/auth/icon_circle_light.png")}/>
				<Text  style = {noneModeStyles._App_Name}>SNOWDROP</Text>
			</View>
		</View>
	</ScrollView>
	</KeyboardAvoidingView>
)}
export default Page_Password_Reset

const noneModeStyles = StyleSheet.create({	
	_Page: { 
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		backgroundColor:"#EDEECB",
	},
	_Icon_Frame: {
		position: "absolute",
		alignSelf:"center",
		top: pxRD(50,height,base_height),
		height: pxRD(192,height,base_height),
		width: pxRD(241,width,base_width),
	},
	_Icon_Image: {
		alignSelf: "center",
		aspectRatio: 1,
		height: pxRD(140,height,base_height),
		marginTop: pxRD(10,height,base_height),
	},
	_App_Name: {
		alignSelf: "center",
		alignContent: "center",
		textAlign: "center",
		fontSize: pxRD(36,height,base_height),
		fontFamily: "Alata_400Regular",
		color: color_title,
	},
	_Title_Description: { 
		position: "absolute",
		alignSelf: "center",
		top: pxRD(252,height,base_height),
		width: pxRD(364,width,base_width),
		height: pxRD(57,height,base_height),
		fontSize: pxRD(14,height,base_height),
		fontFamily: "Lato_400Regular",
		textAlign: "center",
		color: color_description,
	},
	_Text_Field: { 
		position: "absolute",
		alignSelf: "center",
		width: pxRD(344,width,base_width),
		height: pxRD(57,height,base_height),
	},
	_Text_Field_Line: {
		position: "absolute",
		alignSelf: "center",
		width: pxRD(344,width,base_width),
		height: pxRD(2,height,base_height),
		backgroundColor: color_description,
	},
	_Email_Line: {
		top: pxRD(364,height,base_height),
	},
	_Verification_Code_Line: {
		top: pxRD(431,height,base_height),
	},
	_Email_Location: { 
		top: pxRD(319,height,base_height),
	},
	_Verification_Code_Location: { 
		top: pxRD(386,height,base_height),
	},
	_Send_Code_Button: { 
		position: "absolute",
		alignSelf: "center",
		width: pxRD(344,width,base_width),
		top: pxRD(338,height,base_height),
	},
	_Send_Code_Button_Text: { 
		position: "absolute",
		alignSelf: "flex-end",
		fontSize: pxRD(15,height,base_height),
		fontFamily: "Lato_700Bold",
		textAlign: "right",
		color: color_opt_button,
	},
	_Main_Navigation_Button: { 
		position: "absolute",
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		height: pxRD(37,height,base_height),
		width: pxRD(344,width,base_width),
		borderRadius: 30,
	},
	_Main_Button_Description: { 
		fontSize: pxRD(17,height,base_height),
		fontWeight: "600",
		textAlign: "center",
		color: "white",
	},
	_Submit_Button: { 
		top: pxRD(463,height,base_height),
		backgroundColor: "#A4C400",
	},
	_White_Box: {
		alignSelf: "center",
		top: pxRD(319,height,base_height),
		width: pxRD(364,width,base_width),
		height: pxRD(191,height,base_height),
		backgroundColor: "white",
	},
	_Optional_Navigation_Button: {
		display: "flex",
		flexDirection: "row",
		position: "absolute",
		alignSelf: "center",
		justifyContent: "center",
		width: pxRD(364,width,base_width),
		height: pxRD(58,height,base_height),
		top: pxRD(520,height,base_height),
	},
	_Optional_Page_Description: {
		marginRight: pxRD(5,width,base_width),
		fontSize: pxRD(15,height,base_height),
		fontWeight: "400",
		color: color_description,
	},
	_Optional_Button_Description: {
		fontWeight: "600",
		fontSize: pxRD(15,height,base_height),
		letterSpacing: pxRD(-0.24,width,base_width),
		color: color_opt_button,
	},
	_Cactus_Image: {
		position: "absolute",
		resizeMode: "contain",
		height: pxRD(210,height,base_height),
		width: pxRD(180,width,base_width),
		top: pxRD(709,height,base_height),
		left: pxRD(-47,width,base_width),
	},
	_Monstera_Image: {
		position: "absolute",
		resizeMode: "contain",
		height: pxRD(199,height,base_height),
		width: pxRD(198,width,base_width),
		top: pxRD(710,height,base_height),
		left: pxRD(271,width,base_width),
	},
	_Philodendron_Image: {
		position: "absolute",
		resizeMode: "contain",
		width: pxRD(98,width,base_width),
		height: pxRD(103,height,base_height),
		top: pxRD(801,height,base_height),
		left: pxRD(263,width,base_width),
	},
	_Left_Leaf_Image: {
		position: "absolute",
		resizeMode: "contain",
		width: pxRD(150,width,base_width),
		height: pxRD(150,height,base_height),
		top: pxRD(168,height,base_height),
		left: pxRD(-62,width,base_width),
	},
	_Right_Leaf_Image: {
		position: "absolute",
		resizeMode: "contain",
		width: pxRD(150,width,base_width),
		height: pxRD(150,height,base_height),
		top: pxRD(182,height,base_height),
		left: pxRD(320,width,base_width),
	}
})