import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#C0C4ED',
      alignItems: 'center',
      justifyContent: 'center',
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
      width: '100%'
    },
    loginButtonText: {
      fontWeight: 'bold',
      fontSize: 22,
      color: '#333'
    },
    logo: {
      marginBottom: 30
    },
    areaTab: {
      backgroundColor: '#333',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333'
    }
  });

export {css};
