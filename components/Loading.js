import React from 'react'
import {ActivityIndicator,View,StyleSheet} from 'react-native'

export const Loading=()=>{
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator color="#c41678" size="large"/>
        </View>
    )
}