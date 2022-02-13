import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView} from "react-native";
import { Appbar } from 'react-native-paper';

import styles from './PlantsPageStyle.js';

const PlantsPage  = ({navigation}) => {

	return (
    <View>
    <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction/>
        <Appbar.Action icon="settings"/>
    </Appbar.Header>
        
	<ScrollView bounces={false} showsVerticalScrollIndicator={false}>
		<View>
            
        </View>
	</ScrollView>
    </View>
)}
export default PlantsPage