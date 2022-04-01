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
        flex: 1,
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
    noPostText: {
        fontSize: 18,
        justifyContent: 'center',
		textAlign: 'center',
		marginBottom: 20,
	},
    post: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: width * 0.95,
        // height: height * 0.1060,
        borderRadius: 25,
        margin: height * 0.01,
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
        fontSize: 22,
        letterSpacing: -0.24,
        fontWeight: '400',
        marginBottom: height * 0.007,
    },
    tagButton: {
        backgroundColor: '#82B47D',
        borderRadius: 25,
        alignItems: "center",
        alignSelf: 'flex-start',
        padding: 5,
        paddingHorizontal: 15,
        margin: 10,
        marginLeft: 0,
        shadowColor: '#EDEECB',
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    tagText: {
        justifyContent: 'center',
        color: 'white',
        fontFamily: "Lato_400Regular",
        fontSize: 16,
    },
    voteRowStyle: {
        flexDirection: 'row',
        marginTop: height * 0.01,
    },
    chip: {
        marginRight: height * 0.015,
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