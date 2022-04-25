import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Dimensions, View, Text, ScrollView, Image, Alert,KeyboardAvoidingView,PixelRatio, } from "react-native";
import { Appbar, Avatar, Button, Card, FAB, IconButton, TextInput,Dialog,ToggleButton } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";
import { color } from "react-native-elements/dist/helpers";

const Plant_Edit  = ({route, navigation}) => {
    const { plant } = route.params;
    const isFocused = useIsFocused()
    const [sunlightLevel, setSunlightLevel] = useState(plant.sunlightLevel);
    const [minTemperature, setMinTemperature] = useState(plant.minTemperature);
    const [soilType, setSoilType] = useState(plant.soilType);
    const [soilTypeTemp, setSoilTypeTemp] = useState(plant.soilType);
    const [soilDialogVisible,setSoilDialogVisible] = useState(false);
    const [waterNeeds, setWaterType] = useState(plant.waterNeeds);
    const [waterNeedsTemp, setWaterNeedsTemp] = useState(plant.waterNeeds);
    const [waterDialogVisible,setWaterDialogVisible] = useState(false);
    function increaseSunLightLevel() {if (sunlightLevel < 10) setSunlightLevel(sunlightLevel+1)}
    function decreaseSunLightLevel() {if (sunlightLevel > 1) setSunlightLevel(sunlightLevel-1)}
    function increaseMinTemperature() {setMinTemperature(minTemperature+1)}
    function decreaseMinTemperature() {setMinTemperature(minTemperature-1)}

    async function updatePlant() {
        try {
			let response = await fetch(`https://quiet-reef-93741.herokuapp.com/plants/update`, {
				method: "POST",
				headers: {
				"Content-Type": "application/json; charset=utf-8",
				},
				body: JSON.stringify({
				    id: plant.id,
				    sunlightLevel: sunlightLevel,
                    minTemperature: minTemperature,
                    soilType: soilType,
                    waterNeeds: waterNeeds,
				}),
			})
			.then((response) => {
				if (response.status == 400) {
                    console.log("failed")
				}
				else if (response.status == 200 || response.status == 201 || response.status == 202) {
					navigation.navigate("Page_Plant")
				}
			})
			
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    }

    useEffect(() => {
        if (isFocused) {
            console.log("use effect");
            console.log(plant)
        }
    }, [isFocused]);
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ height: height }}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{ height: height }}>
                <View style = {styles._Page}>
                    {/* <Text style={{bottom:0,alignSelf:"center",position:"absolute"}}>hello</Text> */}
                    <Appbar.Header style={styles.appbar}>
                        <Appbar.BackAction color="white" onPress={() => navigation.navigate("Page_Plant")}/>
                        <Appbar.Content title={<Text style={styles.headerTitle}>Edit Plant</Text>} style={styles.headerTitle} />
                        <Appbar.Action icon="check-bold" color={'#4E4E4E'} onPress={()=>{updatePlant()}}/>
                    </Appbar.Header>
                    <Avatar.Image
                        style={{top:25, alignSelf:"center"}}
                        size={100}
                        source={{uri:plant.plantImage}}
                    />
                    <Text style = {{top: pxRD(50,height,base_height), alignSelf:"center", fontSize: pxRD(14,width,base_width),fontWeight:"bold"}}>{plant.scientificName}</Text>
                    <Text style = {{top: pxRD(60,height,base_height), alignSelf:"center"}}>{plant.plantName}</Text>
                    <View style = {{top: pxRD(90,height,base_height)}}>
                    <Card mode="outlined" style={styles.card}>
                        <Card.Title
                            style={styles.cardTitle}
                            titleStyle={styles.cardText}
                            subtitleStyle={styles.cardText}
                            title="Sunlight Level"
                            subtitle={sunlightLevel+''}
                            left={(props) =>  <IconButton {...props} icon="weather-sunny" size={50} color={'#4E4E4E'}/>}
                            right={(props) => <View><IconButton {...props} icon="arrow-up-thick" size={20} color={'#4E4E4E'} onPress={()=>{increaseSunLightLevel();}}/><IconButton {...props} icon="arrow-down-thick" size={20} color={'#4E4E4E'} onPress={()=>{decreaseSunLightLevel()}}/></View>}
                        />
                    </Card>
                    <Card mode="outlined" style={styles.card}>
                        <Card.Title
                            style={styles.cardTitle}
                            titleStyle={styles.cardText}
                            subtitleStyle={styles.cardText}
                            title="Minimum Temperature"
                            subtitle={minTemperature+''}
                            left={(props) =>  <IconButton {...props} icon="thermometer" size={50} color={'#4E4E4E'}/>}
                            right={(props) => <View><IconButton {...props} icon="arrow-up-thick" size={20} color={'#4E4E4E'} onPress={()=>{increaseMinTemperature();}}/><IconButton {...props} icon="arrow-down-thick" size={20} color={'#4E4E4E'} onPress={()=>{decreaseMinTemperature()}}/></View>}
                        />
                    </Card>
                    <Card mode="outlined" style={styles.card}>
                        <Card.Title
                            style={styles.cardTitle}
                            titleStyle={styles.cardText}
                            subtitleStyle={styles.cardText}
                            title="Soil Type"
                            subtitle={soilType}
                            left={(props) =>  <IconButton {...props} icon="terrain" size={50} color={'#4E4E4E'}/>}
                            right={(props) => <View><IconButton {...props} icon="checkbox-marked-circle-outline" size={30} color={'#4E4E4E'} onPress={()=>{setSoilDialogVisible(true);}}/></View>}
                        />
                    </Card>
                    <Card mode="outlined" style={styles.card}>
                        <Card.Title
                            style={styles.cardTitle}
                            titleStyle={styles.cardText}
                            subtitleStyle={styles.cardText}
                            title="Water Needs"
                            subtitle={waterNeeds}
                            left={(props) =>  <IconButton {...props} icon="terrain" size={50} color={'#4E4E4E'}/>}
                            right={(props) => <View><IconButton {...props} icon="checkbox-marked-circle-outline" size={30} color={'#4E4E4E'} onPress={()=>{setWaterDialogVisible(true);}}/></View>}
                        />
                    </Card>
                    </View>
                    <Dialog visible={soilDialogVisible} onDismiss={()=>setSoilDialogVisible(false)}>
                        <Dialog.Title>Soil Type</Dialog.Title>
                        <Dialog.Content>
                            <Text>Which soil type the plant needs?</Text>
                            <ToggleButton.Row style={styles.toggle} onValueChange={(soilType) => setSoilTypeTemp(soilType)} value={soilTypeTemp}>
                                <ToggleButton icon="alpha-a" value="A" />
                                <ToggleButton icon="alpha-b" value="B" />
                                <ToggleButton icon="alpha-n" value="N" />
                            </ToggleButton.Row>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={()=>{setSoilDialogVisible(false); setSoilType(soilTypeTemp)}}>Confirm</Button>
                            <Button onPress={()=>{setSoilDialogVisible(false); setSoilTypeTemp(soilType)}}>Cancel</Button>
                        </Dialog.Actions>
                    </Dialog>
                    <Dialog visible={waterDialogVisible} onDismiss={()=>setWaterDialogVisible(false)}>
                        <Dialog.Title>Water Needs</Dialog.Title>
                        <Dialog.Content>
                            <Text>How many water does the plant needs?</Text>
                            <ToggleButton.Row style={styles.toggle} onValueChange={(waterNeeds) => setWaterNeedsTemp(waterNeeds)} value={waterNeedsTemp}>
                                <ToggleButton icon="circle-outline" value="VL" />
                                <ToggleButton icon="circle-slice-3" value="L" />
                                <ToggleButton icon="circle-slice-5" value="M" />
                                <ToggleButton icon="circle-slice-8" value="H" />
                            </ToggleButton.Row>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={()=>{setWaterDialogVisible(false); setWaterType(waterNeedsTemp)}}>Confirm</Button>
                            <Button onPress={()=>{setWaterDialogVisible(false); setWaterNeedsTemp(waterNeeds)}}>Cancel</Button>
                        </Dialog.Actions>
                    </Dialog>
                    <Appbar style={styles.bottom}>
                        <Appbar.Action icon="home" color="#005500" size={Math.min(width * 0.09, height * 0.05)} onPress={() => Alert.alert("Home", "Home page not yet implemented", [{ text: 'OK' }],)} />
                        <Appbar.Action icon="leaf" color="#EDEECB" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
                        <Appbar.Action icon="account-supervisor" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_PostList")} />
                        <Appbar.Action icon="brightness-5" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => {if (global.googleID == undefined) { navigation.navigate("Page_Profile_Email_Account"); } else { navigation.navigate("Page_Profile_Google_Account"); }}} />
                    </Appbar>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
)}

export default Plant_Edit;




const {
	width,
	height,
} = Dimensions.get("window");
const base_width = 414;
const base_height = 896;
var green = '#82B47D';

function pxRD (px, cur_screen, base) {
	return Math.round(PixelRatio.roundToNearestPixel(cur_screen / base * px));
}

const styles = StyleSheet.create({	
	_Page: { 
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		backgroundColor:"#EDEECB",
	},
    appbar: {
        width: width,
        backgroundColor: green,
        flexDirection: "row",
        height: height * 0.078125,
    },
    headerTitle: {
        alignSelf: "center",
        alignItems: "flex-start",
        fontSize: 24,
        fontFamily: "Lato_400Regular",
        color: "white",
    },
    bottom: {
        justifyContent: 'center',
        backgroundColor: green,
        height: height * 0.078125,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    cardTitle: {
        justifyContent: 'center',
        flex: 1,
    },
    cardText: {
        marginLeft: width * 0.06,
    },
    card: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: width * 0.91787,
        height: height * 0.1060,
        borderRadius: 25,
        marginBottom: pxRD(11,height,base_height),
    },
})

