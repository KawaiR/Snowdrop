import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, Image, Dimensions, ImageBackground } from "react-native";
import { Appbar, Avatar, Card, FAB, IconButton, Provider, Dialog, Portal, Button } from 'react-native-paper';

import styles from './PlantDetailPageStyle.js';

const PlantDetailPage  = ({route, navigation}) => {
    const { plant, id } = route.params;

    var width = Dimensions.get('window').width; 
    var height = Dimensions.get('window').height;

    const [waterVisible, setWaterVisible] = React.useState(false);
    const [fertilizerVisible, setFertilizerVisible] = React.useState(false);
    const [healthVisible, setHealthVisible] = React.useState(false);

    const [commonName, setCommonName] = React.useState("");
    const [scientificName, setScientificName] = React.useState("");
    const [lastWatered, setLastWatered] = React.useState(plant.waterLast);
    const [image, setImage] = React.useState("");
    const [upcomingWatered, setUpcomingWatered] = React.useState("");

    const hideWater = () => setWaterVisible(false);
    const hideFertilizer = () => setFertilizerVisible(false);
    const hideHealth = () => setHealthVisible(false);

    const waterYes = () => {
        console.log("waterYes");
        waterPlant();
        setWaterVisible(false);
        // add
    }
    const waterrNo = () => {
        setWaterVisible(false);
        // add
    }
    const fertilizerYes = () => {
        setFertilizerVisible(false);
    }
    const fertilizerNo = () => {
        setFertilizerVisible(false);
    }

    useEffect(() => {
        console.log(plant);
        getPlantName(id);
    });

    async function waterPlant() {
        try {
			let response = await fetch('http://localhost:8080/plants/' + id + "/water-plant", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
				},
                body: "\"" + global.userName + "\"",
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
						console.log(result);
                        //setPlantsList(result.caredFor);
					});
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    }

    async function updateNickname(nicknameGiven) {
        try {
			let response = await fetch('http://localhost:8080/plants/' + global.username + "/update-nickname", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
				},
                body: JSON.stringify({
                    plantCareId: id,
                    nickname: nicknameGiven,
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
						console.log(result);
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
			let response = await fetch('http://localhost:8080/plants/' + id + '/get-plant-info', { method: 'GET' })
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
                        if (result.plantName != null) {
                            setCommonName(result.plantName);
                        } else {
                            setCommonName(result.scientificName);
                        }
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
    <Provider>
    <View style={styles.container}>
    <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white"/>
        <Appbar.Action icon="brightness-5" color="white" style={{marginLeft: 'auto'}}/>
    </Appbar.Header>
	<ScrollView style={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
        <ImageBackground style={styles.plantsImage} source={require('snowdrop-client/assets/plant-image.jpeg')}>
            <View style={styles.plantNameView}>
                <View style={styles.plantNameContent}>
                    <Text style={styles.plantNameText}>{commonName}</Text>
                    <Text style={styles.plantNameText}>{scientificName}</Text>
                    <Text style={styles.plantNameText}>{lastWatered}</Text>
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
                        subtitle={plant.waterLast}
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
                        title="current health"
                        subtitle="current health"
                        left={(props) => <Avatar.Image {...props} size={width * 0.18} style={styles.cardImage} source={require('snowdrop-client/assets/golden-pothos.png')} />}
                        right={(props) => <IconButton {...props} icon="checkbox-marked-circle-outline" size={30} color={'#4E4E4E'} onPress={() => {setHealthVisible(true);}} />}
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
                <Button onPress={waterrNo}>No</Button>
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
	</ScrollView>
    <FAB
        style={styles.fab}
        icon="square-edit-outline"
        color="white"
        onPress={() => console.log(plant)}
    />
    <Appbar style={styles.bottom}>
        <Appbar.Action icon="home" color="#005500" size={width*0.09}/>
        <Appbar.Action icon="leaf" color="#005500" size={width*0.09} style={{marginLeft: '9%'}}/>
        <Appbar.Action icon="account-supervisor" color="#005500" size={width*0.09} style={{marginLeft: '9%'}}/>
        <Appbar.Action icon="brightness-5" color="#005500" size={width*0.09} style={{marginLeft: '9%'}}/>
    </Appbar>
    </View>
    </Provider>
)}
export default PlantDetailPage