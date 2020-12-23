import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView,KeyboardAvoidingView} from 'react-native';
import { css } from '../../../assets/css/css';
import MenuAreaRestrita from '../../../assets/components/MenuAreaRestrita';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../config/config';

export default function Profile({navigation}){

    // ! Cria estados para Atualizar Perfil de usuario
    //todo Id do usuario
    const [ idUser, setIdUser ] = useState(null);

    const [ photo, setPhoto ] = useState(null);

    //todo Dados do usuario
    const [ name, setName ] = useState(null);
    const [ userName, setUserName ] = useState(null);
    const [ token, setToken ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ phone, setPhone ] = useState(null);
    const [ permission, setPermission ] = useState(null);

    //todo localização do usuario
    const [ longitude, setLongitude] = useState(null);
    const [ latitude, setLatitude ] = useState(null);

    //todo Valida senha usuario
    const [ senhaAntiga, setSenhaAntiga ] = useState(null);
    const [ novaSenha, setNovaSenha ] = useState(null);
    const [ confNovaSenha, setConfNovaSenha ] = useState(null);
    const [ msg, setMsg ] = useState(null);

    useEffect( () => {
        async function getIdUser(){
            let response = await AsyncStorage.getItem('userData');
            let json = JSON.parse(response);
            console.log('===============================================');
            console.log(json);
            console.log(json.user.id);

            //? Seta o id do usuario logado no async para o state
            setIdUser(json.user.id);
            // setName(json.user.name);
            // setUserName(json.user.user_name);
            setEmail(json.user.email);
            // setPhone(json.user.phone);
            // setToken(json.user.token)
        }
        getIdUser();
    });

    //! Função para enviar o formilário
         async function sendForm(){
             let response = await fetch(`${config.urlRoot}users/${idUser}`,{
                 method: 'PUT',
                 body: JSON.stringify({
                     id: idUser,
                     name: name,
                     user_name: userName,
                     email: email,
                     phone: phone,
                     permission: permission,
                     longitude: longitude,
                     latitude: latitude,
                     oldPassword: senhaAntiga,
                     password: novaSenha,
                     confPassword: confNovaSenha
                 }),
                 headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  }
             });
             
             let json = await response.json();
             setMsg(json);
         }

         
    return(
        <>
        <Text style={{color: '#FFF'}}>{msg}</Text>
        <KeyboardAvoidingView //? Se for ios usa o padding se não usa o heigh
            behavior={Platform.OS == "ios" ? "padding" : "height"} 
            style={[css.container, css.darkbg]}>

        <MenuAreaRestrita title="Perfil" navigation={navigation}/>
        
        <View style={css.loginForm}>
                    <ScrollView style={{marginBottom:100}}>
                            {/* PARTE DO PERFIL */}
                            <TextInput style={css.loginInput} placeholder="Nome" onChangeText={ text => setName(text)} />
                            <TextInput style={css.loginInput} placeholder="User Name" onChangeText={ text => setUserName(text)} />
                            <TextInput style={css.loginInput} placeholder="Email" onChangeText={ text => setEmail(text)} />
                            <TextInput style={css.loginInput} placeholder="Telefone" onChangeText={ text => setPhone(text)} />
                            <TextInput style={css.loginInput} placeholder="Permissão" onChangeText={ text => setPermission(text)} />
                            <TextInput style={css.loginInput} placeholder="Longitude" onChangeText={ text => setLongitude(text)} />
                            <TextInput style={css.loginInput} placeholder="Latitude" onChangeText={ text => setLatitude(text)} />

                            {/* PARTE DA SENHA */}
                            <TextInput style={css.loginInput} placeholder="Senha antiga" onChangeText={ text => setSenhaAntiga(text)} />
                            <TextInput style={css.loginInput} placeholder="Nova senha"  onChangeText={ text => setNovaSenha(text)}/>
                            <TextInput style={css.loginInput} placeholder="Confirma nova senha"  onChangeText={ text => setConfNovaSenha(text)}/>

                            <TouchableOpacity style={css.loginButton} onPress={ () => sendForm()}>
                                <Text style={css.loginButtonText}>Trocar</Text>
                            </TouchableOpacity>
                    </ScrollView>
                </View>
                    </KeyboardAvoidingView>
                    </>
    );
}