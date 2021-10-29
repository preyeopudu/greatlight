import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { Buttons } from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { AuthContext } from "../components/context";
import { signIn } from "../api/auth-api";
import { not } from "../api/user-api";
import { Loading } from "../components/Loading";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { getNotification, getAd } from "../api/user-api";

export const SignInScreen = ({ navigation }) => {
  const [show, SetShow] = useState(true);
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const {
    auth,
    setAuth,
    user,
    setUser,
    notification,
    setNotification,
    ad,
    setAd,
  } = React.useContext(AuthContext);

  const HandleSignIn = async () => {
    setLoading(true);
    const note = await getNotification();
    const ad = await getAd();

    if (ad.data) {
      console.log(ad.data);
      setAd(ad.data);
    }

    if (note.data) {
      setNotification(note.data.notifications);
    }

    if (username === undefined || password === undefined) {
      setLoading(false);
      Alert.alert("LOGIN ERROR", "you skipped a field !");
    } else {
      const res = await signIn({ username, password });
      if (res.data) {
        await setUser(res.data.user);
        setAuth(true);
      } else {
        setLoading(false);
        Alert.alert("LOGIN ERROR");
      }
    }
  };

  function HandleEmail(val) {
    setUsername(val.trim());
  }

  function HandlePassword(val) {
    setPassword(val);
  }

  function showPassword() {
    SetShow(!show);
  }

  if (loading === true) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome !</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <Feather name="mail" size={20} color="#05375a" />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => HandleEmail(val)}
          />
          {data ? (
            <Feather name="check-circle" color="#d90166" size={20} />
          ) : null}
        </View>

        <Text style={[styles.text_footer, { marginTop: 20 }]}>Password</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" size={20} color="#05375a" />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => HandlePassword(val)}
            secureTextEntry={show}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={() => showPassword()}>
            {show ? (
              <Feather name="eye-off" color="#d90166" size={20} />
            ) : (
              <Feather name="eye" color="#d90166" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              HandleSignIn();
            }}
          >
            <LinearGradient
              colors={["#FF1493", "#FFB6C1"]}
              style={[styles.signIn, { borderRadius: 12, width: "100%" }]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "white",
                    paddingHorizontal: 120,
                    fontWeight: "bold",
                    width: "100%",
                  },
                ]}
              >
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={[styles.button]}>
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={() => {
              navigation.navigate("SignUpScreen");
            }}
            style={{
              borderColor: "#FF1493",
              borderRadius: 12,
              borderWidth: 1.5,
              marginTop: 0,
            }}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#FF1493",
                  paddingHorizontal: 120,
                  paddingVertical: 10,
                  width: "100%",
                  fontWeight: "900",
                },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("Reset");
          }}
        >
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 17, color: "#05375a" }}>
              Forgot password?
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#05375a",
    fontWeight: "bold",
    fontSize: 30,
  },

  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: -3,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 20,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
