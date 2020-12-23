import React, { useState, useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Profile, Cadastro, Edicao } from '../index';
import Icon from '@expo/vector-icons/FontAwesome';
import {css} from '../../../assets/css/css';

export default function AreaRestrita({navigation}){

    // ? Para o tab navigator
    const Tab = createMaterialBottomTabNavigator();

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

    //todo: parte do Backhandle, botão voltar sai do app(android)
    useEffect( () => {
        const backAction = () => {
            Alert.alert("Alerta!", "Você quer sair do app?!",[
                {
                    text: "Não",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Sim", onPress: () => {
                    navigation.navigate('Home');
                    BackHandler.exitApp();
                 }}
            ]);
            return true;
        };

       const backHandler = BackHandler.addEventListener(
           "hardwareBackPress",
           backAction
       );

       return () => backHandler.remove();

    },[]);
    
    return(
        <Tab.Navigator
            activeColor = '#fff'
            inactiveColor = '#fff'
            barStyle={css.areaTab}
        >
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{
                    tabBarIcon:() => (
                        <Icon name="users" size={20} color="#999" />
                    )
                }}
                />
            <Tab.Screen 
            name="Cadastro" 
            component={Cadastro} 
            options={{
                tabBarIcon: () => (
                    <Icon name="archive" size={20} color="#999"/>
                )
            }}
            />
            <Tab.Screen 
            name="Edicao" 
            component={Edicao} 
            options={{
                tabBarIcon: () => (
                    <Icon name="edit" size={20} color="#999"/>
                )
            }}
            />
        </Tab.Navigator>
    )
}