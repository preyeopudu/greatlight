import React from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'


import {SplashScreen} from './SplashScreen'
import {SignInScreen} from './SignInScreen'
import {SignUpScreen} from './SignUpScreen'
import {Forgot} from './forgot'
import {Terms} from './Terms'


const RootStack = createStackNavigator()

export const RootStackScreen =({navigation})=>(
    <RootStack.Navigator >
        <RootStack.Screen options={{headerShown:false}} name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen options={{headerShown:false}}  name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen options={{headerShown:false}} name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="Reset" component={Forgot}/>
        <RootStack.Screen name="Terms & Conditions" component={Terms}/>
    </RootStack.Navigator>
)