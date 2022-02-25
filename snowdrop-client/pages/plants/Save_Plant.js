import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, ScrollView, Dimensions, KeyboardAvoidingView, Button } from "react-native";
import { TouchableOpacity, PixelRatio } from "react-native";
import AppLoading from 'expo-app-loading';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { Appbar, TextInput } from 'react-native-paper';
import { Icon } from 'react-native-elements';

import styles from './Save_Plant_Style.js';

const {
    width,
    height,
} = Dimensions.get("window");

function pxRD(px, cur_screen, base) {
    return Math.round(PixelRatio.roundToNearestPixel(cur_screen / base * px));
}

const Save_Plant = ({ navigation }) => {
    useEffect(() => {
    }, []);

    const [name, onChangeName] = React.useState("");
    const [health, setHealth] = React.useState("");

    let [fontsLoaded] = useFonts({
        Alata_400Regular,
        Lato_400Regular,
        Lato_700Bold,
    });

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{ height: Dimensions.get("window").height }}>
            <View style={styles.page}    >
                <Image style={styles.cactusImage} source={require("../../assets/background/cactus.png")} />
                <Image style={styles.monsteraImage} source={require("../../assets/background/monstera.png")} />
                <Image style={styles.philodendronImage} source={require("../../assets/background/philodendron.png")} />
                <Image style={styles.leftLeafImage} source={require("../../assets/background/leftleaf.png")} />
                <Image style={styles.rightLeafImage} source={require("../../assets/background/rightleaf.png")} />

                {/* Header Bar */}
                <Appbar.Header style={styles.appbar}>
                    <Appbar.BackAction color="white" />
                </Appbar.Header>

                <Text style={styles.nameText}>{"Name your plant! (Optional)"}</Text>
                <TextInput
                    autoCapitalized='true'
                    autoCorrect={false}
                    autoFocus={true}
                    value={name}
                    placeholder="Enter Nickname"
                    onChangeText={onChangeName}
                    selectionColor={'grey'}
                    underlineColorAndroid='transparent'
                    style={styles.nameTextField}
                />
                <View style={styles.nameTextLine}></View>

                <Text style={styles.weatherText}>{"We will be using your location information to fetch weather data."}</Text>
                <Text style={styles.plantHealthText}>{"Enter plant health"}</Text>
                <Text style={styles.plantHealthInfoText}>{"(Just look at your plant and make an approximate estimation!)"}</Text>

                <View style={styles.plantHealth}>
                    <Icon
                        name='sentiment-satisfied-alt'
                        type='material-icons'
                        color='#82B47D'
                        size={width * 0.16}
                        style={styles.icon}
                        onPress={() => setHealth("good")} />
                    <Icon
                        // raised
                        name='sentiment-neutral'
                        type='material-icons'
                        color='#F2BC58'
                        size={width * 0.16}
                        style={styles.icon}
                        onPress={() => setHealth("medium")} />
                    <Icon
                        name='sentiment-very-dissatisfied'
                        type='material-icons'
                        color='#D26060'
                        size={width * 0.16}
                        style={styles.icon}
                        onPress={() => setHealth("bad")} />
                </View>

                <TouchableOpacity style={styles.submitButton}  >
                    <Text style={styles.submitButtonText}>
                        Submit
				    </Text>
                </TouchableOpacity>

                {/* Bottom Nav Bar */}
                <Appbar style={styles.bottom}>
                    <Appbar.Action icon="home" color="#005500" size={width * 0.09} onPress={() => Alert.alert("Home", "Home page not yet implemented", [{ text: 'OK' }],)} />
                    <Appbar.Action icon="leaf" color="#EDEECB" size={width * 0.09} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Plant_Search")} />
                    <Appbar.Action icon="account-supervisor" color="#005500" size={width * 0.09} style={{ marginLeft: '9%' }} onPress={() => Alert.alert("Community", "Community page not yet implemented", [{ text: 'OK' }],)} />
                    <Appbar.Action icon="brightness-5" color="#005500" size={width * 0.09} style={{ marginLeft: '9%' }} onPress={() => {if (global.googleID == undefined) { navigation.navigate("Page_Profile_Email_Account"); } else { navigation.navigate("Page_Profile_Google_Account"); }} } />
                </Appbar>
            </View>
        </ScrollView>
    )
}

export default Save_Plant