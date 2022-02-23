import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, Image, Dimensions, ImageBackground } from "react-native";
import { Appbar, Avatar, Card, FAB, IconButton, Provider, Dialog, Portal, Button } from 'react-native-paper';

import styles from './PlantDetailPageStyle.js';

const PlantDetailPage  = ({navigation}) => {
    var width = Dimensions.get('window').width; 
    var height = Dimensions.get('window').height;

    const [waterVisible, setWaterVisible] = React.useState(false);
    const [fertilizerVisible, setFertilizerVisible] = React.useState(false);
    const [healthVisible, setHealthVisible] = React.useState(false);

    const hideWater = () => setWaterVisible(false);
    const hideFertilizer = () => setFertilizerVisible(false);
    const hideHealth = () => setHealthVisible(false);

    const waterYes = () => {
        setWaterVisible(false);
        // add
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


	return (
    <Provider>
    <View style={styles.container}>
    <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white"/>
        <Appbar.Action icon="brightness-5" color="white" style={{marginLeft: 'auto'}}/>
    </Appbar.Header>
	<ScrollView style={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
        <Image style={styles.plantsImage} source={require('snowdrop-client/assets/plant-image.jpeg')}></Image>
        <View style={styles.upcomingView}>
            <Text style={styles.upcomingText}>Upcoming</Text>
            <View style={styles.cardList}>
                <Card mode="outlined" style={styles.card}>
                    <Card.Title
                        style={styles.cardTitle}
                        titleStyle={styles.cardText}
                        subtitleStyle={styles.cardText}
                        title="Water"
                        subtitle="Date"
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
        onPress={() => console.log('Pressed')}
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