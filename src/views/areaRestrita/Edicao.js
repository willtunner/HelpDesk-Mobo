import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import MenuAreaRestrita from '../../../assets/components/MenuAreaRestrita';

export default function Edicao({navigation}){

    return(
        <View>
             <MenuAreaRestrita title="Edição" navigation={navigation}/>
        </View>
    )
}