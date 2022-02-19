import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Location_Permission from "./pages/location/Location_Permission.js"; 
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Location_Permission" component={Location_Permission} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
