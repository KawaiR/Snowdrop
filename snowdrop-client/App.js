import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import PlantsPage from "./assets/PlantsPage/PlantsPage.js"

export default function App() {
  return (
    <PlantsPage/>
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
