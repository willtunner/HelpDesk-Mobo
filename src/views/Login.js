import React, { useState, useEffect } from 'react';
import { Image, View, KeyboardAvoidingView, Text, Platform, Alert} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { css } from '../../assets/css/css';

export default function Login(){

    const [display, setDisplay] = useState('none');
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(null);

    //! Envio do formulário login
    async function sendForm(){
        let response =  await fetch('http://192.168.100.27:3000/sessions',{
        
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
        });
        let json = await response.json();
        console.log(json);

        if( json === 'error' ){
            setDisplay('flex');

            setTimeout( () => {
                setDisplay('none');
            }, 5000);
        }
    }

    return(
        //todo: KeyboardAvoidingView faz com que o teclado não sobreponha os inputs
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
               <TextInput style={css.loginInput} autoCapitalize='none'  autoCompleteType='email' onChangeText={ text => setEmail(text)} placeholder="Usuário"/>
               <TextInput style={css.loginInput} onChangeText={ text => setPassword(text)} placeholder="Senha" secureTextEntry={true}/>
               <TouchableOpacity style={css.loginButton} onPress={ () => sendForm()}>
                   <Text style={css.loginButtonText}>Entrar</Text>
               </TouchableOpacity>
            </View>
       </KeyboardAvoidingView>
    )
}