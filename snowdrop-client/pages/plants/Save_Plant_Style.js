import { StyleSheet, Dimensions } from 'react-native';
import { PixelRatio } from "react-native";

const {
    width,
    height,
} = Dimensions.get("window");

const base_width = 414;
const base_height = 896;

function pxRD(px, cur_screen, base) {
    return Math.round(PixelRatio.roundToNearestPixel(cur_screen / base * px));
}

export default StyleSheet.create({
    page: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: "#EDEECB",
    },

    // Name text and text field
    nameText: {
        top: pxRD(50, height, base_height),
        width: pxRD(base_width, width, base_width),
        alignSelf: "center",
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Lato_400Regular",
        padding: 20,
    },
    nameTextField: {
        position: "absolute",
        alignSelf: "center",
        width: pxRD(344, width, base_width),
        height: pxRD(57, height, base_height),
        top: pxRD(230, height, base_height),
        backgroundColor: 'white',
        fontFamily: "Lato_400Regular"
    },
    nameTextLine: {
        position: "absolute",
        alignSelf: "center",
        width: pxRD(332, width, base_width),
        height: pxRD(2, height, base_height),
        backgroundColor: "#898C7B",
        top: pxRD(278, height, base_height),
    },

    // Weather
    weatherText: {
        top: pxRD(125, height, base_height),
        width: pxRD(base_width, width, base_width),
        alignSelf: "center",
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Lato_400Regular",
        padding: 20,
    },

    // Plant health
    plantHealthText: {
        top: pxRD(150, height, base_height),
        width: pxRD(base_width, width, base_width),
        alignSelf: "center",
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Lato_400Regular",
        padding: 20,
    },
    plantHealthInfoText: {
        top: pxRD(115, height, base_height),
        width: pxRD(base_width * 0.9, width, base_width),
        alignSelf: "center",
        textAlign: "center",
        fontFamily: "Lato_400Regular",
        padding: 20,
        fontSize: 16,
    },
    plantHealth: {
        top: pxRD(115, height, base_height),
        flexDirection: "row",
        alignSelf: "center",
        // backgroundColor: 'white',

    },
    icon: {
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 50,
        shadowColor: 'grey',
        shadowOpacity: 0.6,
        shadowOffset: {
            width: 0,
            height: 0
        },
    },

    submitButton: {
        top: pxRD(210, height, base_height),
        width: pxRD(base_width * 0.6, width, base_width),
        height: pxRD(base_height * 0.06, height, base_height),
        backgroundColor: '#82B47D',
        borderRadius: 25,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
        shadowColor: '#EDEECB',
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    submitButtonText: {
        justifyContent: 'center',
        color: 'white',
        fontFamily: "Lato_700Bold",
        fontSize: 20,
    },

    // Background Image styles
    cactusImage: {
        position: "absolute",
        resizeMode: "contain",
        height: pxRD(210, height, base_height),
        width: pxRD(180, width, base_width),
        top: pxRD(642, height, base_height),
        left: pxRD(-47, width, base_width),
    },
    monsteraImage: {
        position: "absolute",
        resizeMode: "contain",
        height: pxRD(199, height, base_height),
        width: pxRD(198, width, base_width),
        top: pxRD(642, height, base_height),
        left: pxRD(271, width, base_width),
    },
    philodendronImage: {
        position: "absolute",
        resizeMode: "contain",
        width: pxRD(98, width, base_width),
        height: pxRD(103, height, base_height),
        top: pxRD(732, height, base_height),
        left: pxRD(263, width, base_width),
    },
    leftLeafImage: {
        position: "absolute",
        resizeMode: "contain",
        width: pxRD(150, width, base_width),
        height: pxRD(150, height, base_height),
        top: pxRD(168, height, base_height),
        left: pxRD(-62, width, base_width),
    },
    rightLeafImage: {
        position: "absolute",
        resizeMode: "contain",
        width: pxRD(150, width, base_width),
        height: pxRD(150, height, base_height),
        top: pxRD(182, height, base_height),
        left: pxRD(320, width, base_width),
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
})