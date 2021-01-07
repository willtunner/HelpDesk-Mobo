import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { css } from '../../assets/css/css.js';

export default function Rastreio(props){

    console.log(props);
    return(
        <View style={css.container}>
            <Text> Esse é o componente Rastreio</Text>
            <Button title='Ir para login' onPress={() => props.navigation.navigate('Login')}/>
        </View>
    )
}