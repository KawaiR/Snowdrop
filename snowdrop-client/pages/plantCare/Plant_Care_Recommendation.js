import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Appbar, Card, Paragraph } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { useIsFocused } from "@react-navigation/native";

const {
    width,
    height,
} = Dimensions.get("window");

const defaultW = 414;
const defaultH = 896;

const Plant_Care_Recommendation = ({ route, navigation }) => {
    const { plant, id } = route.params; // plant here is actually a plant care object
    const [fertilizeTimes, onChangeNumber] = React.useState(global.fertilizeTimes.has(plant.id) ? global.fertilizeTimes.get(plant.id) : 0);

    const [commonName, setCommonName] = React.useState(plant.nickname);
    const [scientificName, setScientificName] = React.useState("");
    const [image, setImage] = React.useState("");
    const [upcomingWatered, setUpcomingWatered] = React.useState(plant.waterNext);

    const [waterNeeds, setWaterNeeds] = React.useState("");
    const [soilType, setSoilType] = React.useState("");
    const [sunlightNum, setSunlightNum] = React.useState(0);
    const [sunlightString, setSunlightString] = React.useState("");
    const [minTemperature, setMinTemperature] = React.useState(0.0);
    const [temperatureString, setTemperatureString] = React.useState("");
    const [fertilizer, setFertilizer] = React.useState("");

    const [currTemperature, setCurrTemperature] = React.useState(0.0);
    const [currSunlight, setCurrSunlight] = React.useState(0);

    const isFocused = useIsFocused()
    useEffect(() => {
        if (isFocused) {
            getWeatherApiData();
            getPlantCareInfo(plant.id);
            getPlantName(id);
            if ((upcomingWatered != null) && (upcomingWatered != "")) {
                setUpcomingWatered(upcomingWatered.substring(0, 10));
            } else {
                setUpcomingWatered("");
            }
        }
    }, [isFocused]);

    async function getWeatherApiData() {
        await fetch('http://api.weatherapi.com/v1/current.json?key=0a5a11da31f34220b9d172820222701&q=40.454769,-86.915703&aqi=no', {
            method: 'POST',
        })
        .then((response) => {
            response.json().then((result) => {
            setCurrTemperature(result.current.temp_f);
            setCurrSunlight(result.current.uv)
            })
        });
    }

    let [fontsLoaded] = useFonts({
        Alata_400Regular,
        Lato_400Regular,
        Lato_700Bold,
    });
    if (!fontsLoaded) {
        return <AppLoading />
    }

    async function getPlantCareInfo(plantCareId) {
        try {
            let response = await fetch('http://localhost:8080/plant-care/' + plantCareId + '/get-plant-info', { method: 'GET' })
                .then((response) => {
                    if (response.status == 400) {
                        response.json().then((result) => {
                            console.log('get plant care info fail');
                            console.log(result.message);
                        });
                    }
                    if (response.status == 200 || response.status == 201 || response.status == 202) {
                        response.json().then((result) => {
                            setFertilizer(result.fertilizer);
                        });
                    }
                });
        } catch (err) {
            console.log("Fetch didnt work.");
            console.log(err);
        }
    }

    async function getPlantName(id) {
        try {
            let response = await fetch('http://localhost:8080/plants/' + id + '/get-plant-info', { method: 'GET' })
                .then((response) => {
                    if (response.status == 400) {
                        response.json().then((result) => {
                            console.log('get plant info fail');
                            console.log(result.message);
                        });
                    }
                    if (response.status == 200 || response.status == 201 || response.status == 202) {
                        response.json().then((result) => {
                            setScientificName(result.scientificName);
                            if (result.plantImage != null) {
                                setImage(result.plantImage);
                            } else {
                                setImage(require('snowdrop-client/assets/plant-image.jpeg'));
                            }

                            if (result.waterNeeds === "VL") {
                                setWaterNeeds("very low");
                            } else if (result.waterNeeds === "L") {
                                setWaterNeeds("low");
                            } else if (result.waterNeeds === "M") {
                                setWaterNeeds("moderate");
                            } else if (result.waterNeeds === "H") {
                                setWaterNeeds("high");
                            }

                            if (result.soilType === "A") {
                                setSoilType("acidic");
                            } else if (result.soilType === "N") {
                                setSoilType("neutral");
                            } else if (result.soilType === "B") {
                                setSoilType("basic");
                            }

                            setSunlightNum(result.sunlightLevel)

                            if (currSunlight > sunlightNum) {
                                setSunlightString("is greater than required")
                            } else if (currSunlight < sunlightNum) {
                                setSunlightString("is less than required")
                            } else if (currSunlight == sunlightNum) {
                                setSunlightString("meets requirement")
                            }

                            setMinTemperature(result.minTemperature);

                            if (currTemperature >= minTemperature) {
                                setTemperatureString("meets requirement")
                            } else if (currTemperature < minTemperature) {
                                setTemperatureString("is less than required")
                            }
                        });
                    }
                });
        } catch (err) {
            console.log("Fetch didnt work.");
            console.log(err);
        }
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction color="white" onPress={() => navigation.navigate("Page_PlantDetail", { plant: plant, id: id })} />
                <Appbar.Content title={<Text style={styles.headerTitle}>Recommendations</Text>} style={styles.headerTitle} />
            </Appbar.Header>

            <ScrollView style={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.plantContainer}>
                    <Image style={styles.plantImage} source={require('snowdrop-client/assets/plant-image.jpeg')}></Image>
                    <View style={styles.plantNameView}>
                        <View style={styles.plantNameContent}>
                            <Text style={styles.plantNameText}>{commonName}</Text>
                            <Text style={styles.plantNameText}>{scientificName}</Text>
                            <Text style={styles.plantNameText}>{upcomingWatered}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.recommendationsView}>
                    <Card mode="outlined" style={styles.card}>
                        <Card.Title
                            style={styles.cardTitle}
                            titleStyle={styles.cardTitle}
                            title="Water"
                        />
                        <Card.Content>
                            <Paragraph style={styles.cardText}>Requires {waterNeeds} watering</Paragraph>
                            <Paragraph style={styles.cardText}>Touch top layer of soil, if dry only then water.</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card mode="outlined" style={styles.card}>
                        <Card.Title
                            style={styles.cardTitle}
                            titleStyle={styles.cardTitle}
                            title="Fertilizer"
                        />
                        <Card.Content>
                            <Paragraph style={styles.cardText}>Keep track of how often you fertilize here</Paragraph>
                            <Paragraph style={styles.cardText}>Fertilize every {fertilizeTimes} weeks</Paragraph>
                        </Card.Content>
                        <View style={styles.rowContainer}>
                            <TextInput
                                style={styles.fertilizerInput}
                                onChangeText={onChangeNumber}
                                value={fertilizeTimes.toString()}
                                keyboardType="numeric"
                                borderRadius={25}
                                selectionColor={'grey'}
                                underlineColorAndroid='transparent'
                            />
                            <TouchableOpacity style={styles.setFertilizerButton} onPress={() => { global.fertilizeTimes.set(plant.id, fertilizeTimes); global.fertilizeTimes.forEach((fertilizeTimes, id) => console.log(`${id}: ${fertilizeTimes}`)); }} >
                                <Text style={styles.setFertilizerText}>Set</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                    <Card mode="outlined" style={styles.card}>
                        <Card.Title
                            style={styles.cardTitle}
                            titleStyle={styles.cardTitle}
                            title="Sunlight (UV Level)"
                        />
                        <Card.Content>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", }}>
                                <Paragraph style={styles.cardText}>Required UV = {sunlightNum}</Paragraph>
                                <Paragraph style={styles.cardText}>Current UV = {currSunlight}</Paragraph>
                            </View>
                            <Paragraph style={[styles.cardText, { alignSelf: 'center' }]}>Sunlight in your area {sunlightString}</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card mode="outlined" style={styles.card}>
                        <Card.Title
                            style={styles.cardTitle}
                            titleStyle={styles.cardTitle}
                            title="Minimum Temperature"
                        />
                        <Card.Content>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", }}>
                                <Paragraph style={styles.cardText}>Required min temp = {minTemperature} °F</Paragraph>
                                <Paragraph style={styles.cardText}>Current temp = {currTemperature} °F</Paragraph>
                            </View>
                            <Paragraph style={[styles.cardText, { alignSelf: 'center' }]}>Temperature in your area {temperatureString}</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card mode="outlined" style={styles.card}>
                        <Card.Title
                            style={styles.cardTitle}
                            titleStyle={styles.cardTitle}
                            title="Soil Type"
                        />
                        <Card.Content>
                            <Paragraph style={styles.cardText}>Requires {soilType} soil type</Paragraph>
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>

            {/* Add navigation to bottom appbar */}
            {/* Bottom Nav bar */}
            <Appbar style={styles.bottom}>
                <Appbar.Action icon="home" color="#005500" size={Math.min(width * 0.09, height * 0.05)} onPress={() => Alert.alert("Home", "Home page not yet implemented", [{ text: 'OK' }],)} />
                <Appbar.Action icon="leaf" color="#EDEECB" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
                <Appbar.Action icon="account-supervisor" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_PostList")} />
                <Appbar.Action icon="brightness-5" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => {if (global.googleID == undefined) { navigation.navigate("Page_Profile_Email_Account"); } else { navigation.navigate("Page_Profile_Google_Account"); }}} />
            </Appbar>
        </View>
    );
}

