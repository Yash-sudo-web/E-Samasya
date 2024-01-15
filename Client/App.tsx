import 'react-native-gesture-handler';
import * as React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SessionStorage from 'react-native-session-storage';

import HomeScreen from './Screens/home_screen';
import LoginScreen from './Screens/Login_screen'; // Updated component name to follow conventions
import Lets from './Screens/Lets';
import CreateScreen from './Screens/create_screen';
import ProfileScreen from './Screens/profile_screen';
import CopyProfileScreen from './Screens/copycreate_screen';
import CommentScreen from './Screens/comment_screen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppHome() {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === 'HomeTab') {
              iconName = focused
                ? require('./static/images/home.png')
                : require('./static/images/home-outline.png');
            } else if (route.name === 'CreateTab') {
              iconName = focused
                ? require('./static/images/add-fill.png')
                : require('./static/images/add-outline.png');
            }            
            else if(route.name === 'ProfileTab'){
              iconName = focused  
              ? require('./static/images/profile.png')
                : require('./static/images/profile-outline.png');
            }
            return (
              <Image source={iconName} style={{ height: 20, width: 20 }}/>
            );
          },
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#ffffff',
            height: 50,
            paddingBottom: 5,
          },
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeScreen} options={{tabBarLabel:'Home'}} />
        <Tab.Screen name="CreateTab" component={CreateScreen} options={{tabBarLabel:'Post'}}/>
        <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{tabBarLabel:'Profile'}}/>
      </Tab.Navigator>
    // </NavigationContainer>
  );
}


function AppContent() {
  const navigation = useNavigation();
  let initialRouteName = "Lets";
  React.useEffect(() => {
    if(SessionStorage.getItem("token")){
      console.log("token found");
      initialRouteName = "Home";
    }
  },[navigation]);
  return(
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Lets" component={Lets} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={AppHome} />
        <Stack.Screen name='thankyou' component={CopyProfileScreen}/>
        <Stack.Screen name='Details' component={CommentScreen}/>
      </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <AppContent/>
    </NavigationContainer>
  );
}
