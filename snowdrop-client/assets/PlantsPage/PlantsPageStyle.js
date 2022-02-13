import { StyleSheet, Dimensions } from 'react-native';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height; 

var backgroundcolor = '#F2EBED';
var textcolor = '#2e2b36';
var green = '#82B47D';
var lightcolor = '#3F3F37';

export default StyleSheet.create({
    container: {
        width: width,
        height: height,
        alignItems: 'center',
        backgroundColor: backgroundcolor,
    },
    appbar: {
        width: width,
        backgroundColor: green,
    }

});