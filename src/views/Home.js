import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {css} from '../../assets/css/css';

export default function Home({navigation}){

    return(
        <View style={css.container2}>
            {/* Login */}
            <TouchableOpacity 
            style={css.buttonHome}
            title='Ir para login' 
            onPress={() => navigation.navigate('Login')}>
                <Image source = {require('../../assets/img/login.png')} />
            </TouchableOpacity>

            {/* Rastreio */}
            <TouchableOpacity 
            title='Ir para login' 
            onPress={() => navigation.navigate('Login')}>
                <Image source = {require('../../assets/img/rastreio.png')} style={{height: 100, width: 100}} />
            </TouchableOpacity>
        </View>
    )
}