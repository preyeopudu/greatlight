import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Views,Text} from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {Ionicons,Feather,MaterialCommunityIcons,FontAwesome5} from '@expo/vector-icons'
import { ProfileScreen } from './ProfileSreen'
import { ExploreScreen } from './ExploreScreen'
import {HomeScreen} from './HomeScreen'
import {ReferallScreen} from './ReferallScreen'
import {Buy} from './Buy'
import {Withdraw} from './Withdraw'
import {TransferScreen} from './TransferScreen'
import {Transaction} from './Transactions'
import {Notification} from './notification'
import {CryptoScreen} from './CryptoScreen'
const HomeStack=createStackNavigator()
const DetailStack=createStackNavigator()
const TransferStack=createStackNavigator()
const Tab=createMaterialBottomTabNavigator()
const Top=createMaterialTopTabNavigator()

export const MainTab=({})=>{
    return(
        <Tab.Navigator initialRouteName="Home" activeColor="#c41678"
         inactiveColor="gray" screenOptions={{tabBarColor:"white"}}>


            <Tab.Screen name="Home"  component={HomeStackScreen} options={{
                    tabBarLabel:"Home",
                    tabBarIcon:({color})=>(
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                )
                }}/>
                

                <Tab.Screen name="Explore" component={ExploreScreen} options={{
                        tabBarLabel:"Explore",
                        tabBarIcon:({color})=>(
                        <MaterialCommunityIcons name="shield-search" color={color} size={26}/>
                )
                }}/>

               

                <Tab.Screen name="Details" component={ReferallScreen} options={{
                        tabBarLabel:"Referals",
                        tabBarIcon:({color})=>(
                            <MaterialCommunityIcons name="link-variant-plus" size={26} color={color} />
                )
                }}/>


                <Tab.Screen name="Transfer" component={TransferStackScreen} options={{
                        tabBarLabel:"Transfer",
                        tabBarIcon:({color})=>(
                            <FontAwesome5 name="exchange-alt" size={24} color={color}  />
                )
                }}/>
 

                

                <Tab.Screen name="Profile" component={ProfileScreen} options={{
                        tabBarLabel:"Account",
                        tabBarIcon:({color})=>(
                        <MaterialCommunityIcons name="account" color={color} size={26}/>
                )
                }}/>
            
        </Tab.Navigator>
    )
}


const WithdrawTab=()=>{
    return(
        <Top.Navigator style={{marginTop:0}}>
            <Top.Screen name="FIAT" component={Withdraw}/>
            <Top.Screen name="USDT" component={CryptoScreen}/>
        </Top.Navigator>
    )
}


const HomeStackScreen = ()=>{
    return(
          <HomeStack.Navigator>
            <HomeStack.Screen options={{headerShown:false}} name="Home" component={HomeScreen}  />
            <HomeStack.Screen name="Buy" component={Buy}  />
            <HomeStack.Screen name="Withdraw" component={WithdrawTab}/>
            <HomeStack.Screen name="Notification" component={Notification}  />
      </HomeStack.Navigator> 
    )
}


const TransferStackScreen=()=>{
    return(
        <TransferStack.Navigator>
            <TransferStack.Screen options={{headerShown:false}} name="TransferHome" component={TransferScreen} />
            <TransferStack.Screen name="Transactions" component={Transaction}/>
        </TransferStack.Navigator>
    )
}


const DetailStackScreen = ({navigation})=>{
return(
      <DetailStack.Navigator screenOptions={{
          headerTitleAlign:"center"
      }}>
        <DetailStack.Screen name="Details" component={DetailScreen}  options={{
                headerLeft:()=>(
                    <Ionicons style={{marginLeft:5}} name="menu-sharp" size={35} onPress={()=>{navigation.openDrawer()}}/>
                )
            }}/>
  </DetailStack.Navigator> 
)
}


