import React, { useState, useEffect } from 'react';
import { Image, View, KeyboardAvoidingView, Text, Platform} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { css } from '../../assets/css/css';

export default function Login(){

    const [display, setDisplay] = useState('none');

    return(
        <KeyboardAvoidingView 
        //? Se for ios usa o padding se não usa o heigh
        behavior={Platform.OS == "ios" ? "padding" : "height"} 
        style={[css.container, css.darkbg]}>
            {/* 
                //todo: Logo
            */}
            <View style={css.logo}>
                <Image source = {require('../../assets/img/logo.png')} />
            </View>

            {/* 
                //todo: Msg de erro
            */}
            <View> 
                <Text style={css.loginMsg(display)}>Usuário ou senha inválidos</Text>
            </View>

            {/* 
                //todo: Formulário
            */}
            <View style={css.loginForm}>
               <TextInput style={css.loginInput} placeholder="Usuário"/>
               <TextInput style={css.loginInput} placeholder="Senha" secureTextEntry={true}/>
               <TouchableOpacity style={css.loginButton} onPress={ () => setDisplay('flex')}>
                   <Text style={css.loginButtonText}>Entrar</Text>
               </TouchableOpacity>
            </View>
       </KeyboardAvoidingView>
    )
}