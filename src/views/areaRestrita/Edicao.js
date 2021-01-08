import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import MenuAreaRestrita from '../../../assets/components/MenuAreaRestrita';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { css } from '../../../assets/css/css';
import config from '../../config/config.json';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

export default function Edicao({navigation}){

    //todo: States de permissão para scanner
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    // ? flex: aparece para o usuario depois que escaneia muda para none
    const [displayQr, setDisplayQr] = useState('flex');
    // ? Começa como none pois aparece somente depois na tela
    const [displayForm, setDisplayForm] = useState('none');
    const [code, setCode] = useState(null);
    const [product, setProduct] = useState(null);
    const [localization, setLocalization] = useState(null);
    // ? Resposta de sucesso do backend ao atualizar
    const [response, setResponse] = useState(null);

    //todo: use effect para geolocalização
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            
          })();
    }, [])

    //todo: use effect para perguntar se pode usar a camera
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

    //todo: Msg que aparece na tela, 'data' vem do banco de dados
    async function handleBarCodeScanned ({ type, data }) {
        setScanned(true);
        //? faz sumir a camera depois que scaneia
        setDisplayQr('none');
        setDisplayForm('flex');
        setCode(data);
        await searchProduct(data);
        await getLocation();
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      };

    //todo: Função para buscar o produto quando scanear
    async function searchProduct(codigo){
        let response =  await fetch(`${config.urlRoot}searchProduct`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              code: codigo
            })
        });
            // ? Mostra no console o produto retornado
            //console.log(response);
            let json = await response.json();

            // ? Seta o nome do produto 
            setProduct(json.Products[0].name);
            // ? Seta a localização do produto
            setLocalization(json.local);

      }

      //todo: Retorna a posição e endereço do usuário
      async function getLocation(){
        let location = await Location.getCurrentPositionAsync({});
        // ? Pega a chave gerada no google api
        Geocoder.init(config.geoCodingAPI);
        
        Geocoder.from(location.coords.latitude, location.coords.longitude)
          .then(json => {

            // todo: tras todos os dados
            //console.log(json);

            // ? Retorna o numero da residencia
            let number = json.results[0].address_components[0].short_name;
            // ? Retorna o nome da rua
            let street = json.results[0].address_components[1].short_name;
            // ? Retorna o bairro
            let district = json.results[0].address_components[2].short_name;
            // ? Retorna a cidade
            let city = json.results[0].address_components[3].short_name;
            // ? Retorna o estado
            let state = json.results[0].address_components[4].short_name;
            // ? Retorna o pais | quando coloca o .short_name no final ele abrevia
            let country = json.results[0].address_components[5].short_name;
            // ? Retorna o cep
            let cep = json.results[0].address_components[6];

            setLocalization(JSON.stringify(`${number} - ${street} - ${district} - ${city} - ${state} - ${country}`));

            // console.log(country);
            
          })
          .catch(error => console.warn(error));

        // ? mostra a localização
        //console.log(location);
      }

    //todo: Função para atualizar o formulario
    async function sendForm() {
      let response = await fetch(config.urlRoot + 'update',{
        method: 'PUT',
        headers :{
          Accept: 'application/json',
          'Content-type':'application/json'
        },
        body: JSON.stringify({
          code: code,
          product: product,
          local: localization
        })
      });
      // ? Converte para json a resposta 
      let json = await response.json();
      setResponse(json);
    }

    //todo: Nova Leitura do Qrcode
    async function readAgain(){
      // ? está lendo novamente
      setScanned(false);
      // ? Mostra a camera
      setDisplayQr('flex');
      // ? remove o formulário da tela
      setDisplayForm('none');
      // ? seta null para o cod scaneado
      setCode(null);
      setProduct(null);
      setLocalization(null);
    }

    return(
        <View>
             <MenuAreaRestrita title="Edição" navigation={navigation}/>

             <BarCodeScanner
                    // ? Se o scanned for false ou undefined excecuta função handleBarCodeScanned
                    onBarCodeScanned={scanned ? undefined : value => handleBarCodeScanned(value) }
                    // ? function css para exibir o qr 
                    style={css.qrcode(displayQr)}
                />

                <View style={css.qrForm(displayForm)}>

                    {/* <Text> Código do produto: { code }</Text> */}
                    <Text>{response}</Text>

                    <View style={css.loginInput}>
                        <TextInput 
                        placeholder='Nome do produto:' 
                        onChangeText={text => setProduct(text)} 
                        value={product}/>
                    </View>

                    <View style={css.loginInput}>
                        <TextInput 
                        placeholder='Localização do produto:' 
                        onChangeText={text => setLocalization(text)} 
                        value={localization}/>
                    </View>

                    <TouchableOpacity style={css.loginButton} onPress={ () => sendForm()}>
                        <Text>Atualizar</Text>
                    </TouchableOpacity>

                    {/*  cod para re-escanear o qrcode */}
                    
                    {// Se tiver o scanned
                      scanned &&
                      <View>
                        <Button
                           title='Escanear Novamente' 
                           onPress={() => readAgain()}
                        />
                      </View>  
                    }

                </View>
        </View>
    )
}