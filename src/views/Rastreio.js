import React, { useState, useEffect } from 'react';
import { View, TextInput, Image } from 'react-native';
import { css } from '../../assets/css/css.js';

export default function Rastreio({navigation}){

    const [ code, setCode ] = useState(null);
    
    return(
        <View style={css.container3}>
             <Image 
                source = {require('../../assets/img/rastreio2.png')} 
                style={{height:150, width:150, marginBottom: 50}}
             />
            <TextInput
                placeholder  = 'Digite o código de rastreio:'
                onChangeText = {text => setCode(text)}
                style = {{backgroundColor: '#5A4D8C', height: 40, width: '80%', padding: 15, color: '#FFF'}} 
                placeholderTextColor = '#EBE5E5'
            />
            {/* <Button title='Ir para login' onPress={() => props.navigation.navigate('Login')}/> */}
        </View>
    )
}