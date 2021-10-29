import React from 'react'
import {Text,View,TouchableOpacity} from 'react-native'
import {Entypo} from '@expo/vector-icons'


export const Plan =(props)=>{
    return(
        <TouchableOpacity activeOpacity={0.9} onPress={props.click}>
        <View style={{backgroundColor:'white',borderRadius:8,elevation:5,width:'90%',flexDirection:'row',paddingVertical:15,marginTop:15}}>

                  <View style={{flexDirection:'column',flex:6,marginLeft:10}}>
                        <Text style={{fontSize:25,color:'black'}}>{props.title}</Text>
                        <Text style={{marginTop:5}}>{props.detail}</Text>
                  </View>
                  
                  
                  <View style={{flex:1,justifyContent:'center'}}>
                      <Entypo name="chevron-thin-right" size={35} color="#c41678" />
                  </View>   
          </View>
          </TouchableOpacity>
    )
}