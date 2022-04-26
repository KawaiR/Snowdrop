import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, Card, Paragraph, Avatar, IconButton, Portal, Dialog, Button, Provider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { useIsFocused } from "@react-navigation/native";
import * as Location from 'expo-location';

const {
    width,
    height,
} = Dimensions.get("window");

const defaultW = 414;
const defaultH = 896;

const Home = ({ route, navigation }) => {
    const [maxTemperature, setMaxTemperature] = React.useState(0.0);
    const [minTemperature, setMinTemperature] = React.useState(0.0);
    const [conditionText, setConditionText] = React.useState("");
    const [conditionUrl, setConditionUrl] = React.useState("");
    const [currTemperature, setCurrTemperature] = React.useState(0.0);
    const [city, setCity] = React.useState("");
    const [region, setRegion] = React.useState("");
    const [locationAllowed, setLocationAllowed] = React.useState(false);

    const [plantsList, setPlantsList] = React.useState([]);
    const [waterVisible, setWaterVisible] = React.useState(false);
    const [waterPlantId, setWaterPlantId] = React.useState(0);
    const hideWater = () => setWaterVisible(false);

    const [posts, setPosts] = React.useState([]);

    const isFocused = useIsFocused()
    useEffect(() => {
        if (isFocused) {
            getWeatherApiData();
            getUpcoming();
            getPosts();
        }
    }, [isFocused, city, region, currTemperature, maxTemperature, minTemperature, conditionText, conditionUrl]);

    const waterYes = () => {
        console.log("waterYes");
        waterPlant(waterPlantId);
        setWaterVisible(false);
    }

    const waterNo = () => {
        setWaterVisible(false);
    }

    async function getWeatherApiData() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        setLocationAllowed(true);
        let location = await Location.getCurrentPositionAsync({});
        await fetch('http://api.weatherapi.com/v1/forecast.json?key=0a5a11da31f34220b9d172820222701&q=' + location.coords.latitude.toString() + "," + location.coords.longitude.toString() + '&days=1&aqi=no&alerts=no', {
            method: 'POST',
        })
            .then((response) => {
                response.json().then((result) => {
                    setCity(result.location.name);
                    setRegion(result.location.region);

                    setCurrTemperature(result.current.temp_f);
                    setMaxTemperature(result.forecast.forecastday[0].day.maxtemp_f);
                    setMinTemperature(result.forecast.forecastday[0].day.mintemp_f);
                    setConditionText(result.forecast.forecastday[0].day.condition.text);
                    setConditionUrl("https:" + result.forecast.forecastday[0].day.condition.icon);
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

    async function getUpcoming() {
        console.log("Fetching plantcare objects...");
        try {
            let response = await fetch('https://quiet-reef-93741.herokuapp.com/plants/' + global.userName + '/get-water-schedules', { method: 'GET' })
                .then((response) => {
                    if (response.status == 400 || response.status == 500) {
                        response.json().then((result) => {
                            console.log(result.message);
                        });
                    }
                    if (response.status == 200 || response.status == 201 || response.status == 202) {
                        response.json().then((result) => {
                            setPlantsList(result.slice(0, 3));
                            console.log("Plantcare objects fetched");
                        });
                    }
                });
        } catch (err) {
            console.log("Fetch didnt work.");
            console.log(err);
        }
    }

    async function waterPlant(id) {
        try {
            let response = await fetch('https://quiet-reef-93741.herokuapp.com/plants/' + id + "/water-plant", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    username: global.userName,
                }),
            })
                .then((response) => {
                    if (response.status == 400) {
                        response.json().then((result) => {
                            console.log('fail');
                            console.log(result.message);
                            console.log('fail');
                        });
                    }
                    if (response.status == 200 || response.status == 201 || response.status == 202) {
                        response.json().then((result) => {
                            console.log('success');
                            console.log(result);
                            console.log('success');
                            getUpcoming();
                        });
                    }
                });
        } catch (err) {
            console.log("Fetch didnt work.");
            console.log(err);
        }
    }

    async function getPosts() {
        let url = "https://quiet-reef-93741.herokuapp.com/posts";
        try {
            let response = await fetch(url, { method: 'GET' })
                .then((response) => {
                    if (response.status == 400) {
                        response.json().then((result) => {
                            console.log(result.message);
                        });
                    }
                    if (response.status == 200 || response.status == 201 || response.status == 202) {
                        response.json().then((result) => {
                            setPosts(result.slice(0, 3))
                        });
                    }
                });
        } catch (err) {
            console.log("Fetch didnt work.");
            console.log(err);
        }
    };

    return (
        <Provider>
            <View style={styles.container}>
                {/* Header */}
                <Appbar.Header style={styles.appbar}>
                    <Appbar.Content title={<Text style={styles.headerTitle}>SNOWDROP</Text>} style={styles.headerTitle} />
                </Appbar.Header>

                <ScrollView style={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
                    {locationAllowed && <View style={styles.weatherContainer}>
                        <View style={styles.rowContainer}>
                            <View style={{ alignItems: "flex-start", paddingHorizontal: 10, }}>
                                <Text style={[styles.weatherText, { fontSize: 18, }]}>{city}, {region}</Text>
                                <Text style={styles.weatherText}>Current: {currTemperature} °F</Text>
                            </View>
                            <View style={{ alignItems: "flex-end", paddingHorizontal: 10, }}>
                                <View style={{ flexDirection: "row", }}>
                                    <Avatar.Image
                                        source={{ uri: conditionUrl }}
                                        size={width * 0.06}
                                        style={styles.weatherImage}
                                    />
                                    <Text style={[styles.weatherText, { fontSize: 16, paddingLeft: 5, }]}>{conditionText}</Text>
                                </View>
                                <Text style={styles.weatherText}>H: {maxTemperature} °F</Text>
                                <Text style={styles.weatherText}>L: {minTemperature} °F</Text>
                            </View>
                        </View>
                    </View>}

                    <View style={styles.upcomingView}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={styles.upcomingText}>Upcoming Watering</Text>
                            <Text style={styles.viewAllText} onPress={() => navigation.navigate("Page_Plant")}>View all</Text>
                        </View>

                        <View>
                            {plantsList.length > 0 && plantsList.map((plantCare) =>
                                <Card mode="outlined" style={styles.card} onPress={() => navigation.navigate("Page_PlantDetail", { plant: plantCare, id: plantCare.id })}>
                                    <Card.Title
                                        key={plantCare.id}
                                        style={styles.cardTitle}
                                        titleStyle={styles.cardText}
                                        subtitleStyle={styles.cardText}
                                        title={(plantCare.nickname != null) ? plantCare.nickname : 'No common name'}
                                        subtitle={(plantCare.waterNext != null) ? plantCare.waterNext.substring(0, 10) : 'No water'}
                                        left={(props) => <Avatar.Image {...props} size={height * 0.08} style={styles.cardImage} source={{ uri: plantCare.plant.plantImage }} />}
                                        right={(props) => <IconButton {...props} icon="checkbox-marked-circle-outline" size={30} color={'#4E4E4E'} onPress={() => { setWaterVisible(true); setWaterPlantId(plantCare.id); }} />}
                                    />
                                </Card>
                            )}
                            {plantsList.length == 0 &&
                                <Text style={{ textAlign: "center", justifyContent: "center", color: "grey", fontFamily: "Lato_400Regular", }}>No plants at this time.</Text>
                            }
                        </View>
                    </View>

                    <View style={[styles.upcomingView, { marginBottom: height * 20 / defaultH, }]}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={styles.upcomingText}>Recent Posts</Text>
                            <Text style={styles.viewAllText} onPress={() => navigation.navigate("Page_PostList")}>View all</Text>
                        </View>

                        <View>
                            {posts.length > 0 && posts.map((post) =>
                                <TouchableOpacity style={styles.post} onPress={() => {
                                    navigation.navigate('Page_IndPost', { id: post.id });
                                }}>
                                    <View style={styles.postContent}>
                                        <View style={styles.postHeader}>
                                            <Text style={{ color: "grey", fontFamily: "Lato_400Regular", }}>{post.sender.userName}</Text>
                                            <Text style={{ color: "grey", fontFamily: "Lato_400Regular", textAlign: 'right', flex: 1 }}>{post.uploadDate}</Text>
                                        </View>
                                        <View style={styles.lineBreak}></View>
                                        <Text style={styles.title}>{post.postTitle}</Text>
                                        <TouchableOpacity style={styles.tagButton} onPress={() => { }}>
                                            <Text style={styles.tagText}>{post.tag.plant.plantImage === "general-tag" ? "General" : (post.tag.plant.plantImage === "advice-tag" ? "Advice" : post.tag.plant.plantName)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            )}
                            {posts.length == 0 &&
                                <Text style={{ textAlign: "center", justifyContent: "center", color: "grey", fontFamily: "Lato_400Regular", }}>No posts at this time.</Text>
                            }
                        </View>
                    </View>

                    <Portal>
                        <Dialog visible={waterVisible} onDismiss={hideWater}>
                            <Dialog.Title>Water</Dialog.Title>
                            <Dialog.Content>
                                <Text>Did you water your plant today?</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={waterYes}>Yes</Button>
                                <Button onPress={waterNo}>Exit</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </ScrollView>

                {/* Bottom Nav bar */}
                <Appbar style={styles.bottom}>
                    <Appbar.Action icon="home" color="#EDEECB" size={Math.min(width * 0.09, height * 0.05)} onPress={() => navigation.navigate("Home")} />
                    <Appbar.Action icon="leaf" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
                    <Appbar.Action icon="account-supervisor" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_PostList")} />
                    <Appbar.Action icon="brightness-5" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => { if (global.googleID == undefined) { navigation.navigate("Page_Profile_Email_Account"); } else { navigation.navigate("Page_Profile_Google_Account"); } }} />
                </Appbar>
            </View>
        </Provider>
    );
}

export default Home;

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
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EDEECB',
        paddingBottom: height * 0.078125,
    },

    // Weather panel
    weatherContainer: {
        width: width,
        height: height * (430 / defaultH - (.078125 * 4.5)), // 210 defaultH
        alignItems: 'center',
        backgroundColor: '#A8C1DD',
        borderBottomRightRadius: height * (430 / defaultH - (.078125 * 0)),
        borderBottomLeftRadius: height * (430 / defaultH - (.078125 * 0))
    },
    rowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    weatherImage: {
        width: width * 0.06,
        height: width * 0.06,
        backgroundColor: 'white',
    },
    weatherText: {
        color: "white",
        fontFamily: "Lato_400Regular",
        fontSize: 14,
    },

    // Upcoming reminder panel
    upcomingView: {
        marginTop: 30,
        alignSelf: 'center',
        backgroundColor: 'white',
        width: width * 390 / defaultW,
        borderRadius: 15,
        marginBottom: height / defaultH,
        paddingBottom: 10,
    },
    upcomingText: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily: "Lato_400Regular",
        marginHorizontal: width * 15 / defaultW,
        marginTop: height * 20 / defaultH,
        marginBottom: height * 22 / defaultH,
    },
    viewAllText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'grey',
        fontFamily: "Lato_400Regular",
        textDecorationLine: "underline",
        marginHorizontal: width * 15 / defaultW,
        marginTop: height * 20 / defaultH,
        marginBottom: height * 22 / defaultH,
    },
    card: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: width * 0.91787,
        height: height * 0.1060,
        borderRadius: 25,
        marginBottom: height * 11 / defaultH,
    },
    cardTitle: {
        justifyContent: 'center',
        fontFamily: "Lato_400Regular",
        flex: 1,
    },
    cardText: {
        marginLeft: width * 0.06,
        fontFamily: "Lato_400Regular",
    },
    cardImage: {
        width: height * 0.08,
        height: height * 0.08,
        borderRadius: 1000,
        backgroundColor: 'white',
        borderColor: '#D3D3D3',
        borderWidth: 1,
    },

    // Posts panel
    post: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: width * 385 / defaultW,
        margin: height * 0.006,
    },
    postContent: {
        marginHorizontal: height * 0.005,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        flex: 1,
        padding: 10,
        borderRadius: 25,
    },
    postHeader: {
        flexDirection: 'row',
    },
    lineBreak: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: height * 0.01,
    },
    title: {
        fontSize: 22,
        fontFamily: "Lato_400Regular",
        letterSpacing: -0.24,
        fontWeight: '400',
        marginBottom: height * 0.007,
    },
    tagButton: {
        backgroundColor: '#82B47D',
        borderRadius: 25,
        alignItems: "center",
        alignSelf: 'flex-start',
        padding: 5,
        paddingHorizontal: 15,
        margin: 10,
        marginLeft: 0,
        shadowColor: '#EDEECB',
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    tagText: {
        justifyContent: 'center',
        color: 'white',
        fontFamily: "Lato_400Regular",
        fontSize: 16,
    },
}); 