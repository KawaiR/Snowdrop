import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, ScrollView, TextInput, StyleSheet, Animated, Dimensions, Vibration, Alert, KeyboardAvoidingView, Platform} from "react-native";
import { TouchableOpacity, PixelRatio } from "react-native";
import AppLoading from 'expo-app-loading';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import {Lato_400Regular, Lato_700Bold} from '@expo-google-fonts/lato';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

async function registerForPushNotificationsAsync() {
	let token;
	if (Constants.isDevice) {
		const { status: existingStatus } =
		await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
		const { status } = await Notifications.requestPermissionsAsync();
		finalStatus = status;
		}
		if (finalStatus !== 'granted') {
		alert('Failed to get push token for push notification!');
		return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
		name: 'default',
		importance: Notifications.AndroidImportance.MAX,
		vibrationPattern: [0, 250, 250, 250],
		lightColor: '#FF231F7C',
		});
	}

	return token;
}

async function setLocation() {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== 'granted') return;
	let location = await Location.getCurrentPositionAsync({});
	registerForPushNotificationsAsync().then((expoPushToken) => {
		if (expoPushToken == null) {
			global.expoPushToken = "null";
			AsyncStorage.setItem("expoPushToken","null");
			return;
		}
		global.expoPushToken = expoPushToken;
		AsyncStorage.setItem("expoPushToken",expoPushToken);
		try {
			fetch('https://quiet-reef-93741.herokuapp.com/devices', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
				body: JSON.stringify({
					username: global.userName,
					expoPushToken: expoPushToken,
					location: location.coords.latitude.toString()+","+location.coords.longitude.toString(),
				}),
			})
			.then((response) => {
				response.json().then((result) => {
				console.log("Device POST Response: ", result);
				})
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
	})
}

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

const Page_Create_Account  = ({navigation}) => {
	useEffect(() => {
	}, []);
	const [title, onChangeTitle] = React.useState("Welcome aboard,\nCreate an account to start your journey");
	const [email, onChangeEmail] = React.useState("");
	const [password, onChangePassword] = React.useState("");
	const [username, onChangeUsername] = React.useState("");
	
	async function signInWithGoogleAsync() {
		try {
			const result = await Google.logInAsync({
			androidClientId: "1057168519364-q6ubd34uinifouhjccbfa17nsgngvhgn.apps.googleusercontent.com",
			iosClientId: "1057168519364-13l42e2uflp9m7898h7vvug7hogr9cjt.apps.googleusercontent.com",
			scopes: ['profile', 'email'],
			});
	
			if (result.type === 'success') {
				global.isEmail = false;
				global.googleID = result.user.id;
				AsyncStorage.setItem("isEmail","false");
				AsyncStorage.setItem("googleID",global.googleID);
				try {
					let response = await fetch(`https://quiet-reef-93741.herokuapp.com/users/get-google-user`, {
						method: "POST",
						headers: {
						"Content-Type": "application/json; charset=utf-8",
						},
						body: JSON.stringify({
							googleID: global.googleID,
							userName: null,
						}),
					})
					.then((response) => {
						if (response.status == 404 || response.status == 400) {
							navigation.navigate("Page_Create_Google_Username");
						}
						else {
							response.json().then((result) => {
								global.userName = result.userName;
								AsyncStorage.setItem("userName",global.userName);
								// navigation.navigate("Location_Permission");
								setLocation();
								navigation.navigate("Home");
							})
						}
					})	
				} catch (err) {
					console.log("Fetch didnt work.");
					console.log(err);
				}
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			return { error: true };
		}
	}

	async function createAccountAsync() {
		if (!email || !username || !password) {
			onChangeTitle("All Fields Are Required!");
			return;
		}
		try {
			let response = await fetch(`https://quiet-reef-93741.herokuapp.com/users`, {
				method: "POST",
				headers: {
				"Content-Type": "application/json; charset=utf-8",
				},
				body: JSON.stringify({
				email: email,
				password: password,
				userName: username,
				}),
			})
			.then((response) => {
				if (response.status == 400) {
					response.json().then((result) => {
						onChangeTitle(result.message);
					});
				}
				else if (response.status == 200 || response.status == 201 || response.status == 202) {
					response.json().then((result) => {
						global.isEmail = true;
						global.email = email;
						// global.authTokenHash = result.authTokenHash;
						global.userName = result.userName;
						AsyncStorage.setItem("isEmail","true");
						AsyncStorage.setItem("email",global.email);
						// AsyncStorage.setItem("authTokenHash",global.authTokenHash);
						AsyncStorage.setItem("userName",global.userName);
						// navigation.navigate("Location_Permission");
						setLocation();
						navigation.navigate("Home");
					});
				}
			})
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
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
				Remember the password?
				</Text>
				<Text style = {noneModeStyles._Optional_Button_Description} onPress={() => navigation.navigate('Page_Sign_In')}>
					Sign In
				</Text>
			</View>
			<View style = {noneModeStyles._White_Box}/>
			<TouchableOpacity style = {[noneModeStyles._Main_Navigation_Button, noneModeStyles._Google_Button]} onPress={()=>signInWithGoogleAsync()} >
				<Text style = {noneModeStyles._Main_Button_Description}   >
					Continue with Google
				</Text>
			</TouchableOpacity>
			<TouchableOpacity style = {[noneModeStyles._Main_Navigation_Button, noneModeStyles._Email_Button]} onPress={()=>createAccountAsync()}   >
				<Text style = {noneModeStyles._Main_Button_Description}   >
					Sign Up
				</Text>
			</TouchableOpacity>
			<View style = {[noneModeStyles._Text_Field_Line,noneModeStyles._Password_Line]}></View>
			<TextInput
				autoCapitalized='none'
				autoCorrect={false}
				onChangeText={onChangePassword}
				value={password}
				placeholder="Password"
				secureTextEntry={true}
				textContentType="password"
				style = {[noneModeStyles._Text_Field,noneModeStyles._Password_Location]}
			/>
			<View style = {[noneModeStyles._Text_Field_Line,noneModeStyles._Email_Line]}></View>
			<TextInput
				autoCapitalized='none'
				autoCorrect={false}
				autoFocus={true}
				onChangeText={onChangeEmail}
				value={email}
				placeholder="Email"
				style = {[noneModeStyles._Text_Field,noneModeStyles._Email_Location]}
			/>
			<View style = {[noneModeStyles._Text_Field_Line,noneModeStyles._Username_Line]}></View>
			<TextInput
				autoFocus={true}
				onChangeText={onChangeUsername}
				value={username}
				placeholder="Username"
				style = {[noneModeStyles._Text_Field,noneModeStyles._Username_Location]}
			/>
			<Text style = {noneModeStyles._Title_Description}   >
				{title}
			</Text>
			<View style = {noneModeStyles._Icon_Frame}>
				<Image style = {noneModeStyles._Icon_Image} source = {require("../../assets/auth/icon_circle.png")}/>
				<Text  style = {noneModeStyles._App_Name}>SNOWDROP</Text>
			</View>
		</View>
	</ScrollView>
	</KeyboardAvoidingView>
)}
export default Page_Create_Account

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
	_Username_Line: {
		top: pxRD(364,height,base_height),
	},
	_Email_Line: {
		top: pxRD(431,height,base_height),
	},
	_Password_Line: {
		top: pxRD(498,height,base_height),
	},
	_Username_Location: { 
		top: pxRD(319,height,base_height),
	},
	_Email_Location: { 
		top: pxRD(386,height,base_height),
	},
	_Password_Location: { 
		top: pxRD(453,height,base_height),
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
	_Email_Button: { 
		top: pxRD(530,height,base_height),
		backgroundColor: "#A4C400",
	},
	_Google_Button: {
		top: pxRD(597,height,base_height),
		backgroundColor: "#FF000099",
	},
	_White_Box: {
		alignSelf: "center",
		top: pxRD(319,height,base_height),
		width: pxRD(364,width,base_width),
		height: pxRD(325,height,base_height),
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
		top: pxRD(654,height,base_height),
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

