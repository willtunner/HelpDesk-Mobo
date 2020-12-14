import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';

export default function Home(props){

    console.log(props);
    return(
        <View>
            <Text> Esse é o componente Home</Text>
            <Button title='Ir para login' onPress={() => props.navigation.navigate('Login', {id: 34})}/>
        </View>
    )
}