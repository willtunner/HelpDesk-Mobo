#### REACT NATIVE + EXPO ####
https://www.youtube.com/watch?v=tGza01IRK6M&list=PLbnAsJ6zlidsqILBeTaeUr7aaWcqAtMrW&index=7

Icone: 300px X 300px 
SplashScreen: 1242px X 2436px
Config em: app.json 
 "icon": "./assets/icon.png",
 "image": "./assets/splash.png",
 "resizeMode": "cover",
 
 expo init "nome do projeto"
 expo start

 KeyboardAvoidingView = Evita do teclado ficar por cima dos componentes

 secureTextEntry: Habilita o **** quando for colocar senha
 <TextInput placeholder="Senha" secureTextEntry={true}/> 

1- Cria um TSX/Componente
		em src/views/Page.json: 
		
		import React from 'react';
		import {View, Text} from 'react-native';

		export default function Page(){
			return(
				<View>
					<Text>O nome da empresa é GreenCode</Text>
				</View>
			);
		}

2- importa em App.js o componente criado
		import Page from './src/views/Page';

3- Passa propriedades para o componente criado
		<Page empresa="React Native" />
4- Recebe no componente assim Page.js
		diz que o componente está recebendo as props:
		export default function Page(props){
		
		usa props dessa forma:
		<Text>O nome da empresa é GreenCode {props.empresa}</Text>

#### CSS ####
1- css na mesma pasta
		importar: import { StyleSheet, Text, View } from 'react-native';
		
		criar css: 
		const styles = StyleSheet.create({
		  container: {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
		  },
		});
		
		usar css:
		<View style={styles.container}>

2- pasta diferente
		cria uma pasta para guardar o css.js
		importa o StyleSheet: import { StyleSheet } from 'react-native';
		
		cria e exporta o xml
		const css = StyleSheet.create({
			container: {
			  flex: 1,
			  backgroundColor: '#fff',
			  alignItems: 'center',
			  justifyContent: 'center',
			},
		  });

		export {css};
3- importa css em app.js
	import { css } from './assets/css/css';
	
	chama dessa forma:
	<View style={css.container}>

#### States e Hooks ####
1- importa os states
		import React, { useState, useEffect } from 'react';
2- cria o states e como fica o app.js		
			import { StatusBar } from 'expo-status-bar';
			import React, { useState, useEffect } from 'react';
			import { Text, View, Button, Alert } from 'react-native';
			import { css } from './assets/css/css';

			export default function App() {

			  //? States/Hooks
			  const [ product, setProduct ] = useState('ps5');
			  const [ quanty, setQuanty ] = useState(0);
			  
			  //todo: Quando o quanty for alterado o state
			   useEffect(() =>{
				if( quanty > 0 ){
				  Alert.alert('Novo produto adcionado!');
				}
			   }, [quanty]);

			   
			   // todo: State para ficar piscando na tela a informação
			  const [isShowingText, setIsShowingText] = useState(true);

			  const Blink = (props) => {
				const [isShowingText, setIsShowingText] = useState(true);
			  
				 useEffect(() => {
				   const toggle = setInterval(() => {
					 setIsShowingText(!isShowingText);
				   }, 1000);
			  
				   return () => clearInterval(toggle);
				})
			  
				if (!isShowingText) {
				  return null;
				}
			  
				return <Text>{props.text}</Text>;
			  }

			  // todo: com props
			   const props = {
				 empresa: 'GreenCode',
				 name: 'Will',
				 produto: product,
				 quantidade: quanty
			   };

			  return (
				<View style={css.container}>
				  <StatusBar style="auto" />
				  <Text>
					O nome da empresa é {props.empresa} e {props.name}.
					Comprou o produto {props.produto} na seguinte quantidade { props.quantidade }
				  </Text>
				  <Button title="Adcionar produtos" onPress={() => setQuanty( quanty + 1 )}/>
				  <Blink text='I love to codar' />
				</View>
			  );
			}

#### Navegação entre Telas ####
Instalações:
			npm install @react-navigation/native
			npm install @react-navigation/stack
			expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

1- Importar em
			import { NavigationContainer } from '@react-navigation/native';
			import { createStackNavigator } from '@react-navigation/stack';
2- 	App.js
			import React from 'react';
			import { NavigationContainer } from '@react-navigation/native';
			import { createStackNavigator } from '@react-navigation/stack';
			import Home from './src/views/Home';


			export default function App() {
			  const Stack = createStackNavigator();

			  return (
			   <NavigationContainer>
				  <Stack.Navigator>
					<Stack.Screen name="Home" component={Home} />
				  </Stack.Navigator>
				</NavigationContainer>
			  );
			}
3- 	Home.js
			import React, { useState, useEffect } from 'react';
			import { Text, View, Button, Alert } from 'react-native';

			export default function Home()
			{
				return(
					<View>
						<Text> Esse é o componente Home</Text>
					</View>
				)
			}
4-  Login.js 
	import React, { useState, useEffect } from 'react';
	import { Text, View, Button, Alert } from 'react-native';

	export default function Login()
	{
		return(
			<View>
				<Text> Esse é o componente login</Text>
			</View>
		)
	}
5- navega entre telas e, App.js
	em app.js importar o login criado:
	import Login from './src/views/Login';
	
	colocar nas rotas ne navegação:
	<Stack.Screen name="Login" component={Login} />
6- Cria um botão e chama a função de mover entre telas passado pela props
	import React, { useState, useEffect } from 'react';
	import { Text, View, Button } from 'react-native';

	export default function Home(props)
	{
		return(
			<View>
				<Text> Esse é o componente Home</Text>
				<Button title='Ir para login' onPress={() => props.navigation.navigate('Login')}/>
			</View>
		)
	}
7- PASSAR PARAMETRO PARA OUTRA TELA em Home.js
		 <Button title='Ir para login' onPress={() => props.navigation.navigate('Login', {id: 30})}/>
8- Em Login.js receber os props
		export default function Login(props)
		passa dessa forma:
		<Text> Esse é o componente login idade é: {props.route.params.id}</Text>		
		
	
#### MUDANÇAS ####
1- Criar um index.js dentro de views para chamar de uma melhor forma no app.js
		import Home from './src/views/Home';
		import Login from './src/views/Login';
		import Rastreio from './src/views/Rastreio';
		//import AreaRestrita from './src/views/AreaRestrita';

		export { Home, Login, Rastreio };

2- Em App.js chama dessa forma
		import { Home, Login, Rastreio } from './src/views';

3- Estiliza o header da navigation stack
		<Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            title: "Bem Vindo",
            headerStyle: {backgroundColor: '#F58634'},
            headerTintColor: '#333',
            headerTitleStyle: {fontWeight: 'bold', alignSelf: 'center'}
          }}
          />
