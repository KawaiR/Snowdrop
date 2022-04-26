import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

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
        height: height * 0.078125, // 70/defaultH
    },
    ovalBg:{
        alignSelf: 'center',
        width: width / 4,
        height: height * 0.234374, // 210/defaultH
        backgroundColor: blue,
        borderBottomLeftRadius: 90,
        borderBottomRightRadius: 90,
        transform: [{ scaleX: 4 }],
    },
    plantsView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scaleX: 1/4 }],
    },
    plantsText: {
        justifyContent: 'flex-start',
        color: 'white',
        fontSize: 36,
        letterSpacing: -0.24,
        fontWeight: '500',
    },
    plantsImage: {
        //justifyContent: 'flex-end',
        //marginLeft: width * 0.1,
        width: width * 0.6,
        height: width * 0.6,
    },
    recommendButton: {
        height: pxRD(defaultH * 0.06, height, defaultH),
        backgroundColor: '#82B47D',
        borderRadius: 25,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal: 20,
        marginTop: height * 0.025,
        // marginBottom: 10,
        shadowColor: 'grey',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    recommendText: {
        justifyContent: 'center',
        color: 'white',
        fontFamily: "Lato_700Bold",
        fontSize: 19,
    },
    cardList: {
        marginVertical: height * 0.025,
    },
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