export default Plant_Care_Recommendation;

const styles = StyleSheet.create({
    // Appbar styles
    appbar: {
        width: width,
        backgroundColor: '#82B47D',
        flexDirection: "row",
        height: height * 0.078125, // 70defaultH
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
        backgroundColor: '#82B47D',
        height: height * 0.078125,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EDEECB',
        paddingBottom: height * 0.078125,
    },

    // Plant image and details style
    plantContainer: {
        width: width,
        height: height * (430 / defaultH - (.078125 * 3)), // 210 defaultH
        alignItems: 'center',
    },
    plantImage: {
        width: width * 1.3,
        height: height * (430 / defaultH - (.078125 * 3)),
        borderBottomRightRadius: height * (430 / defaultH - (.078125 * 3)),
        borderBottomLeftRadius: height * (430 / defaultH - (.078125 * 3))
    },
    plantNameContent: {
        backgroundColor: '#82B47D',
        paddingVertical: height * 0.01,
        borderRadius: 10,
    },
    plantNameView: {
        position: "absolute",
        height: '85%',
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },
    plantNameText: {
        backgroundColor: '#82B47D',
        color: "white",
        textAlign: 'center',
        fontFamily: "Lato_400Regular",
        paddingHorizontal: width * 0.05,
        fontSize: 16,
        letterSpacing: -0.24,
    },

    // Recommendations style
    recommendationsView: {
        marginTop: 30,
        marginBottom: height * 27 / defaultH,
    },
    card: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: width * 390 / defaultW,
        // height: height * 0.14,
        borderRadius: 25,
        marginBottom: height * 8 / defaultH,
        shadowColor: 'grey',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    cardTitle: {
        justifyContent: 'center',
        fontFamily: "Lato_700Bold",
        // flex: 1,
    },
    cardText: {
        // marginLeft: width * 0.06,
        fontFamily: "Lato_400Regular",
        fontSize: 15,
        color: "#4E4E4E",
        marginBottom: 3,
    },
    rowContainer: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "center",
    },
    fertilizerInput: {
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: 'white',
        fontFamily: "Lato_400Regular",
        fontSize: 20,
        height: 40,
        width: width / 5,
        margin: 15,
        borderWidth: 1,
        padding: 10,
    },
    setFertilizerButton: {
        backgroundColor: '#82B47D',
        borderRadius: 25,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: 'center',
        width: width / 5,
        padding: 10,
        paddingHorizontal: 15,
        margin: 2,
        shadowColor: '#EDEECB',
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    setFertilizerText: {
        justifyContent: 'center',
        color: 'white',
        fontFamily: "Lato_400Regular",
        fontSize: 18,
    },
}); 