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
    safeAreaContainer: {
        flex: 1,
        paddingBottom: 80,
        borderBottomColor: 'grey',
    },
    container: {
        width: width,
        height: height,
        backgroundColor: backgroundcolor,
    },
    appbar: {
        width: width,
        backgroundColor: green,
        flexDirection: "row",
        height: height * 0.078125, // 70/defaultH
    },
    itemContainer: {
        flexDirection: "row",
        padding: 12,
        alignItems: "center",
    },
    itemImage: {
        width: width * 0.12,
        height: width * 0.12,
        backgroundColor: 'white',
        borderColor: '#D3D3D3',
        borderWidth: 1,
        marginRight: 16,
    },
    textContainer: {
        flexDirection: "column",
    },
    itemName: {
        marginLeft: width * 0.07,
        fontSize: 16,
        fontFamily: "Lato_400Regular",
    },
    itemScientific: {
        marginLeft: width * 0.07,
        fontSize: 12,
        fontFamily: 'Lato_400Regular',
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'grey',
    },
    searchContainer: {
        backgroundColor: '#82B47D',
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
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