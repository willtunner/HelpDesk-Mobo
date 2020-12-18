import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Login, Rastreio } from './src/views';
import AreaRestrita from './src/views/areaRestrita/AreaRestrita';
import AsyncStorage from '@react-native-community/async-storage';


export default function App() {
  const Stack = createStackNavigator();

  async function teste(){
    let resData  = await AsyncStorage.getItem('userData');
    // ? tem que converter de string para json
    console.log(JSON.parse(resData));
  }
  teste();

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