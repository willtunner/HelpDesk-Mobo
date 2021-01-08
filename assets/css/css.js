import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#C0C4ED',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container3: {
      flex: 1,
      backgroundColor: '#C0C4ED',
      alignItems: 'center',
      paddingTop: 50,
    },
    containerTop:{
      justifyContent: 'flex-start'
    },
    container2: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ff4'
    },
    textPage:{
      backgroundColor: 'orange',
      padding: 20
    },
    buttonHome: {
      marginRight: 20
    },
    darkbg: {
      backgroundColor: '#333'
    },
    loginMsg:(text='none') => ({
      fontWeight: 'bold',
      fontSize: 22,
      color: 'red',
      marginTop: 5,
      marginBottom: 15,
      display: text
    }),
    loginForm: {
      marginTop: 30,
     width: '80%'
    },
    loginInput: {
      backgroundColor: '#FFF',
      fontSize: 19,
      padding: 7,
      marginBottom: 15
    },
    loginButton: {
      padding: 12,
      backgroundColor: '#F58634',
      alignSelf: 'center',
      borderRadius: 5,
      width: '100%',
    },
    loginButtonText: {
      fontWeight: 'bold',
      fontSize: 22,
      color: '#333',
      textAlign: "center"
    },
    logo: {
      marginBottom: 30
    },
    areaTab: {
      backgroundColor: '#333',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333'
    },
    areaMenu: {
      flexDirection: 'row',
      paddingTop: 40,
      paddingBottom: 10,
      width: '100%',
      backgroundColor: '#111',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonHome2: {
      textAlign: 'left'
    },
    areaTittle: {
      width: '80%',
      fontWeight: 'bold',
      fontSize: 20,
      color: '#fff',
      textAlign: 'center'
    },
    buttonLogout: {
      textAlign: 'right'
    },
    // por padrão começa flex
    qrcode:(display = 'flex') => ({
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      justifyContent: 'center',
      display: display
    }),
    // por padrão começa none
    qrForm:(display = 'none') => ({
      width: '100%',
      display: display
    }),
    inputRastreio: {
      backgroundColor: '#5A4D8C', 
      height: 40,
      width: '80%', 
      padding: 15, 
      paddingLeft: 20,
      color: '#FFF',
      borderRadius: 20
    },
    logoRastreio: {
      height:150, 
      width:150,
      marginBottom: 50
    },
    btnRastreio: {
      backgroundColor: '#17AF66',
      height: 30,
      width: '40%',
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10
    },
    txtBtnRastreio: {
      color: '#FFF',
      fontWeight: '500',
      fontSize: 18,
      //todo: Sombra desfolcada
      // textShadowColor: 'rgba(0, 0, 0, 0.75)',
      // textShadowOffset: {width: -1, height: 1},
      // textShadowRadius: 3
      //todo: Sombra efeito de lado
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
      textShadowColor: '#000',
    }
  });

export {css};
