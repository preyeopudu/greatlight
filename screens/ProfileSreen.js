import React, { useContext,useState } from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity, Alert,StatusBar } from 'react-native';
import {Buttons} from '../components/Button'
import Icon from '@expo/vector-icons/AntDesign'
import {FontAwesome,MaterialIcons,FontAwesome5} from '@expo/vector-icons'
import {AuthContext} from '../components/context'
import {Avatar} from 'react-native-paper'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {userSecret} from '../api/user-api'
import { Loading } from '../components/Loading';

export const ProfileScreen=({navigation})=>{
  const[secretuser,setSecret]=useState()
  const[loading,setLoading]=useState(false)
  const {auth,setAuth,user,setUser,notification,setNotification} = React.useContext(AuthContext)

  const HandleSubmit=async ()=>{
    setLoading(true)
    if(secretuser==null){
      setLoading(false)
      Alert.alert("Error","No value entered")
    }
    else{
      const res=await userSecret(user.username,{secretuser})
      if(res.data){
        setUser(res.data.user)
        setLoading(false)
      }
      
      // Alert.alert("Success",secretuser)
    }
  }

  const HandleSecret=(val)=>{
      setSecret(val)
  }

  const HandleSignout=()=>{
    setAuth(false)
  }

  let display
  if(user.secret==null){
    display=<Text style={{color:'black',fontWeight:'900'}}>Set Secret below</Text>
  }else{
    display=<Text style={{color:'black',fontSize:17,fontWeight:'900'}}>your secret is {user.secret}</Text>
  }

    if(loading==true){
      return(
        <Loading/>
      )
      
    }else{
      return(
        <View style={{flex:1,backgroundColor:'white'}}>
  
              <View style={{flex:4,justifyContent:'center',alignItems:'center'}}>
                  <Avatar.Icon size={100} style={{backgroundColor:"#FF1493",marginTop:50}} icon="account" />
                  <Text style={{fontSize:25,marginVertical:10,color:'#05375a',textAlign:'center'}}>{user.name}</Text>
                  <Text style={{textAlign:'center',fontSize:20,color:'#05375a',marginBottom:10}}>{user.username}</Text>
                  {display}
              </View>
          
  
           <View style={{flex:3,backgroundColor:'white',paddingVertical:50,elevation:20,borderTopLeftRadius:50,borderTopRightRadius:50,alignItems:'center'}}>  
                
             
                      
  
                  
                <View style={{flexDirection:'row',marginVertical:30,width:'90%',alignItems:'center'}} >
                     
                      <TextInput placeholder='secret'   style={{textAlign:'center',fontSize:22,flex:4,marginLeft:10,borderBottomWidth:0.7,borderColor:'gray',paddingTop:10}}  autoCapitalize='none' onChangeText={(val)=>{HandleSecret(val)}}/>
                </View>
  
                <TouchableOpacity activeOpacity={0.9} onPress={()=>{HandleSubmit()}}>
                  <View style={{backgroundColor:'white',borderRadius:10,width:"100%",elevation:3}}>
                      <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:8}}>
                     
                      <FontAwesome name="user-secret" size={24} color="black" />
                      <Text style={{fontSize:18,marginLeft:10}}>Set Secret</Text>
                      </View>
                  </View>
                </TouchableOpacity>
  
            
          
          <TouchableOpacity activeOpacity={0.9} style={{bottom:50,position:'absolute',right:20}} onPress={()=>{HandleSignout()}}>
            <View style={{backgroundColor:'white',borderRadius:30,width:"100%",elevation:3}}>
              <View style={{flexDirection:'row',paddingHorizontal:10,paddingVertical:8}}>
              <FontAwesome5 name="door-open" size={24} color="#c41678" />
                
              </View>
              </View>
          </TouchableOpacity>
        
          </View> 
  
          
          </View>
  
      )
    }

    
  }