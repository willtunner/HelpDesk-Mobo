import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AntDesign } from '@expo/vector-icons';

export default function Profile(){

    return(
        <View>
            <Text>Profile</Text>
            <AntDesign name="customerservice" size={24} color="black" />
        </View>
    )
}