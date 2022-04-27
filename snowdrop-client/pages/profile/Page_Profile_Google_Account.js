import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, ScrollView, TextInput, StyleSheet, Animated, Dimensions, Vibration, Alert, KeyboardAvoidingView, Platform, Button } from "react-native";
import { TouchableOpacity, PixelRatio } from "react-native";
import AppLoading from 'expo-app-loading';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import * as Google from 'expo-google-app-auth';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {
	width,
	height,
} = Dimensions.get("window");

const base_width = 414;
const base_height = 896;

function pxRD(px, cur_screen, base) {
	return Math.round(PixelRatio.roundToNearestPixel(cur_screen / base * px));
}


const Page_Profile_Google_Account = ({ navigation }) => {
	global.fertilizeTimes = new Map();

    const isFocused = useIsFocused();
	useEffect(() => {
            getUser();
    }, [isFocused]);
	const [token, onChangeToken] = React.useState(global.googleID);
	const [level, setLevel] = React.useState("");

	async function signOutWithGoogleAsync() {
		global.isEmail = undefined;
		global.googleID = undefined;
		global.userName = undefined;
		AsyncStorage.removeItem("isEmail");
		AsyncStorage.removeItem("googleID");
		AsyncStorage.removeItem("userName");
		if (global.expoPushToken != "null") {
			AsyncStorage.removeItem("expoPushToken");
			fetch('https://quiet-reef-93741.herokuapp.com/devices/remove', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
				body: JSON.stringify({
					username: global.userName,
					expoPushToken: global.expoPushToken,
					location: null,
				}),
			}).then((response)=>{
				response.json().then((result)=>{
					console.log(result);
				})
				global.expoPushToken = undefined;
			})
		} else {
			global.expoPushToken = undefined;
		}
		navigation.navigate("Page_Sign_In");
	}

	async function getUser(id) {
        try {
			let response = await fetch('https://quiet-reef-93741.herokuapp.com/users/' + global.userName + '/get-info', {
                method: 'GET'
            })
			.then((response) => {
				if (response.status == 400) {
					response.json().then((result) => {
                        console.log('fail');
						console.log(result.message);
					});
				}
				if (response.status == 200 || response.status == 201 || response.status == 202) {
					response.json().then((result) => {
                        console.log(result);
                        if (level != result.expertiseLevel) {
                            setLevel(result.expertiseLevel);
                        }
					});
				}
			});
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
		return <AppLoading />
	}
	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ height: Dimensions.get("window").height }}>
			<ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{ height: Dimensions.get("window").height }}>
				<View style={noneModeStyles._Page}    >
					<Image style={noneModeStyles._Cactus_Image} source={require("../../assets/background/cactus.png")} />
					<Image style={noneModeStyles._Monstera_Image} source={require("../../assets/background/monstera.png")} />
					<Image style={noneModeStyles._Philodendron_Image} source={require("../../assets/background/philodendron.png")} />
					<Image style={noneModeStyles._Left_Leaf_Image} source={require("../../assets/background/leftleaf.png")} />
					<Image style={noneModeStyles._Right_Leaf_Image} source={require("../../assets/background/rightleaf.png")} />

					{/* Header Bar */}
					<Appbar.Header style={noneModeStyles.appbar}>
						<Appbar.Content title={<Text style={noneModeStyles.headerTitle}>SNOWDROP</Text>} style={noneModeStyles.headerTitle} />
					</Appbar.Header>

					<Text style={{ top: pxRD(150, height, base_height), alignSelf: "center", fontFamily: 'Lato_400Regular', fontSize: 18, textAlign: "center", width: pxRD(base_width * 0.8, width, base_width) }} numberOfLines={1}>{"Google ID: " + token}</Text>
					<Text style={{ top: pxRD(160, height, base_height), alignSelf: "center", fontFamily: 'Lato_400Regular', fontSize: 18, textAlign: "center", width: pxRD(base_width * 0.8, width, base_width) }} numberOfLines={1}>{"Username: " + global.userName}</Text>
					<Text style={{ top: pxRD(170, height, base_height), fontFamily: 'Lato_400Regular', alignSelf: "center", textAlign: "center", fontSize: 18, width: pxRD(base_width * 0.8, width, base_width) }} numberOfLines={1}>{level}</Text>

					
					<TouchableOpacity style={[noneModeStyles._Main_Navigation_Button, noneModeStyles._Sign_Out]} onPress={() => signOutWithGoogleAsync()}  >
						<Text style={[noneModeStyles._Main_Button_Description, { fontSize: 12 }]}>
                            Sign Out
						</Text>
					</TouchableOpacity>

					<TouchableOpacity style={[noneModeStyles._Main_Navigation_Button, noneModeStyles._Delete_Account_Button]}    >
						<Text style={noneModeStyles._Main_Button_Description}>
							Delete Account
						</Text>
					</TouchableOpacity>

					<TouchableOpacity style={[noneModeStyles._Main_Navigation_Button, noneModeStyles._Edit_Account_Button]}    >
						<Text style={noneModeStyles._Main_Button_Description}   >
							Edit Account
						</Text>
					</TouchableOpacity>

					{/* Bottom Nav Bar */}
                    <Appbar style={noneModeStyles.bottom}>
                        <Appbar.Action icon="home" color="#005500" size={Math.min(width * 0.09, height * 0.05)} onPress={() => Alert.alert("Home", "Home page not yet implemented", [{ text: 'OK' }],)} />
                        <Appbar.Action icon="leaf" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
                        <Appbar.Action icon="account-supervisor" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_PostList")} />
                        <Appbar.Action icon="brightness-5" color="#EDEECB" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => {if (global.googleID == undefined) { navigation.navigate("Page_Profile_Email_Account"); } else { navigation.navigate("Page_Profile_Google_Account"); }}} />
                    </Appbar>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}
