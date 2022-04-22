import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

const Location_Permission  = ({navigation}) => {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	let text = 'Waiting..';
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.paragraph}>{text}</Text>
			<TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Home"); } }  >
				<Text style={styles.buttonText}   >
					Done
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default Location_Permission;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		backgroundColor: '#EDEECB',
	},
	paragraph: {
		fontSize: 18,
		textAlign: 'center',
		marginBottom: 20,
	},
	button: {
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 15,
		backgroundColor: "#A4C400",
		padding: 10,
	},
	buttonText: {
		fontSize: 20,
		paddingRight: 30,
		paddingLeft: 30,
		fontWeight: "600",
		textAlign: "center",
		color: "white",
	}
}); 