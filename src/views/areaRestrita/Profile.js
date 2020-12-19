import React from 'react';
import { View,Text } from 'react-native';
import { css } from '../../../assets/css/css';
import MenuAreaRestrita from '../../../assets/components/MenuAreaRestrita';

export default function Profile({navigation}){

    return(
       <View style={[css.container, css.containerTop]}>
           <MenuAreaRestrita title="Perfil" navigation={navigation}/>
           <Text> OI </Text>
       </View>
    )
}