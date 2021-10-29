import React from 'react'
import {TouchableOpacity,View,Text} from 'react-native'


export const Buttons=(props)=>{
    return(
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
            <View style={{backgroundColor:"#d90166",paddingVertical:5,width:100,alignItems:"center",borderRadius:10,...props.style}}>
                {props.children}
            </View>
        </TouchableOpacity>
    )
}

