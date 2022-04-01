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
    headerTitle: {
        alignSelf: "center",
        alignItems: "flex-start",
        fontSize: 24,
        fontFamily: "Lato_400Regular",
        color: "white",
    },
    post: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: width * 0.95,
        // height: height * 0.1060,
        borderRadius: 25,
        marginTop: height * 0.02,
    },
    postContent: {
        marginVertical: height * 0.015,
        marginHorizontal: height * 0.015,
        flex: 1,
    },
    postHeader: {
        flexDirection: 'row',
    },
    lineBreak: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: height * 0.01,
    },
    title: {
        fontSize: 32,
        letterSpacing: -0.24,
        fontWeight: '400',
        marginBottom: height * 0.01,
    },
    chip: {
        marginRight: height * 0.008,
    },
    postVotes: {
        marginVertical: height * 0.015,
        marginHorizontal: height * 0.015,
        flex: 1,
        flexDirection: 'row',
        // justifyContent: "center",
    },
    toggle: {
        borderRadius: 10,
        marginBottom: height * 0.01,
    },
    bottom: {
        justifyContent: 'center',
        backgroundColor: green,
        height: height * 0.078125,
    },
});