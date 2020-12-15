import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';

export default function Rastreio(props){

    console.log(props);
    return(
        <View>
            <Text> Esse é o componente Rastreio</Text>
            <Button title='Ir para login' onPress={() => props.navigation.navigate('Login')}/>
        </View>
    )
}