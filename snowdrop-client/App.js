import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';

import Location_Permission from "./pages/location/Location_Permission.js"; 
import Plant_Search from './pages/plants/Plant_Search.js'
import Save_Plant from './pages/plants/Save_Plant.js'
import PlantsPage from "./pages/PlantsPage/PlantsPage.js"
import PlantDetailPage from "./pages/PlantDetailPage/PlantDetailPage.js"
import Page_Sign_In from "./pages/auth/Page_Sign_In.js";
import Page_Create_Account from "./pages/auth/Page_Create_Account.js";
import Page_Create_Google_Username from "./pages/auth/Page_Create_Google_Username.js";
import Page_Forgot_Password from "./pages/auth/Page_Forgot_Password.js";
import Page_Change_Password from "./pages/auth/Page_Change_Password";
import Page_Password_Reset from "./pages/auth/Page_Password_Reset.js";
import Page_Profile_Google_Account from "./pages/profile/Page_Profile_Google_Account.js"; 
import Page_Profile_Email_Account from "./pages/profile/Page_Profile_Email_Account.js"; 
import Page_Change_Email from './pages/auth/Page_Change_Email.js';
import Page_Email_Reset from './pages/auth/Page_Email_Reset.js';
import Write_Post from './pages/write_posts/Write_Post.js';
import IndPostPage from './pages/IndPostPage/IndPostPage.js';
import PostListPage from './pages/PostListPage/PostListPage.js';
import Plant_Care_Recommendation from './pages/plantCare/Plant_Care_Recommendation.js';
import Plant_Edit from './pages/plants/Plant_Edit.js';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Page_PostList" component={PostListPage} /> */}
        {/* <Stack.Screen name="Page_IndPost" component={IndPostPage} /> */}
        {/* <Stack.Screen name="Page_PostList" component={PostListPage} /> */}
        <Stack.Screen name="Page_Sign_In" component={Page_Sign_In} />
        <Stack.Screen name="Page_Create_Account" component={Page_Create_Account} />
        <Stack.Screen name="Location_Permission" component={Location_Permission} />
        <Stack.Screen name="Page_Profile_Email_Account" component={Page_Profile_Email_Account} />
        <Stack.Screen name="Page_Forgot_Password" component={Page_Forgot_Password} />
        <Stack.Screen name="Page_Change_Password" component={Page_Change_Password} />
        <Stack.Screen name="Page_Change_Email" component={Page_Change_Email} />
        <Stack.Screen name="Page_Password_Reset" component={Page_Password_Reset} />
        <Stack.Screen name="Page_Email_Reset" component={Page_Email_Reset} />
        <Stack.Screen name="Page_Create_Google_Username" component={Page_Create_Google_Username} />
        <Stack.Screen name="Page_Profile_Google_Account" component={Page_Profile_Google_Account} />
        <Stack.Screen name="Page_PlantDetail" component={PlantDetailPage} />
        <Stack.Screen name="Plant_Care_Recommendation" component={Plant_Care_Recommendation} />
        <Stack.Screen name="Page_Plant" component={PlantsPage} />
        <Stack.Screen name="Plant_Search" component={Plant_Search} />
        <Stack.Screen name="Save_Plant" component={Save_Plant} />
        <Stack.Screen name="Write_Post" component={Write_Post} />
        <Stack.Screen name="Page_PostList" component={PostListPage} />
        <Stack.Screen name="Page_IndPost" component={IndPostPage} />
        <Stack.Screen name="Plant_Edit" component={Plant_Edit} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
