import React,{Component} from 'react'
import {StyleSheet,Text,View,Platform} from 'react-native'
import{AdMobInterstitial,setTestDeviceIDAsync} from 'expo-ads-admob'

export default class Ad extends Component{
    constructor(props){
        super(props)
    }

    async componentDidMount(){
        
        AdMobInterstitial.setAdUnitID('ca-app-pub-2757750706281945/7796387909'); 
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
        await AdMobInterstitial.showAdAsync()
        
    }

    render(){
        return(
            <View style={{flex:1}}>

            </View>
        )
    }
}