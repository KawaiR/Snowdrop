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
    cardList: {
        marginVertical: height * 0.05,
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
        width: width * 0.18,
        height: width * 0.18,
        backgroundColor: 'white',
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
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});