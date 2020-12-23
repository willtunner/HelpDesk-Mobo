import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MenuAreaRestrita from '../../../assets/components/MenuAreaRestrita';
import config from '../../config/config.json';
import {css} from '../../../assets/css/css';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function Cadastro({navigation}){

    //todo: Parte que vai ser cadastrada no banco
    const address = config.origin;
    const [code, setCode] = useState(null);
    const [user, setUser] = useState(null);
    const [product, setProduct] = useState(null);
    const [response, setResponse] = useState(null);
    const [token, setToken] = useState(null);

    //Pega o id assim que entra na tela
    useEffect(()=>{
        getUser();
        console.log(token);
    },[]);

    //Gera o cod assim que abre a tela
    useEffect(()=>{
        randomCode();
        setProduct(null);
    },[response]); // ? Toda vez que o response for alterado muda imagem do qrCode

    //Pega id do usuario
    async function getUser()
    {
        let response=await AsyncStorage.getItem('userData');
        let json = JSON.parse(response);
        
        setUser(json.user.id);
        setToken(json.token);
    }

    //Gerar um código randômico
    async function randomCode()
    {
        let result = '';
        let length=20;
        let chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        setCode(result);
    }

    //Envio do formulário
    async function sendForm()
    {
        let response=await fetch(config.urlRoot+'tracking',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                user_id: user,
                code: code,
                product: product,
                local: address
            })
        });

        // Todo: Recebe do backend a informação
        let json = await response.json();
        setResponse(json);
        console.log(token);
    }

    // Todo: Compartilhar o QRCode
    async function shareQR(){
            const image=config.urlRoot+'img/code.png';
            FileSystem.downloadAsync(
                image,
                FileSystem.documentDirectory+'.png'
            ).then(({uri})=>{
                Sharing.shareAsync(uri);
            });
            await Sharing.shareAsync();
    }


    return(
        <View style={[css.container, css.containerTop]}>
            <MenuAreaRestrita title="Cadatro" navigation={navigation}/>

             {/* Se tiver o response exibe a imagem */}
            {
                response && (
                    <View>
                        <Image source={{uri: response, height: 180, width: 180}} />
                        <Button title='Compartilhar' onPress={ ()=> shareQR()}/>
                    </View>    
                )
            }

            <View style={css.loginInput}> 
                <Text style={{marginBottom: 30}}>
                    {address}
                    {user}
                    {product}
                    {code}
                </Text>
            </View>

            <TextInput style={css.loginInput} placeholder='Nome do produto:' onChangeText={text => setProduct(text)} value={product}/>

            <TouchableOpacity style={css.loginButton} onPress={ () => sendForm()}>
                <Text>Cadastrar</Text>
            </TouchableOpacity>

            <Text style={{color: 'red'}}>{token}</Text>
        </View>
    )
}