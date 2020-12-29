import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import MenuAreaRestrita from '../../../assets/components/MenuAreaRestrita';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { css } from '../../../assets/css/css';
import config from '../../config/config.json';

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

    //todo: use efect para perguntar se pode usar a camera
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

      //todo: Função para atualizar o formulario
      async function sendForm() {

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

                    <Text> Código do produto: { code }</Text>

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

                </View>
        </View>
    )
}