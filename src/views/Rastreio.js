import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { css } from '../../assets/css/css.js';
import config from '../config/config.json';

export default function Rastreio({navigation}){

    const [ code, setCode ] = useState(null);

    // ? Envia os dados do formulário
    async function sendForm(){
        let response = await fetch(config.urlRoot + 'rastreio', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code
            })
        });
    }
    
    return(
        <View style={css.container3}>
             <Image 
                source = {require('../../assets/img/rastreio2.png')} 
                style={css.logoRastreio}
             />
            <TextInput
                placeholder  = 'Digite o código de rastreio:'
                onChangeText = {text => setCode(text)}
                style = {css.inputRastreio} 
                placeholderTextColor = '#EBE5E5'
            />

            <TouchableOpacity style={css.btnRastreio}>
                <Text style={css.txtBtnRastreio}>Rastrear</Text>
            </TouchableOpacity>

            {/* <Button title='Ir para login' onPress={() => props.navigation.navigate('Login')}/> */}
        </View>
    )
}