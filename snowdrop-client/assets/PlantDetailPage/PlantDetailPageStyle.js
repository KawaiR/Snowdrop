import { StyleSheet, Dimensions } from 'react-native';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;

var defaultW = 414;
var defaultH = 896;

var backgroundcolor = '#EDEECB';
var textcolor = '#2e2b36';
var green = '#82B47D';
var blue = '#A8C1DD';

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
    ovalBg:{
        alignSelf: 'center',
        width: width / 4,
        height: height * (430 / defaultH - .078125), // 210/defaultH
        //backgroundColor: blue,
        borderBottomLeftRadius: 90,
        borderBottomRightRadius: 90,
        marginBottom: height * 0.03,
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
        // width: width * 0.6,
        // height: width * 0.6,
        // width: '400%',
        // height: undefined,
        // aspectRatio: 1,
        // resizeMode: 'cover',
        alignSelf: 'center',
        width: width,
        height: height * (430 / defaultH - .078125), // 210/defaultH
        //backgroundColor: blue,
        borderBottomLeftRadius: 90,
        borderBottomRightRadius: 90,
        //transform: [{ scaleX: 4 }],
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
        marginBottom: height * 11 / defaultH,
    },
    cardTitle: {
        justifyContent: 'center',
        flex: 1,
    },
    cardLeft: {
        //marginHorizontal: 500,
    },
    cardText: {
        marginLeft: width * 0.06,
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
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});