4- importa imagem para o projeto
		<Image source = {require('../../assets/img/login.png')} />

5- Para tirar o title das rotas de navegações, 'headerShown: false' 	
		<Stack.Screen 
        name="Login" 
        options={{headerShown: false}} 
        component={Login} />


#### FUNÇÃO COM CSS ####
1- Tranforma o css desejado em uma função
		loginMsg:(text='none') => ({
		fontWeight: 'bold',
		fontSize: 22,
		color: 'red',
		marginTop: 10,
		marginBottom: 15,
		display: text
		}),
2- Chama o css no component em forma de função 
		<Text style={css.loginMsg()}>Usuário ou senha inválidos</Text>
3- Cria um state para salvar o display
		const [display, setDisplay] = useState('none');
4- passa para o component o display
		 <Text style={css.loginMsg(display)}>Usuário ou senha inválidos</Text>
5- 

#### INTEGRAÇÃO COM BACKEND ####

LOGIN:
1- tempo que pegar atravez do hooks os dados digitados nos campos
		dentro do metodo principal:
			const [email, setEmail] = useState(null);
			const [password, setPassword] = useState(null);
			const [login, setLogin] = useState(null);

2- nos campos input popular os states com os dados digitados
			<TextInput style={css.loginInput} onChangeText={ text => setEmail(text)} placeholder="Usuário"/>
            <TextInput style={css.loginInput} onChangeText={ text => setPassword(text)} placeholder="Senha" secureTextEntry={true}/>

