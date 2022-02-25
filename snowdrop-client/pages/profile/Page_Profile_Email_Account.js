import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, ScrollView, TextInput, StyleSheet, Animated, Dimensions, Vibration, Alert, KeyboardAvoidingView, Platform, Button} from "react-native";
import { TouchableOpacity, PixelRatio } from "react-native";
import AppLoading from 'expo-app-loading';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import {Lato_400Regular, Lato_700Bold} from '@expo-google-fonts/lato';
import * as Google from 'expo-google-app-auth';

const {
	width,
	height,
} = Dimensions.get("window");

const base_width = 414;
const base_height = 896;

function pxRD (px, cur_screen, base) {
	return Math.round(PixelRatio.roundToNearestPixel(cur_screen / base * px));
}


const Page_Profile_Email_Account  = ({navigation}) => {
    useEffect(() => {
    }, []);
    const [email, onChangeEmail] = React.useState(global.email);
    
    async function signOut() {
		try {
            onChangeEmail("LogOut Successful");
			global.isEmail = undefined;
			global.email = undefined;
			global.username = undefined;

            navigation.navigate("Page_Sign_In")
		} catch (e) {
			onChangeEmail("Error")
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

			<Text style = {{top:pxRD(200,height,base_height),alignSelf:"center",textAlign:"left",width:pxRD(base_width*0.8,width,base_width)}} numberOfLines={1}>{"Email: "+email}</Text>
			<Text style = {{top:pxRD(220,height,base_height),alignSelf:"center",textAlign:"left",width:pxRD(base_width*0.8,width,base_width)}} numberOfLines={1}>{"Username: "+global.userName}</Text>
            <TouchableOpacity style = {[noneModeStyles._Main_Navigation_Button, noneModeStyles._Sign_Out]}  onPress={()=>signOut()}  >
				<Text style = {noneModeStyles._Main_Button_Description}>
					Sign Out
				</Text>
			</TouchableOpacity>
            <TouchableOpacity style = {[noneModeStyles._Main_Navigation_Button, noneModeStyles._Delete_Account_Button]}    >
				<Text style = {noneModeStyles._Main_Button_Description}>
                    Delete Account
				</Text>
			</TouchableOpacity>
			<TouchableOpacity style = {[noneModeStyles._Main_Navigation_Button, noneModeStyles._Edit_Account_Button]}    >
				<Text style = {noneModeStyles._Main_Button_Description}   >
                    Edit Account
				</Text>
			</TouchableOpacity>
			<TouchableOpacity style = {[noneModeStyles._Main_Navigation_Button, noneModeStyles._Change_Password_Button]}  onPress={()=>navigation.navigate("Page_Change_Password")}  >
				<Text style = {noneModeStyles._Main_Button_Description}   >
                    Change Password
				</Text>
			</TouchableOpacity>
		</View>
	</ScrollView>
	</KeyboardAvoidingView>
)}
export default Page_Profile_Email_Account

const noneModeStyles = StyleSheet.create({	
	_Page: { 
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		backgroundColor:"#EDEECB",
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
    _Sign_Out: {
        top: pxRD(60,height,base_height),
		backgroundColor: "#FFA50099",
    },
	_Change_Password_Button: { 
		top: pxRD(396,height,base_height),
		backgroundColor: "#A4C400",
	},
	_Edit_Account_Button: { 
		top: pxRD(463,height,base_height),
		backgroundColor: "#A4C400",
	},
	_Delete_Account_Button: {
		top: pxRD(530,height,base_height),
		backgroundColor: "#FF000099",
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

