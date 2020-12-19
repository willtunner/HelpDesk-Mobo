import React from 'react';
import { css } from '../css/css';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

export default function MenuAreaRestrita (props){
   
    async function logout(){
        // ? Limpa os dados do asyncstorage
        await AsyncStorage.clear();
        // ? Redireciona para tela de login
        props.navigation.navigate('Login');
    }

    return(
        
        <View style={css.areaMenu}>
            {/*  Botão Home */}
            <TouchableOpacity style={css.buttonHome2} onPress={ () => props.navigation.navigate('Home')}>
                 <Icon name="home" size={20} color="#999"/>
            </TouchableOpacity>
 
             {/* Titulo */}
            <Text style={css.areaTittle}>{props.title}</Text>
 
         {/* Botão logout     */}
         <TouchableOpacity style={css.buttonLogout} onPress={ () => logout()}>
                <Icon name="sign-out" size={20} color="#999"/>
         </TouchableOpacity>
        </View>
     )
}