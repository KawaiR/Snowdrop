import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Plant_Search from './pages/plants/Plant_Search'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Plant_Search" component={Plant_Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}