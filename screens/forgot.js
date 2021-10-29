import React,{useState} from 'react'
import {View,Text,ScrollView,StyleSheet,TextInput, Alert} from 'react-native'
import {FontAwesome,Feather,FontAwesome5} from '@expo/vector-icons'
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import {reset} from '../api/auth-api'
import { Loading } from '../components/Loading'
export const Forgot=()=>{
  const[loading,setLoading]=useState()
  const [username,setUsername]=useState()
  const [password,setPassword]=useState()
  const [secret,setSecret]=useState()
  const [show,setShow]=useState(true)

  function HandleShow(){
    setShow(!show)
  }

  function HandleEmail(val){
    setUsername(val.trim())
  }

  function HandleSecret(val){
    setSecret(val.trim())
  }

  function HandlePassword(val){
    setPassword(val)
  }


  const HandleReset=async()=>{
    setLoading(true)
    if(username==undefined||password==undefined||secret==undefined){
        setLoading(false)
        Alert.alert("Error","You have a missing field")
      }else{
        const result=await reset({username,password,secret})
        if(result.data){
          if(result.data.success){
            setLoading(null)
            Alert.alert("Success","succesfully changed password")
          }

          else{
            setLoading(null)
            Alert.alert("Error","Failed to reset")
          }
        }
        
      }
  }

  if(loading){
    return(
      <Loading/>
    )
    
  }
  else{

    return(
        <ScrollView style={{backgroundColor:'white'}}>
            <View style={{justifyContent:'center',alignItems:'center',flex:1,paddingHorizontal:30}}>

                
            <View style={styles.action}>
                <Feather name="mail" size={20} color="#05375a"/>
                <TextInput placeholder="Email" style={styles.textInput} autoCapitalize='none' onChangeText={(val)=>{HandleEmail(val)}}/>
          </View>

          <View style={styles.action}>
                <FontAwesome5 name="user-secret" size={20} color="#05375a" />
                <TextInput placeholder="Secret" style={styles.textInput} autoCapitalize='none' onChangeText={(val)=>{HandleSecret(val)}}/>
          </View>

          <View style={styles.action}>
                <Feather name="lock" size={20} color="#05375a" />
                <TextInput placeholder="New password" style={styles.textInput} autoCapitalize='none' secureTextEntry={show} onChangeText={(val)=>{HandlePassword(val)}}/>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>HandleShow()}>
                {show?
                      <Feather name='eye-off' color="#05375a" size={20}/>
                      :<Feather name='eye' color="#05375a" size={20}/>
                }
                
            </TouchableOpacity>
          </View>

            <View style={{marginTop:20}}>
            <TouchableOpacity activeOpacity={0.8} style={{backgroundColor:'white',elevation:3,borderRadius:15}}  onPress={()=>HandleReset()}>
                    <Text style={{paddingVertical:10,paddingHorizontal:15,fontSize:20}}>Reset</Text>
          </TouchableOpacity>
            </View>
          

            </View>
        </ScrollView>
            
 
    )
  }
}







const styles=StyleSheet.create({
    action:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5,
        marginTop:40
      },
      textInput:{
        flex:1,
        marginTop:-3,
        paddingLeft:10,
        color:"#05375a"
      }
})