3- cria uma função fetch para mandar para o backend
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
				}
4- envia pelo botão
		  <TouchableOpacity style={css.loginButton} onPress={ () => sendForm()}>
		  		<Text style={css.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

#### AsyncStorage ####
trabalhar com login ideal usar o AsyncStorage
1- instalar o asyncstorage no expo:
			npm i @react-native-community/async-storage
2- importa o AsyncStorage em Login.js
			import AsyncStorage from '@react-native-community/async-storage';
3- usa dessa forma o async
			// ? Caso de error 
			if( json === 'error' ){
				// ? exibe msg em vermelho
				setDisplay('flex');
				// ? Depois de 5s some a mensagem
				setTimeout( () => {
					setDisplay('none');
				}, 5000);
				// ? se errar a senha limpa o storage
				await AsyncStorage.clear();
			}else{
				// ? se der certo seta um item
				// ? Nome do storage: 'userData',
				// ? Dados que passa pra ele de string para json 'JSON.stringify(json)'
				let userData = await AsyncStorage.setItem('userData', JSON.stringify(json));
				// ? Pega um dado do storage pelo nome dado quando setou
				let resData  = await AsyncStorage.getItem('userData');
				// ? tem que converter de string para json
				console.log(JSON.parse(resData));
			}
RECUPERANDO DADOS DO ASYNC AO FECHAR APLICATIVO E ABRIR DE NOVO
1- EM App.js importar o asyncstorage
				import AsyncStorage from '@react-native-community/async-storage';
2- Cria e chama uma função teste para buscar do async toda vez que abre o app
				async function teste(){
					let resData  = await AsyncStorage.getItem('userData');
					// ? tem que converter de string para json
					console.log(JSON.parse(resData));
				}

				teste();

#### LOGANDO E INDO PARA AREA RESTRITA ####
1- Cria pasta:
				src/views/arearestrita/Rastreio.js
2- preenche como base:
			import React, { useState, useEffect } from 'react';
			import { Text, View, Button } from 'react-native';

			export default function AreaRestrita(){
				
				return(
					<View>
						<Text> Esse é o componente AreaRestrita </Text>
					</View>
				)
			}
3- em app.js importa o area restrita
			import AreaRestrita from './src/views/AreaRestrita';
4- chama a rota do area restrita
			<Stack.Screen name="AreaRestrita" component={AreaRestrita} />
5- em index.js dentro de views src/views/index.js
			import Home from './Home';
			import Login from './Login';
			import Rastreio from './Rastreio';
			import AreaRestrita from './AreaRestrita';

			export { Home, Login, Rastreio, AreaRestrita };
6- no método sendForm de Login.js na parte que da certo o login e senha
			else{
				// ? se der certo seta um item
				// ? Nome do storage: 'userData',
				// ? Dados que passa pra ele de string para json 'JSON.stringify(json)'
				await AsyncStorage.setItem('userData', JSON.stringify(json));
				// ? envia para areaRestrita
				navigation.navigate('AreaRestrita');
			}
	já deve enviar para outra tela		

PEGAR DADOS DO ASYNCSTORAGE NA OUTRA TELA
//! Para testar o que chega no async storage
    async function teste(){
        let resData  = await AsyncStorage.getItem('userData');
        // ? tem que converter de string para json
        console.log(JSON.parse(resData));
      }
      teste();


1- importar os states
		import React, { useState, useEffect } from 'react';

2- criar o state do usuario
		const [ user, setUser ] = useState(null);

3- Cria um useEffect para quando iniciar a tela ele pegar os dados salvos no asyncstorage
		  // ? Cria um useEffect para quando iniciar a tela ele pegar os dados salvos no asyncstorage
			useEffect( ()=> {
				// todo: Cria função para pegar usuario do asyncstorage 
				async function getUser(){
					// ? Pega os dados que vem do asyncstorage com nome de userData 
					let response = await AsyncStorage.getItem('userData');
					// ? Converte de para json
					let json = JSON.parse(response);
					//console.log(json.user.email)
					// ? Seta no state o nome do usuario que veio do Objeto response
					setUser(json.user.name);
				}
				//todo: Chama a função
				getUser();
				//todo: Array vazio indica que ao iniciar a tela ele chama a função igual componentDidMounth
			},[]);		

4- Usa o dado retornado dessa forma
		<Text> Seja bem vindo {user} </Text>


#### Biometria ####
1- instalar a biblioteca:
			expo install expo-local-authentication

2- importar a biblioteca da biometria na tela login.js
			import * as LocalAuthentication from 'expo-local-authentication';

3- Cria uma função para verificar se já possui login (teste)
			
			//! Verifica se o usúario já possui algum login registrado no async storage
				async function verifyLogin(){
					let response = await AsyncStorage.getItem('userData');
					let json = await JSON.parse(response);
					console.log(json);
				}   

4-  useEffect para efetivar assim que entrar na tela

			useEffect( ()=> {
				verifyLogin();
			},[]);

5- Função verifica se possui login (valendo)

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

FUNÇÃO BIOMETRIA
 Obs: Tem que logar 1x antes normal para ele pedir biometria 
	   Quando loga primeira vez ele salva os dados no async storage e popula os states de email e password
	   pra quando usar biometria depois ele puxa dos dados salvos e loga normal

para biometria tem 3 funções 
		1-
		//todo: hasHardwareAsync - Verifica se o hardware é compativel com a biometria
        let compatible = await LocalAuthentication.hasHardwareAsync();
		2-
		//todo: isEnrolledAsync - verifica se tem biometrias cadastradas no dispositivo
        let biometricRecords = await LocalAuthentication.isEnrolledAsync();
		3-
		//todo: authenticateAsync - valida se a senha bate com o dedo do usuario
        let result = await LocalAuthentication.authenticateAsync();

ficando assim:
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


#### BOTON TABS ####
1- instalar o bottontabs e icons
		npm install @react-navigation/material-bottom-tabs react-native-paper
		npm install --save react-native-vector-icons

2- Dentro da areaRestrita importa
		import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

3- Cria const tab
		const Tab = createMaterialBottomTabNavigator();

4- Dentro do return da area restrita joga o tab navigator
		return(
			<Tab.Navigator>
				<Tab.Screen name="Profile" component={Profile} />
				<Tab.Screen name="Cadastro" component={Cadastro} />
				<Tab.Screen name="Edicao" component={Edicao} />
			</Tab.Navigator>
		)
		
5- Criar pages na area restrita e chamar no views/index
		import Home from './Home';
		import Login from './Login';
		import Rastreio from './Rastreio';
		import Profile from './areaRestrita/Profile';
		import Cadastro from './areaRestrita/Cadastro';
		import Edicao from './areaRestrita/Edicao';

		export { Home, Login, Rastreio, Profile, Cadastro, Edicao};

6- importar o index dentro do areaRestrita:
		import { Profile, Cadastro, Edicao } from '../index';

7- já deve aparece quando loga

MUDAR BOTTONTABS PERSONALIZAR
1- Passa propriedade para o tabnavigator
		 <Tab.Navigator
				activeColor = '#999'
				inactiveColor = '#fff'
				barStyle = {css.areaTab}
			>
2- importa o css
		import css from '../../../assets/css/css';

3- cria o areaTab dentro do css
		areaTab: {
			backgroundColor: '#333',
			fontSize: 20,
			fontWeight: 'bold',
			color: '#333'
		}

4- Importa o icons que foi instalado
		import Icon from 'react-native-vector-icons/dist/FontAwesome';

5- Coloca os icones na BottonTabs dentro do Tab.screen
		options={{
                    tabBarIcon:() => (
                        <Icon name="users" size={20} color="#999" />
                    )
                }}

#### #16 Menu e Componentização ####
1- Importa o css no profile
		import { css } from '../../../assets/css/css';
		import Icon from 'react-native-vector-icons/FontAwesome';

2- Chama a navegação para migrar de rotas
		export default function Profile({navigation}){

3- Cria botão que leva até HOME
		<TouchableOpacity style={css.buttonHome2} onPress={ () => navigation.navigate('Home')}>
                <Icon name="home" size={20} color="#999"/>
        </TouchableOpacity>

4- Cria o botão LOGOUT
		<TouchableOpacity style={css.buttonLogout} onPress={ () => logout()}>
               <Icon name="sign-out" size={20} color="#999"/>
        </TouchableOpacity>

5- Cria função Logout()
		async function logout(){
			// ? Limpa os dados do asyncstorage
			await AsyncStorage.clear();
			// ? Redireciona para tela de login
			navigation.navigate('Login');
		}

CRIA O COMPONENTE PARA  
1- cria uma pasta assets/component/MenuAreaRestrita.js (base)
		import React from 'react';

		export default function MenuAreaRestrita (){
			
		}

2- Ficando assim no final:
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

3- Importa no profile
		import MenuAreaRestrita from '../../../assets/components/MenuAreaRestrita';

4- Chama dessa forma
		<MenuAreaRestrita title="Perfil" navigation={navigation}/>



#### #17 Alterando a Senha ####
1- cria os states para os componentes que vão usar
		 	const [ id, setId ] = useState(null);
			const [ senhaAntiga, setSenhaAntiga ] = useState(null);
			const [ novaSenha, setNovaSenha ] = useState(null);
			const [ confNovaSenha, setConfNovaSenha ] = useState(null);

2- VERIFICA QUAL ID RETORNA DO ASYNCSTORAGE
			useEffect( () => {
				async function getIdUser(){
					let response = await AsyncStorage.getItem('userData');
					let json = JSON.parse(response);
					console.log(json.user.id);
				}
				getIdUser();
			});

3- 



### EFETUANDO CADASTRO RASTREIO/PRODUTO ###
Primeira parte do front mobo

Depois das migrations criadas, relacionamentos feitos e tudo certinho
1- cria os states para serem salvos no banco
			const [code, setCode] = useState(null);
			const [user, setUser] = useState(null);
			const [product, setProduct] = useState(null);

2- cria o origim no config json e importa e depois chama como address
			import config from '../../config/config.json'; 
			"origin": "Tv: Apinajés, Nº 593, Belém - PA"

			 const address = config.origin;

3- Pega o id do usuario 
			//Pega id do usuario
			async function getUser()
			{
				let response=await AsyncStorage.getItem('userData');
				let json=JSON.parse(response);
				setUser(json.user.id);
			}

4- Gera um cod randomico 
			//Gerar um código randômico
			async function randomCode()
			{
				let result = '';
				let length=20;
				let chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
				for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
				setCode(result);
			}

5- Chama as funções acima assim que entra na page
			 //Pega o id assim que entra na tela
			useEffect(()=>{
				getUser();
			},[]);

			//Gera o cod assim que abre a tela
			useEffect(()=>{
				randomCode();
			},[]);

6- Envia para o backend as informações como post
			//Envio do formulário
			async function sendForm()
			{
				let response=await fetch(config.urlRoot+'tracking',{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						user_id: user,
						code: code,
						product: product,
						local: address
					})
				});
			}

