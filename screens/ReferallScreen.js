import React,{useState} from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity,Alert,StatusBar } from 'react-native';
import {Buttons} from '../components/Button'
import Clipboard from 'expo-clipboard'
import {AuthContext} from '../components/context'
import {Feather} from '@expo/vector-icons'



export const ReferallScreen=({navigation})=>{
    const {auth,setAuth,user,setUser,notification,setNotification} = React.useContext(AuthContext)
    const [copiedText, setCopiedText] = useState('')
    const copyToClipboard = () => {
      Alert.alert('Copied')
      Clipboard.setString(user.username);
    }
    return(
      <View style={{flex:1,marginTop:StatusBar.currentHeight,alignItems:'center',backgroundColor:'white'}}>


        <View style={{width:'90%',marginTop:30,alignItems:'center',borderRadius:15,elevation:2,backgroundColor:'white'}}>
            <Text style={{fontSize:25,marginBottom:10,marginTop:10}}>Your Referal Link</Text>
            <Feather name="link-2" size={35} color="#c41678" />
            <Text style={{textAlign:'center',fontSize:18,marginBottom:20}}>Help your friends discover Greatlight and earn 5% of their initial investment.</Text>

            <View style={{borderColor:"gray",borderWidth:0.5,borderRadius:10,marginBottom:10,paddingHorizontal:20,paddingVertical:10}}>
                <Text style={{color:'black',fontSize:20}}>{user.username}</Text>
            </View>



            <TouchableOpacity activeOpacity={0.8} style={{borderRadius:10,backgroundColor:'#c41678',marginBottom:30,alignItems:'center',width:100,paddingVertical:10}} onPress={()=>copyToClipboard()}>
                <Text style={{color:'white'}}>Copy</Text>
            </TouchableOpacity>


        
            
        </View>

          <View style={{elevation:2,backgroundColor:'white',width:'90%',alignItems:'center',borderRadius:10,marginTop:30}}>
              <Text style={{color:'#c41678',fontSize:25}}>NGN {user.referalAmount}</Text>
              <Text style={{marginVertical:15}}>Total earnings from {user.referal} referal</Text>
          </View>
        
      </View>
      
    )
  }