import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, Image, Dimensions, Alert } from "react-native";
import { Appbar, Avatar, Card, FAB, IconButton } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";
import styles from './PlantsPageStyle.js';

const PlantsPage  = ({ navigation }) => {
    var width = Dimensions.get('window').width; 
    var height = Dimensions.get('window').height;

    const [plantsList, setPlantsList] = React.useState([]);
    const isFocused = useIsFocused()
    useEffect(() => {
        if (isFocused) {
            getPlants();
        }
    }, [isFocused]);

    async function getPlants() {
        try {
			let response = await fetch('http://localhost:8080/plants/' + global.userName + '/get-user-plants', { method: 'GET' })
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
						//console.log(result);
                        setPlantsList(result.caredFor);
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
                        if (result.plantName != null) {
						    return 'result.plantName';
                        }
                        return 'result.scientificName';
                        //setPlantsList(result.caredFor);
					});
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    }

    function processList() {
        console.log('caredFor');
        console.log(plantsList);
        console.log('caredFor');
        for (let i = 0; i < plantsList.length; i++) {
            console.log(plantsList[i].id);
        }
    }

	return (
    <View style={styles.container}>
    <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white"/>
        <Appbar.Action icon="brightness-5" color="white" style={{marginLeft: 'auto'}}/>
    </Appbar.Header>
	<ScrollView style={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.ovalBg}>
            <View style={styles.plantsView}>
                <Text style={styles.plantsText}>Plants</Text>
                <Image style={styles.plantsImage} source={require('snowdrop-client/assets/golden-pothos.png')}></Image>
            </View>
        </View>
		<View style={styles.cardList}>
            {plantsList.map((plant) => 
                <Card.Title
                    key={plant.id}
                    style={styles.card}
                    titleStyle={styles.cardText}
                    subtitleStyle={styles.cardText}
                    title={(plant.nickname != null) ? plant.nickname : 'No common name'}
                    subtitle={(plant.waterCurrent != null) ? plant.waterCurrent : 'No water'}
                    left={(props) => <Avatar.Image {...props} size={height * 0.08} style={styles.cardImage} source={require('snowdrop-client/assets/golden-pothos.png')} />}
                    right={(props) => <IconButton {...props} icon="chevron-right" size={50} color={'#4E4E4E'} onPress={() => navigation.navigate('Page_PlantDetail', {plant: plant, id: plant.id})} />}
                />
            
            )}

        </View>
	</ScrollView>
    {global.plantSearchFromWritePost = false}
    <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => {
            navigation.navigate("Plant_Search");}}
    />
    {/* Bottom Nav Bar */}
    <Appbar style={styles.bottom}>
        <Appbar.Action icon="home" color="#005500" size={Math.min(width * 0.09, height * 0.05)} onPress={() => Alert.alert("Home", "Home page not yet implemented", [{ text: 'OK' }],)} />
        <Appbar.Action icon="leaf" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
        <Appbar.Action icon="account-supervisor" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_PostList")} />
        <Appbar.Action icon="brightness-5" color="#EDEECB" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => {if (global.googleID == undefined) { navigation.navigate("Page_Profile_Email_Account"); } else { navigation.navigate("Page_Profile_Google_Account"); }}} />
    </Appbar>
    </View>
)}
export default PlantsPage