import { StyleSheet, Dimensions, PixelRatio } from 'react-native'; 
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;

var defaultW = 414;
var defaultH = 896;

var backgroundcolor = '#EDEECB';
var textcolor = '#2e2b36';
var green = '#82B47D';
var blue = '#A8C1DD';

function pxRD(px, cur_screen, base) {
    return Math.round(PixelRatio.roundToNearestPixel(cur_screen / base * px));
}

export default StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: backgroundcolor,
    },
    scroll: {
        backgroundColor: backgroundcolor,
    },
    appbar: {
        width: width,
        backgroundColor: green,
        flexDirection: "row",
        height: height * 0.078125,
    },
    plantNameContent: {
        backgroundColor: '#82B47D',
        paddingVertical: height * 0.01,
        borderRadius: 10,
    },
    plantNameView: {
        //width: width,
        height: '93%',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        //paddingHorizontal: width * 0.1,
    },
    plantNameText: {
        //justifyContent: 'flex-end',
        backgroundColor: '#82B47D',
        color: "white",
        textAlign: 'center',
        paddingHorizontal: width * 0.05,
        fontFamily: "Lato_400Regular",
        fontSize: 16,
        letterSpacing: -0.24,
        //paddingVertical: height * 0.0,
    },
    plantsText: {
        justifyContent: 'flex-start',
        color: 'white',
        fontSize: 36,
        fontFamily: "Lato_400Regular",
        letterSpacing: -0.24,
        fontWeight: '500',
    },
    plantsImage: {
        marginBottom: height * 0.03,
        alignSelf: 'center',
        width: width,
        height: height * (430 / defaultH - .078125), // 210/defaultH
        borderBottomLeftRadius: 90,
        borderBottomRightRadius: 90,
    },
    upcomingView: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: width * 390 / defaultW,
        borderRadius: 15,
        marginBottom: height * 27 / defaultH,
    },
    upcomingText: {
        fontSize: 24,
        fontWeight: '500',
        fontFamily: "Lato_400Regular",
        marginLeft: width * 15 / defaultW,
        marginTop: height * 20 / defaultH,
        marginBottom: height * 22 / defaultH,
    },
    cardList: {
        //marginBottom: height * 0.05,
    },
    card: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: width * 0.91787,
        height: height * 0.1060,
        borderRadius: 25,
        marginBottom: height * 5 / defaultH,
    },
    cardTitle: {
        justifyContent: 'center',
        fontFamily: "Lato_400Regular",
        flex: 1,
    },
    cardLeft: {
        //marginHorizontal: 500,
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
    toggle: {
        alignSelf: 'center',
        marginTop: height * 0.02,
    },
    plantCareButton: {
        height: pxRD(defaultH * 0.06, height, defaultH),
        backgroundColor: '#82B47D',
        borderRadius: 25,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
        marginBottom: 15,
        shadowColor: '#EDEECB',
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    plantCareText: {
        justifyContent: 'center',
        color: 'white',
        fontFamily: "Lato_700Bold",
        fontSize: 18,
    },
    fab: {
        position: 'absolute',
        //width: width * 0.1449,
        //height: width * 0.1449,
        marginBottom: height * 0.1,
        marginRight: height * 0.02,
        right: 0,
        bottom: 0,
        backgroundColor: green,
    },
    bottom: {
        justifyContent: 'center',
        backgroundColor: green,
        height: height * 0.078125,
    },
});