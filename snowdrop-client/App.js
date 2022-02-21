import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import PlantsPage from "./assets/PlantsPage/PlantsPage.js"
import PlantDetailPage from "./assets/PlantDetailPage/PlantDetailPage.js"

export default function App() {
  return (
    <PlantDetailPage/>
    //<PlantsPage/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