obs: tracking: rota criada no backend
	

### GERAR QRCODE ###
1- instalar a lib
			https://www.npmjs.com/package/qrcode
			npm install --save qrcode

2- no backend importar a lib do QRCode
			import QRCode from 'qrcode';

3- no backend logo após onde se cadastra o produto 
			// todo: Gera o QRCode passando o cod do produto
			QRCode.toDataURL(req.body.code).then((url) => {
			QRCode.toFile('../../../assets/img/code.png', req.body.code);
			res.send(JSON.stringify(url));
			});

4- na função sendForm do frontend pegar o response vindo do banco
			 // Todo: Recebe do backend a informação
					let json = await response.json();
					setResponse(json);
				}

5- Dentro do return abaixo do areaRestrita
			{/* Se tiver o response exibe a imagem */}
            {
                response && (
                    <View>
                        <Image source={{uri: response, height: 180, width: 180}} />
                        <Button title='Compartilhar' />
                    </View>    
                )
            }

### COMPARTILHAR WHATSAPP/IMPRESSORA/ETC... ### 
1- instalar libs
			expo install expo-file-system
			expo install expo-sharing

2- importar as libs no front 'Cadastro'
			import * as Sharing from 'expo-sharing';
			import * as FileSystem from 'expo-file-system';

3- 




