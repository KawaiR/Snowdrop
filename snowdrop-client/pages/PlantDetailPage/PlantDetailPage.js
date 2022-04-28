import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, Image, Dimensions, ImageBackground, Alert, TouchableOpacity } from "react-native";
import { Appbar, Avatar, Card, FAB, IconButton, Provider, Dialog, Portal, Button, ToggleButton } from 'react-native-paper';
import { DebugInstructions } from "react-native/Libraries/NewAppScreen";
import { useIsFocused } from "@react-navigation/native";
import styles from './PlantDetailPageStyle.js';

const PlantDetailPage  = ({route, navigation}) => {
    const { plant, id } = route.params;

    var width = Dimensions.get('window').width; 
    var height = Dimensions.get('window').height;

    const [waterVisible, setWaterVisible] = React.useState(false);
    const [fertilizerVisible, setFertilizerVisible] = React.useState(false);
    const [healthVisible, setHealthVisible] = React.useState(false);
    const [deleteVisible, setDeleteVisible] = React.useState(false);
    const [sunVisible, setSunVisible] = React.useState(false);

    const [commonName, setCommonName] = React.useState(plant.nickname);
    const [scientificName, setScientificName] = React.useState("");
    const [health, setHealth] = React.useState(plant.plantHealth);
    const [waterCurrent, setWaterCurrent] = React.useState(plant.waterCurrent);
    const [image, setImage] = React.useState("");
    const [upcomingWatered, setUpcomingWatered] = React.useState(plant.waterNext);
    const [value, setValue] = React.useState("" + plant.reportedExposure + "");
    const [sunlight, setSunlight] = React.useState("" + plant.reportedExposure + "");
    const [difficulty, setDifficulty] = React.useState("");

    const [sunlightBool, setSunlightBool] = React.useState(0);

    const hideWater = () => setWaterVisible(false);
    const hideFertilizer = () => setFertilizerVisible(false);
    const hideHealth = () => setHealthVisible(false);
    const hideDelete = () => setDeleteVisible(false);
    const hideSun = () => setSunVisible(false);

    const waterYes = () => {
        console.log("waterYes");
        waterPlant();
        setWaterVisible(false);
    }
    const waterrNo = () => {
        setWaterVisible(false);
    }
    const fertilizerYes = () => {
        setFertilizerVisible(false);
    }
    const fertilizerNo = () => {
        setFertilizerVisible(false);
    }
    async function deleteYes() {
        setDeleteVisible(false);
        try {
			let response = await fetch('https://quiet-reef-93741.herokuapp.com/plants/' + plant.id + "/delete-plant", {
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
                        setDeleteVisible(false);
					});
				}
				if (response.status == 200 || response.status == 201 || response.status == 202) {
                    console.log('success');
                    navigation.navigate("Page_Plant");
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    }

    async function sunYes() {
        setSunVisible(false);
        console.log("sun yes");
        console.log(global.userName)
        console.log(plant.plant.id)
        var temp = 0;
        if (value == "1") {
            temp = 1;
        }
        if (value == "2") {
            temp = 2;
        }
        if (value == "3") {
            temp = 3;
        }
        try {
			let response = await fetch('https://quiet-reef-93741.herokuapp.com/plants/' + plant.id + "/sunlight-exposure", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    username: global.userName,
                    reportedSunlight: temp,
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
                    console.log('success');
                    setSunlight(value);
                    response.json().then((result) => {
                        console.log('success');
                        setSunlightBool(result);
                        if (result) {
                            Alert.alert(
                                'Change plant location',
                                'Your plant is getting an incorrect amount of sunlight exposure, change the location of the plant in your house (move it towards/away from a window)',
                                [{ text: 'OK' }, { text: 'Ignore' }],
                            );
                        } else {
                            Alert.alert(
                                'Good job!',
                                'Your plant is getting an optimal amount of sunlight exposure in this location',
                                [{ text: 'OK' }],
                            );
                        }
					});
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    }

    const isFocused = useIsFocused()
    useEffect(() => {
        console.log("use effect");
        console.log(plant)
        if (isFocused) {
            getPlantName(id);
                
            if ((upcomingWatered != null) && (upcomingWatered != "")) {
                setUpcomingWatered(upcomingWatered.substring(0, 10));
            } else {
                setUpcomingWatered("");
            }
        }
    }, [isFocused]);

    async function waterPlant() {
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
                        setUpcomingWatered(result.waterNext.substring(0, 10))
                        //setPlantsList(result.caredFor);
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
			let response = await fetch('https://quiet-reef-93741.herokuapp.com/plants/' + plant.plant.id + '/get-plant-info', { method: 'GET' })
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
                        console.log(result);
                        setScientificName(result.scientificName);
                        // setSunlight(result.sunlightLevel);
                        // setValue(result.sunlightLevel);
                        if (result.plantImage != null) {
                            setImage(result.plantImage);
                        } else {
                            setImage(require('snowdrop-client/assets/plant-image.jpeg'));
                        }
                        setDifficulty(result.difficulty);
					});
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    }

    function checkImage() {
        var url = plant.plant.plantImage;

        //define some image formats 
        var types = ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'bmp'];

        //split the url into parts that has dots before them
        var parts = url.split('.');

        //get the last part 
        var extension = parts[parts.length - 1];

        //check if the extension matches list 
        if (types.indexOf(extension) !== -1) {
            return true;
        }

        plant.plant.plantImage = 'https://www.okumcmission.org/wp-content/uploads/2019/07/250-2503958_potted-plants-clipart-transparent-background-plant-logo-free.jpg';
        return false;
    }

	return (
    <Provider>
    <View style={styles.container}>
    <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white" onPress={() => navigation.navigate("Page_Plant")}/>
        <Appbar.Action icon="delete" color="white" style={{marginLeft: 'auto'}} onPress={() => {setDeleteVisible(true);}}/>
    </Appbar.Header>
	<ScrollView style={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
        {checkImage()}
        <ImageBackground style={styles.plantsImage} source={{ uri: plant.plant.plantImage }}>
            <View style={styles.plantNameView}>
                <View style={styles.plantNameContent}>
                    <Text style={styles.plantNameText}>{commonName}</Text>
                    <Text style={styles.plantNameText}>{scientificName}</Text>
                    <Text style={styles.plantNameText}>{upcomingWatered === "" ? "" : "Upcoming watered: " + upcomingWatered}</Text>
                    <Text style={styles.plantNameText}>{(difficulty === "B") ? "Difficulty: Beginner" : (difficulty === "I" ? "Difficulty: Intermediate" : "Difficulty: Expert")}</Text>
                </View>
            </View>
        </ImageBackground>
        <View style={styles.upcomingView}>
            <Text style={styles.upcomingText}>Upcoming</Text>
            <View style={styles.cardList}>
                <Card mode="outlined" style={styles.card}>
                    <Card.Title
                        style={styles.cardTitle}
                        titleStyle={styles.cardText}
                        subtitleStyle={styles.cardText}
                        title="Water"
                        subtitle={"Upcoming date: " + upcomingWatered}
                        left={(props) =>  <IconButton {...props} icon="water" size={50} color={'#4E4E4E'}/>}
                        right={(props) => <IconButton {...props} icon="checkbox-marked-circle-outline" size={30} color={'#4E4E4E'} onPress={() => {setWaterVisible(true);}} />}
                    />
                </Card>
                {/* <Card mode="outlined" style={styles.card}>
                    <Card.Title
                        style={styles.cardTitle}
                        titleStyle={styles.cardText}
                        subtitleStyle={styles.cardText}
                        title="Fertilizer"
                        subtitle="Date"
                        left={(props) =>  <IconButton {...props} icon="leaf" size={50} color={'#4E4E4E'}/>}
                        right={(props) => <IconButton {...props} icon="checkbox-marked-circle-outline" size={30} color={'#4E4E4E'} onPress={() => {setFertilizerVisible(true);}} />}
                    />
                </Card> */}
                <TouchableOpacity style={styles.plantCareButton} onPress={() => navigation.navigate("Plant_Care_Recommendation", { plant: plant, id: plant.plant.id })} >
                    <Text style={styles.plantCareText}>
                        View plant care recommendations 
				    </Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.upcomingView}>
            <Text style={styles.upcomingText}>Plant Health</Text>
            <View style={styles.cardList}>
                <Card mode="outlined" style={styles.card}>
                    <Card.Title
                        style={styles.cardTitle}
                        titleStyle={styles.cardText}
                        subtitleStyle={styles.cardText}
                        // leftStyle={styles.cardLeft}
                        title="Current health"
                        subtitle={health}
                        left={(props) => <Avatar.Image {...props} size={height * 0.08} style={styles.cardImage} source={require('snowdrop-client/assets/golden-pothos.png')} />}
                        right={(props) => <IconButton {...props} icon="checkbox-marked-circle-outline" size={30} color={'#4E4E4E'} onPress={() => {setHealthVisible(true);}} />}
                    />
                </Card>
                <Card mode="outlined" style={styles.card}>
                    <Card.Title
                        style={styles.cardTitle}
                        titleStyle={styles.cardText}
                        subtitleStyle={styles.cardText}
                        title="Sunlight Exposure"
                        subtitle={sunlight}
                        left={(props) =>  <IconButton {...props} icon="weather-sunny" size={50} color={'#4E4E4E'}/>}
                        right={(props) => <IconButton {...props} icon="checkbox-marked-circle-outline" size={30} color={'#4E4E4E'} onPress={() => {setSunVisible(true);}} />}
                    />
                </Card>
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
                <Button onPress={waterrNo}>Exit</Button>
                </Dialog.Actions>
            </Dialog>
            <Dialog visible={fertilizerVisible} onDismiss={hideFertilizer}>
                <Dialog.Title>Fertilizer</Dialog.Title>
                <Dialog.Content>
                <Text>Did you apply fertilizer today?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                <Button onPress={fertilizerYes}>Yes</Button>
                <Button onPress={fertilizerNo}>No</Button>
                </Dialog.Actions>
            </Dialog>
            <Dialog visible={healthVisible} onDismiss={hideHealth}>
                <Dialog.Title>Plant Health</Dialog.Title>
                <Dialog.Actions>
                <Button onPress={hideHealth}>Yes</Button>
                <Button onPress={hideHealth}>No</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
        <Portal>
            <Dialog visible={deleteVisible} onDismiss={hideDelete}>
                <Dialog.Title>Deleting Plant</Dialog.Title>
                <Dialog.Content>
                    <Text>Are you sure that you want to delete this plant?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                <Button onPress={deleteYes}>Yes</Button>
                <Button onPress={hideDelete}>No</Button>
                </Dialog.Actions>
            </Dialog>
            <Dialog visible={sunVisible} onDismiss={hideSun}>
                <Dialog.Title>Sunlight Exposure</Dialog.Title>
                <Dialog.Content>
                    <Text>How much sunlight does your plant get?</Text>
                    <ToggleButton.Row style={styles.toggle} onValueChange={value => setValue(value)} value={value}>
                        <ToggleButton icon="numeric-1" value="1" />
                        <ToggleButton icon="numeric-2" value="2" />
                        <ToggleButton icon="numeric-3" value="3" />
                    </ToggleButton.Row>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={sunYes}>Confirm</Button>
                    <Button onPress={hideSun}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
	</ScrollView>
    <FAB
        visible={global.editorPrivilege}
        // visible={true}
        style={styles.fab}
        icon="square-edit-outline"
        color="white"
        onPress={() => navigation.navigate('Plant_Edit', {plant: plant.plant})}
    />
    {/* Bottom Nav Bar */}
    <Appbar style={styles.bottom}>
        <Appbar.Action icon="home" color="#005500" size={Math.min(width * 0.09, height * 0.05)} onPress={() => navigation.navigate("Home")} />
        <Appbar.Action icon="leaf" color="#EDEECB" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
        <Appbar.Action icon="account-supervisor" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_PostList", {tagId: ""})} />
        <Appbar.Action icon="brightness-5" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => {if (global.googleID == undefined) { navigation.navigate("Page_Profile_Email_Account"); } else { navigation.navigate("Page_Profile_Google_Account"); }}} />
    </Appbar>
    </View>
    </Provider>
)}
export default PlantDetailPage