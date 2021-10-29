import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Buttons } from "./components/Button";
import { StatusBar } from "expo-status-bar";
import { MainTab } from "./screens/MainTab";
import { RootStackScreen } from "./screens/RootStackScreen"
import { AuthContext } from "./components/context";
import { signIn } from "./api/auth-api";
import { Loading } from "./components/Loading";

export default function App() {
  const [isloading, setIsloading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState();
  const [notification, setNotification] = useState();
  const [ad, setAd] = useState();

  const initialLoginState = {
    isloading: false,
    userName: null,
    userToken: null,
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        user,
        setUser,
        notification,
        setNotification,
        ad,
        setAd,
      }}
    >
      <NavigationContainer>
        {auth != false ? <MainTab /> : <RootStackScreen />}
        <StatusBar translucent={true} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
