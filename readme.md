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
		
	

















