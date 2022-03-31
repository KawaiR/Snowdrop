import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, Image, Dimensions, ImageBackground } from "react-native";
import { Appbar, Avatar, Card, FAB, IconButton, Provider, Dialog, Portal, Button, ToggleButton } from 'react-native-paper';
import { DebugInstructions } from "react-native/Libraries/NewAppScreen";

import styles from './PlantDetailPageStyle.js';

const PlantDetailPage  = ({route, navigation}) => {
    const { plant, id } = route.params;

    var width = Dimensions.get('window').width; 
    var height = Dimensions.get('window').height;

    const [fetched, setFetched] = React.useState(0);

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
    const [value, setValue] = React.useState("TODO");
    const [sunlight, setSunlight] = React.useState("TODO");

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
			let response = await fetch('http://localhost:8080/plants/' + id + "/delete-plant", {
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
					response.json().then((result) => {
                        console.log('success');
						console.log(result);
                        navigation.navigate("Page_Plant");
					});
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    }
    
    async function sunYes() {
        setSunVisible(false);
        try {
			let response = await fetch('http://localhost:8080/plants/' + id + "/sunlight-exposure", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    username: global.userName,
                    sunlightLevel: parseInt(value),
                }),
            })
			.then((response) => {
				if (response.status == 400) {
					response.json().then((result) => {
                        console.log('fail');
						console.log(result.message);
                        // todo update sunlight ui
					});
				}
				if (response.status == 200 || response.status == 201 || response.status == 202) {
					response.json().then((result) => {
                        console.log('success');
						console.log(result);
					});
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    }

    useEffect(() => {
        console.log("use effect");
        if (fetched == 0) {
            getPlantName(id);
            if ((upcomingWatered != null) && (upcomingWatered != "")) {
                setUpcomingWatered(upcomingWatered.substring(0, 10));
            } else {
                setUpcomingWatered("");
            }
            setFetched(1);
        }
        
    });

    async function waterPlant() {
        try {
			let response = await fetch('http://localhost:8080/plants/' + id + "/water-plant", {
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
			let response = await fetch('http://localhost:8080/plants/' + "TODO" + '/get-plant-info', { method: 'GET' })
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
					});
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    }


	return (
    <Provider>
    <View style={styles.container}>
    <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white" onPress={() => navigation.navigate("Page_Plant")}/>
        <Appbar.Action icon="delete" color="white" style={{marginLeft: 'auto'}} onPress={() => {setDeleteVisible(true);}}/>
    </Appbar.Header>
	<ScrollView style={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
        <ImageBackground style={styles.plantsImage} source={require('snowdrop-client/assets/plant-image.jpeg')}>
            <View style={styles.plantNameView}>
                <View style={styles.plantNameContent}>
                    <Text style={styles.plantNameText}>{commonName}</Text>
                    <Text style={styles.plantNameText}>{scientificName}</Text>
                    <Text style={styles.plantNameText}>{upcomingWatered}</Text>
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
                <Card mode="outlined" style={styles.card}>
                    <Card.Title
                        style={styles.cardTitle}
                        titleStyle={styles.cardText}
                        subtitleStyle={styles.cardText}
                        title="Fertilizer"
                        subtitle="Date"
                        left={(props) =>  <IconButton {...props} icon="leaf" size={50} color={'#4E4E4E'}/>}
                        right={(props) => <IconButton {...props} icon="checkbox-marked-circle-outline" size={30} color={'#4E4E4E'} onPress={() => {setFertilizerVisible(true);}} />}
                    />
                </Card>
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
                        left={(props) => <Avatar.Image {...props} size={width * 0.18} style={styles.cardImage} source={require('snowdrop-client/assets/golden-pothos.png')} />}
                        right={(props) => <IconButton {...props} icon="checkbox-marked-circle-outline" size={30} color={'#4E4E4E'} onPress={() => {setHealthVisible(true);}} />}
                    />
                </Card>
                <Card mode="outlined" style={styles.card}>
                    <Card.Title
                        style={styles.cardTitle}
                        titleStyle={styles.cardText}
                        subtitleStyle={styles.cardText}
                        title="Sunlight Exposure"
                        subtitle={"TODO"}
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
                        <ToggleButton icon="white-balance-sunny" value="11" />
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
        style={styles.fab}
        icon="square-edit-outline"
        color="white"
        onPress={() => console.log(plant)}
    />
    <Appbar style={styles.bottom}>
        <Appbar.Action icon="home" color="#005500" size={width*0.09}/>
        <Appbar.Action icon="leaf" color="#005500" size={width*0.09} style={{marginLeft: '9%'}} onPress={() => navigation.navigate("Page_Plant")}/>
        <Appbar.Action icon="account-supervisor" color="#005500" size={width*0.09} style={{marginLeft: '9%'}}/>
        <Appbar.Action icon="brightness-5" color="#005500" size={width*0.09} style={{marginLeft: '9%'}}/>
    </Appbar>
    </View>
    </Provider>
)}
export default PlantDetailPage