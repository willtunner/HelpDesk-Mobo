import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Login, Rastreio } from './src/views';
import AreaRestrita from './src/views/areaRestrita/AreaRestrita';
import AsyncStorage from '@react-native-community/async-storage';
// % Push Notifications
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
//import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications';
import config from './src/config/config.json';


export default function App() {
  const Stack = createStackNavigator();
  const [expoPushToken, setExpoPushToken] = useState(null);

  useEffect( () => {
    registerForPushNotificationsAsync();
  },[]);

  useEffect( () => {
    if(expoPushToken !== null){
      sendToken();
    }
  },[expoPushToken])

  //todo: Registra tokken do usuario
  async function registerForPushNotificationsAsync() {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      //console.log(token.data);
      setExpoPushToken(token.data);
      
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
    };

    // ? Envio do token
    async function sendToken()
    {
      let response = await fetch(config.urlRoot + 'token',{
        method: 'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        token: expoPushToken
        })
      })
    }

  async function teste(){
    let resData  = await AsyncStorage.getItem('userData');
    // ? tem que converter de string para json
    console.log(JSON.parse(resData));
  }
  //teste();

  return (
   <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            title: "HelpDesk",
            headerStyle: {backgroundColor: '#F58634'},
            headerTintColor: '#333',
            headerTitleStyle: {fontWeight: 'bold', alignSelf: 'center'}
          }}
          />

        <Stack.Screen 
        name="Login" 
        options={{headerShown: false}} 
        component={Login} />

        <Stack.Screen name="Rastreio" component={Rastreio} />
        <Stack.Screen name="AreaRestrita" options={{headerShown: false}}  component={AreaRestrita} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}