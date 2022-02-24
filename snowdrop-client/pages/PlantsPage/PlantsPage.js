import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import { Appbar, Avatar, Card, FAB, IconButton } from 'react-native-paper';

import styles from './PlantsPageStyle.js';

const PlantsPage  = ({navigation}) => {
    var width = Dimensions.get('window').width; 
    var height = Dimensions.get('window').height;

    async function getPlants() {
        try {
			let response = await fetch(`http://localhost:8080/users/plant-for-user`, {
				method: "POST",
				headers: {
                    "Content-Type": "application/json; charset=utf-8",
				},
				body: JSON.stringify({
                    authTokenHash: global.authTokenHash,
                    userName: global.userName,
				}),
			})
			.then((response) => {
				if (response.status == 400) {
					response.json().then((result) => {
						onChangeTitle(result.message);
					});
				}
				if (response.status == 200 || response.status == 201 || response.status == 202) {
					response.json().then((result) => {
						console.log(result);
					});
				}
			})
			
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
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
            <Card.Title
                style={styles.card}
                titleStyle={styles.cardText}
                subtitleStyle={styles.cardText}
                title="Card Title"
                subtitle="Card Subtitle"
                left={(props) => <Avatar.Image {...props} size={width * 0.18} style={styles.cardImage} source={require('snowdrop-client/assets/golden-pothos.png')} />}
                right={(props) => <IconButton {...props} icon="chevron-right" size={50} color={'#4E4E4E'} onPress={() => getPlants()} />}
            />
        </View>
	</ScrollView>
    <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => console.log('Pressed')}
    />
    <Appbar style={styles.bottom}>
        <Appbar.Action icon="home" color="#005500" size={width*0.09}/>
        <Appbar.Action icon="leaf" color="#EDEECB" size={width*0.09} style={{marginLeft: '9%'}}/>
        <Appbar.Action icon="account-supervisor" color="#005500" size={width*0.09} style={{marginLeft: '9%'}}/>
        <Appbar.Action icon="brightness-5" color="#005500" size={width*0.09} style={{marginLeft: '9%'}}/>
    </Appbar>
    </View>
)}
export default PlantsPage