export default Page_Profile_Google_Account

const noneModeStyles = StyleSheet.create({
	_Page: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		backgroundColor: "#EDEECB",
	},

	_Main_Navigation_Button: {
		position: "absolute",
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		height: pxRD(37, height, base_height),
		width: pxRD(344, width, base_width),
		borderRadius: 30,
	},
	_Main_Button_Description: {
		fontSize: pxRD(17, height, base_height),
		fontWeight: "600",
		textAlign: "center",
		color: "white",
	},
	_Sign_Out: {
		top: pxRD(65, height, base_height),
        width: pxRD(80, width, base_width),
        backgroundColor: "#F2BC58",
        alignSelf: "flex-end",
	},
	_Edit_Account_Button: {
		top: pxRD(463, height, base_height),
		backgroundColor: "#A4C400",
	},
	_Delete_Account_Button: {
		top: pxRD(530, height, base_height),
		backgroundColor: "#FF000099",
	},





	_Cactus_Image: {
		position: "absolute",
		resizeMode: "contain",
		height: pxRD(210, height, base_height),
		width: pxRD(180, width, base_width),
		top: pxRD(709, height, base_height),
		left: pxRD(-47, width, base_width),
	},
	_Monstera_Image: {
		position: "absolute",
		resizeMode: "contain",
		height: pxRD(199, height, base_height),
		width: pxRD(198, width, base_width),
		top: pxRD(710, height, base_height),
		left: pxRD(271, width, base_width),
	},
	_Philodendron_Image: {
		position: "absolute",
		resizeMode: "contain",
		width: pxRD(98, width, base_width),
		height: pxRD(103, height, base_height),
		top: pxRD(801, height, base_height),
		left: pxRD(263, width, base_width),
	},
	_Left_Leaf_Image: {
		position: "absolute",
		resizeMode: "contain",
		width: pxRD(150, width, base_width),
		height: pxRD(150, height, base_height),
		top: pxRD(168, height, base_height),
		left: pxRD(-62, width, base_width),
	},
	_Right_Leaf_Image: {
		position: "absolute",
		resizeMode: "contain",
		width: pxRD(150, width, base_width),
		height: pxRD(150, height, base_height),
		top: pxRD(182, height, base_height),
		left: pxRD(320, width, base_width),
	},

	// Appbar styles
    appbar: {
        width: width,
        backgroundColor: '#82B47D',
        flexDirection: "row",
        height: height * 0.078125, // 70/defaultH
    },
    headerTitle: {
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: 28,
        fontFamily: "Alata_400Regular",
        color: '#005500',
    },
    bottom: {
        justifyContent: 'center',
        backgroundColor: '#82B47D',
        height: height * 0.078125,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    }
})

