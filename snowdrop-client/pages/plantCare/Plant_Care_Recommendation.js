import React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';

const {
    width,
    height,
} = Dimensions.get("window");

const Plant_Care_Recommendation = ({ route, navigation }) => {

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
                <Appbar.BackAction color="white" onPress={() => navigation.navigate("Page_PlantDetail")} />
                <Appbar.Content title={<Text style={styles.headerTitle}>Recommendations</Text>} style={styles.headerTitle} />
            </Appbar.Header>
            <ScrollView style={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EDEECB',
    },
    // Appbar styles
    appbar: {
        width: width,
        backgroundColor: '#82B47D',
        flexDirection: "row",
        height: height * 0.078125, // 70/defaultH
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
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
        margin: 20,
    },
    headerTitle: {
        alignSelf: "center",
        alignItems: "flex-start",
        fontSize: 24,
        fontFamily: "Lato_400Regular",
        color: "white",
    },
}); 