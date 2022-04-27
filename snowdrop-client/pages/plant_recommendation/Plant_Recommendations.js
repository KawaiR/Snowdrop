import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, PixelRatio } from 'react-native';
import { Appbar, Avatar, Card, IconButton } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useIsFocused } from "@react-navigation/native";
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';

const {
    width,
    height,
} = Dimensions.get("window");

const defaultW = 414;
const defaultH = 896;

function pxRD(px, cur_screen, base) {
    return Math.round(PixelRatio.roundToNearestPixel(cur_screen / base * px));
}

const Plant_Recommendations = ({ navigation }) => {
    const [expertise, setExpertise] = React.useState("");
    const [isExpertiseSet, setIsExpertiseSet] = React.useState(false);
    const [expertiseUrl, setExpertiseUrl] = React.useState();
    const [plantsList, setPlantsList] = React.useState([]);

    const isFocused = useIsFocused()
    useEffect(() => {
        if (isFocused) {
            getPlantRecommendations();
        }
    }, [isFocused, expertise]);

    let [fontsLoaded] = useFonts({
        Alata_400Regular,
        Lato_400Regular,
        Lato_700Bold,
    });
    if (!fontsLoaded) {
        return <AppLoading />
    }

    async function getPlantRecommendations() {
        try {
            let response = await fetch('https://quiet-reef-93741.herokuapp.com/plants/' + global.userName + '/get-recommendation', { method: 'GET' })
                .then((response) => {
                    if (response.status == 400) {
                        response.json().then((result) => {
                            console.log(result.message);
                        });
                    }
                    if (response.status == 200 || response.status == 201 || response.status == 202) {
                        response.json().then((result) => {
                            var items = result.toRecommend.filter(item => item.plantImage !== "general-tag" && item.plantImage !== "advice-tag");
                            setPlantsList(items);

                            setIsExpertiseSet(true);
                            setExpertise(result.expertiseLevel);

                            if (expertise === "Novice" || expertise === "Beginner") {
                                setExpertiseUrl("https://www.pngitem.com/pimgs/m/126-1266771_magnifying-glass-clipart-transparent-png-png-download.png");
                            } else if (expertise === "Expert" || expertise === "Advanced") {
                                setExpertiseUrl("https://thumbs.dreamstime.com/b/gold-medal-red-ribbon-vector-icon-flat-cartoon-golden-medallion-award-hanging-isolated-white-clipart-gold-medal-red-114163088.jpg");
                            } else if (expertise === "Intermediate" || expertise === "Enthusiast") {
                                setExpertiseUrl("https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png");
                            }
                        });
                    }
                });
        } catch (err) {
            console.log("Fetch didnt work.");
            console.log(err);
        }
    }

    function checkImage(url) {
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
        return false;
    }

    function checkAllImagesValidity() {
        for (let index = 0; index < plantsList.length; index++) {
            const element = plantsList[index];
            if (!checkImage(element.plantImage)) {
                element.plantImage = 'https://www.okumcmission.org/wp-content/uploads/2019/07/250-2503958_potted-plants-clipart-transparent-background-plant-logo-free.jpg';
            }
        }
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction color="white" onPress={() => navigation.navigate("Page_Plant")} />
                <Appbar.Content title={<Text style={styles.headerTitle}>Add Plant</Text>} style={styles.headerTitle} />
            </Appbar.Header>

            <ScrollView style={{ marginBottom: 65, }} bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.expertiseContainer}>
                    {isExpertiseSet &&
                        <View style={styles.rowContainer}>
                            <Text style={styles.expertiseText}>Your Expertise Level: {expertise}</Text>
                            <Avatar.Image
                                source={{ uri: expertiseUrl }}
                                size={width * 0.08}
                                style={styles.difficultyImage}
                            />
                        </View>}
                    {!isExpertiseSet &&
                        <Text style={styles.text}>Expertise not set yet, recommendations cannot be done at this time</Text>}
                    {isExpertiseSet && <Text style={styles.text}>Here's a list of plants you could grow based on your expertise level:</Text>}
                </View>

                <View>
                    {checkAllImagesValidity()}
                    {plantsList.length > 0 && plantsList.map((plant) =>
                        <Card.Title
                            key={plant.id}
                            style={styles.card}
                            titleStyle={styles.cardText}
                            subtitleStyle={styles.cardText}
                            title={(plant.plantName != null) ? plant.plantName : 'No common name'}
                            subtitle={(plant.difficulty === "B") ? "Difficulty: Beginner" : (plant.difficulty === "I" ? "Difficulty: Intermediate" : "Difficulty: Expert")}
                            left={(props) => <Avatar.Image {...props} size={height * 0.08} style={styles.cardImage} source={{ uri: plant.plantImage }} />}
                            right={(props) => <IconButton {...props} icon="plus" size={35} color={'#4E4E4E'} onPress={() => navigation.navigate("Save_Plant", { plantId: plant.id })} />}
                        />

                    )}
                    {plantsList.length == 0 && isExpertiseSet && 
                        <Text style={{ textAlign: "center", justifyContent: "center", color: "black", fontFamily: "Lato_400Regular", fontSize: 18, }}>No plants at this time.</Text>
                    }

                </View>
            </ScrollView>

            {/* Add navigation to bottom appbar */}
            {/* Bottom Nav bar */}
            <Appbar style={styles.bottom}>
                <Appbar.Action icon="home" color="#005500" size={Math.min(width * 0.09, height * 0.05)} />
                <Appbar.Action icon="leaf" color="#EDEECB" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
                <Appbar.Action icon="account-supervisor" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_PostList")} />
                <Appbar.Action icon="brightness-5" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => {if (global.googleID == undefined) { navigation.navigate("Page_Profile_Email_Account"); } else { navigation.navigate("Page_Profile_Google_Account"); }}}  />
            </Appbar>
        </View>
    );
}

export default Plant_Recommendations;

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

    // Containers
    container: {
        width: width,
        height: height,
        backgroundColor: "#EDEECB",
    },
    expertiseContainer: {
        width: width,
        // height: height * (150 / defaultH),
        alignItems: "center",
        backgroundColor: "#A8C1DD",
        borderBottomRightRadius: height * (150 / defaultH),
        borderBottomLeftRadius: height * (150 / defaultH),
        padding: 20,
        marginBottom: 30,
    },
    rowContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    // Expertise block
    difficultyImage: {
        width: width * 0.09,
        height: width * 0.09,
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
    },
    expertiseText: {
        color: "black",
        fontFamily: "Lato_400Regular",
        textAlignVertical: "center",
        textAlign: "center",
        maxWidth: width * 0.9,
        fontSize: 20,
        marginVertical: 10,
    },
    text: {
        color: "black",
        fontFamily: "Lato_400Regular",
        textAlignVertical: "center",
        textAlign: "center",
        maxWidth: width * 0.75,
        fontSize: 18,
        marginVertical: 10,
    },

    // Plants list
    card: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: width * 0.91787,
        height: height * 0.1060,
        borderRadius: 25,
        marginBottom: height * 11 / defaultH,
    },
    cardImage: {
        width: height * 0.08,
        height: height * 0.08,
        backgroundColor: 'white',
        borderRadius: 1000,
        borderColor: '#D3D3D3',
        borderWidth: 1,
    },
    cardText: {
        marginLeft: width * 0.07,
    },
}); 