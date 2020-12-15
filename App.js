import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Login, Rastreio } from './src/views';


export default function App() {
  const Stack = createStackNavigator();

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
        {/* <Stack.Screen name="AreaRestrita" component={AreaRestrita} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}