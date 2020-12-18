import AsyncStorage from '@react-native-community/async-storage';
//% LocalAuthentication: import da biometria
import * as LocalAuthentication from 'expo-local-authentication';
import React, { useState, useEffect } from 'react';
import { Image, View, KeyboardAvoidingView, Text, Platform, Alert} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { css } from '../../assets/css/css';

export default function Login({navigation}){

    const [display, setDisplay] = useState('none');
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(false);

    // ? useEffect para efetivar assim que entrar na tela
    useEffect( ()=> {
        verifyLogin();
    },[]);

    // ? Verifica se tiver login chama biometria
    useEffect( () => {
        if(login === true ){
            biometric();
        }
        //? se tiver alteração no login
    },[login]);

    //! Verifica se o usúario já possui algum login
    async function verifyLogin(){
        let response = await AsyncStorage.getItem('userData');
        let json = JSON.parse(response);
        
        if( json !== null ){
            // ? seta o state do email
            setEmail(json.user.email);
            // ? seta o state do password
            setPassword(json.user.password);
            // ? seta o state do login
            setLogin(true);
        } 
    }
    
    //! Função da biometria
     async function biometric(){
        //todo: hasHardwareAsync - Verifica se é compativel com a biometria
        let compatible = await LocalAuthentication.hasHardwareAsync();

        if(compatible){
            //todo: isEnrolledAsync - verifica se tem biometrias cadastradas
            let biometricRecords = await LocalAuthentication.isEnrolledAsync();

            // ? Se não existir biometrias cadastradas  
            if( !biometricRecords ){
                alert(' Biometria não cadastrada ');
            }else{
                // ? Se tiver biometria cadastrada
                //todo: authenticateAsync - valida se a senha bate com o dedo do usuario
                let result = await LocalAuthentication.authenticateAsync();

                if(result.success){
                    sendForm();
                    //% Gambiarra
                    //navigation.navigate('AreaRestrita');
                    //console.log('deu certo!')
                }else{
                    setEmail(null);
                    setPassword(null);
                }
            }
        }
    }

    //! Função para enviar o formulário
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

        // ? Caso de error 
        if( json === 'error' ){
            // ? exibe msg em vermelho
            setDisplay('flex');
            // ? Depois de 5s some a mensagem
            setTimeout( () => {
                setDisplay('none');
            }, 3000);
            // ? se errar a senha limpa o storage
            await AsyncStorage.clear();
        }else{
            // ? se der certo seta um item
            // ? Nome do storage: 'userData',
            // ? Dados que passa pra ele de string para json 'JSON.stringify(json)'
            await AsyncStorage.setItem('userData', JSON.stringify(json));
            
            // ? envia para areaRestrita
            navigation.navigate('AreaRestrita');
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
               <TextInput style={css.loginInput} autoCapitalize='none' value={email}  autoCompleteType='email' onChangeText={ text => setEmail(text)} placeholder="Usuário"/>
               <TextInput style={css.loginInput} onChangeText={ text => setPassword(text)} placeholder="Senha" secureTextEntry={true}/>
               <TouchableOpacity style={css.loginButton} onPress={ () => sendForm()}>
                   <Text style={css.loginButtonText}>Entrar</Text>
               </TouchableOpacity>
            </View>
       </KeyboardAvoidingView>
    )
}