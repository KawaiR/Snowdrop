import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Page_Create_Account from "./pages/Page_Create_Account/Page_Create_Account.js";
import Page_Sign_In from "./pages/Page_Sign_In/Page_Sign_In.js";
import Page_Password_Reset from "./pages/Page_Password_Reset/Page_Password_Reset.js";
import Page_Forgot_Password from "./pages/Page_Forgot_Password/Page_Forgot_Password.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Page_Sign_In" component={Page_Sign_In} />
        <Stack.Screen name="Page_Forgot_Password" component={Page_Forgot_Password} />
        <Stack.Screen name="Page_Create_Account" component={Page_Create_Account} />
        <Stack.Screen name="Page_Password_Reset" component={Page_Password_Reset} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
