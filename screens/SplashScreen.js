import React from 'react';
import { StyleSheet, Text, View,Button,Dimensions,StatusBar,Image,TouchableOpacity } from 'react-native';
import {Buttons} from '../components/Button'
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons'


export const SplashScreen=({navigation})=>{
    return(
      <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('../assets/logo.png')} resizeMode="stretch" style={styles.logo}/>

          </View>
          <View style={styles.footer}>
          <View style={styles.button}>
              <TouchableOpacity activeOpacity={0.5} onPress={()=>{navigation.navigate('SignInScreen')}}>
                <LinearGradient colors={['#FF1493', '#FFB6C1']} style={{borderRadius:12}}>
                    <Text style={{color:"white",paddingHorizontal:15,paddingVertical:10,fontWeight:'bold'}}>Get Started</Text>
                </LinearGradient>
              </TouchableOpacity>
              </View>
              
          </View>
      </View>
    )
  }


  const {height}=Dimensions.get("screen")
  const height_logo=height * 0.28

  const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white',
      marginTop:StatusBar.currentHeight
    },

    header:{
      flex:2,
      justifyContent:'center',
      alignItems:'center'
    },

    footer:{
      flex:1,
      backgroundColor:'white',
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
      padding:50,
      paddingVertical:50,
      paddingHorizontal:30
    },

    logo:{
      width:250,
      height:150,
    
    },

   
    button:{
      alignItems:'center',
      borderRadius:10
    },
    signIn:{
      width:150,
      height:40,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:50,
      flexDirection:'row'
    },
 

  })


