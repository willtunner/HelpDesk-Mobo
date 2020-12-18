import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function AreaRestrita(){

    // ? Cria um state para usuario
    const [ user, setUser ] = useState(null);

    // ? Cria um useEffect para quando iniciar a tela ele pegar os dados salvos no asyncstorage
    useEffect( ()=> {
        // todo: Cria função para pegar usuario do asyncstorage 
        async function getUser(){
            // ? Pega os dados que vem do asyncstorage com nome de userData 
            let response = await AsyncStorage.getItem('userData');
            // ? Converte de para json
            let json = JSON.parse(response);
            // ? Seta no state o nome do usuario que veio do Objeto response
            setUser(json.user.name);
        }
        //todo: Chama a função
        getUser();

        //todo: Array vazio indica que ao iniciar a tela ele chama a função igual componentDidMounth
    },[]);
    
    return(
        <View>
            <Text> Esse é o componente AreaRestrita </Text>
            <Text> Seja bem vindo {user} </Text>
        </View>
    )
}