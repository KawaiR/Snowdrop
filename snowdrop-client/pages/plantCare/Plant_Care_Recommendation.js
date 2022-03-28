import React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
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
    // const { plant, id } = route.params;

    let [fontsLoaded] = useFonts({
        Alata_400Regular,
        Lato_400Regular,
        Lato_700Bold,
    });
    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction color="white" onPress={() => navigation.navigate("Page_PlantDetail", {plant: plant, id: plant.id} )} />
                <Appbar.Content title={<Text style={styles.headerTitle}>Recommendations</Text>} style={styles.headerTitle} />
            </Appbar.Header>
            <ScrollView style={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.plantContainer}>
                    <Image style={styles.plantImage} source={require('snowdrop-client/assets/plant-image.jpeg')}></Image>
                    <View style={styles.plantNameView}>
                        <View style={styles.plantNameContent}>
                            {/* <Text style={styles.plantNameText}>{commonName}</Text> */}
                            <Text style={styles.plantNameText}>Common Name</Text>
                            {/* <Text style={styles.plantNameText}>{scientificName}</Text> */}
                            <Text style={styles.plantNameText}>Scientific Name</Text>
                            {/* <Text style={styles.plantNameText}>{upcomingWatered}</Text> */}
                            <Text style={styles.plantNameText}>Upcoming watered</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.paragraph}>Some text goes here</Text>
            </ScrollView>
            {/* Add navigation to bottom appbar */}
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

    // Remove paragraph style
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
        margin: 20,
        fontFamily: "Lato_400Regular",
    },

    
}); 