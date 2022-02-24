import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Plant_Search from './pages/plants/Plant_Search'
import Save_Plant from './pages/plants/Save_Plant'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Plant_Search" component={Plant_Search} /> */}
        <Stack.Screen name="Save_Plant" component={Save_Plant} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);