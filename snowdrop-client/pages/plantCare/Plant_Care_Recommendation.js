import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { Appbar, Card, Paragraph } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';

const {
    width,
    height,
} = Dimensions.get("window");

const defaultW = 414;
const defaultH = 896;

const Plant_Care_Recommendation = ({ route, navigation }) => {
    const { plant, id } = route.params; // plant here is actually a plant care object
    const [fertilizeTimes, onChangeNumber] = React.useState(global.fertilizeTimes);

    const [commonName, setCommonName] = React.useState(plant.nickname);
    const [scientificName, setScientificName] = React.useState("");
    const [health, setHealth] = React.useState(plant.plantHealth);
    const [waterCurrent, setWaterCurrent] = React.useState(plant.waterCurrent);
    const [image, setImage] = React.useState("");
    const [upcomingWatered, setUpcomingWatered] = React.useState(plant.waterNext);

    let [fontsLoaded] = useFonts({
        Alata_400Regular,
        Lato_400Regular,
        Lato_700Bold,
    });
    if (!fontsLoaded) {
        return <AppLoading />
    }

    useEffect(() => {
        console.log(plant);
        getPlantName(id);
        if ((upcomingWatered != null) && (upcomingWatered != "")) {
            setUpcomingWatered(upcomingWatered.substring(0, 10));
        } else {
            setUpcomingWatered("");
        }

    });

    async function getPlantName(id) {
        try {
            let response = await fetch('https://quiet-reef-93741.herokuapp.com/plants/' + id + '/get-plant-info', { method: 'GET' })
                .then((response) => {
                    if (response.status == 400) {
                        response.json().then((result) => {
                            console.log('get plant info fail');
                            console.log(result.message);
                            console.log('get plant info fail');
                        });
                    }
                    if (response.status == 200 || response.status == 201 || response.status == 202) {
                        response.json().then((result) => {
                            console.log(result);
                            /*
                            if (result.plantName != null) {
                                setCommonName(result.plantName);
                            } else {
                                setCommonName(result.scientificName);
                            }
                            */
                            setScientificName(result.scientificName);
                            if (result.plantImage != null) {
                                setImage(result.plantImage);
                            } else {
                                setImage(require('snowdrop-client/assets/plant-image.jpeg'));
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
                            {/* <Text style={styles.plantNameText}>Common Name</Text> */}
                            <Text style={styles.plantNameText}>{scientificName}</Text>
                            {/* <Text style={styles.plantNameText}>Scientific Name</Text> */}
                            <Text style={styles.plantNameText}>{upcomingWatered}</Text>
                            {/* <Text style={styles.plantNameText}>Upcoming watered</Text> */}
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
                            <Paragraph style={styles.cardText}>Requires moderate watering</Paragraph>
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
                            value={fertilizeTimes}
                            keyboardType="numeric"
                            borderRadius={25}
                            selectionColor={'grey'}
                            underlineColorAndroid='transparent'
                        />
                        <TouchableOpacity style={styles.setFertilizerButton} onPress={() => {global.fertilizeTimes = fertilizeTimes}} >
                            <Text style={styles.setFertilizerText}>Set</Text>
                        </TouchableOpacity>
                        </View>
                    </Card>
                    <Card mode="outlined" style={styles.card}>
                        <Card.Title
                            style={styles.cardTitle}
                            titleStyle={styles.cardTitle}
                            title="Sunlight"
                        />
                        <Card.Content>
                            <Paragraph style={styles.cardText}>Requires moderate sunlight</Paragraph>
                            <Paragraph style={[styles.cardText, { alignSelf: 'center', color: "green" }]}>Sunlight in your area meets requirement</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card mode="outlined" style={styles.card}>
                        <Card.Title
                            style={styles.cardTitle}
                            titleStyle={styles.cardTitle}
                            title="Temperature"
                        />
                        <Card.Content>
                            <Paragraph style={styles.cardText}>Requires temperatures between 65 and 75 F</Paragraph>
                            <Paragraph style={[styles.cardText, { alignSelf: 'center', color: "red" }]}>Temperature in your area higher than required</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card mode="outlined" style={styles.card}>
                        <Card.Title
                            style={styles.cardTitle}
                            titleStyle={styles.cardTitle}
                            title="Soil Type"
                        />
                        <Card.Content>
                            <Paragraph style={styles.cardText}>Requires acidic soil type</Paragraph>
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>

            {/* Add navigation to bottom appbar */}
            {/* Bottom Nav bar */}
            <Appbar style={styles.bottom}>
                <Appbar.Action icon="home" color="#005500" size={width * 0.09} />
                <Appbar.Action icon="leaf" color="#EDEECB" size={width * 0.09} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
                <Appbar.Action icon="account-supervisor" color="#005500" size={width * 0.09} style={{ marginLeft: '9%' }} />
                <Appbar.Action icon="brightness-5" color="#005500" size={width * 0.09} style={{ marginLeft: '9%' }} />
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