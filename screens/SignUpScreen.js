import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Buttons } from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { Loading } from "../components/Loading";
import { AuthContext } from "../components/context";
import { signUp } from "../api/auth-api";
import { getNotification, getAd } from "../api/user-api";

export const SignUpScreen = ({ navigation }) => {
  const [show, SetShow] = useState(true);
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [referee, setReferer] = useState();
  const [password, setPassword] = useState();

  const { auth, setAuth, user, setUser, notification, setNotification } =
    React.useContext(AuthContext);

  function showPassword() {
    SetShow(!show);
  }

  function HandleEmail(val) {
    setUsername(val.trim());
  }

  function HandleName(val) {
    setName(val.trim());
  }

  function HandleReferer(val) {
    setReferer(val.trim());
  }

  function HandlePassword(val) {
    setPassword(val);
  }

  const HandleSignUp = async () => {
    setLoading(true);
    const note = await getNotification();
    const ad = await getAd();
    if (ad.data) {
      console.log(ad.data.ad);
      setAd(ad.data.ad);
    }
    if (note.data) {
      setNotification(note.data.notifications);
    }
    if (
      username === undefined ||
      password === undefined ||
      name === undefined
    ) {
      setLoading(false);
      Alert.alert("Error", "ooops you skipped an important field!");
    } else {
      const res = await signUp({ username, password, name, referee });

      console.log(res);
      if (res.data) {
        if (res.data.auth === true) {
          await setUser(res.data.user);
          console.log({ user });
          setAuth(true);
        } else if (res.data.error) {
          setLoading(false);
          Alert.alert("Sign up error");
        }
      }
    }
  };

  if (loading === true) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text_header}>Glad to Have you here..</Text>

      <View style={styles.action}>
        <FontAwesome name="user-o" size={20} color="#05375a" />
        <TextInput
          placeholder="Username"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => {
            HandleName(val);
          }}
        />
        {data ? (
          <Feather name="check-circle" color="#d90166" size={20} />
        ) : null}
      </View>

      <View style={styles.action}>
        <Feather name="mail" size={20} color="#05375a" />
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => {
            HandleEmail(val);
          }}
        />
        {data ? (
          <Feather name="check-circle" color="#d90166" size={20} />
        ) : null}
      </View>

      <View style={styles.action}>
        <FontAwesome name="user-o" size={20} color="#05375a" />
        <TextInput
          placeholder="Referer (optional)"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => {
            HandleReferer(val);
          }}
        />
        {data ? (
          <Feather name="check-circle" color="#d90166" size={20} />
        ) : null}
      </View>

      <View style={styles.action}>
        <FontAwesome name="lock" size={20} color="#05375a" />
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => {
            HandlePassword(val);
          }}
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
            Alert.alert(
              "Almost there....",
              "Do you agree to our terms and conditions ?",
              [{ text: "No" }, { text: "Yes", onPress: () => HandleSignUp() }]
            );
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
              Sign Up
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={[styles.button]}>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => {
            navigation.push("SignInScreen");
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
            Sign In
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Terms & Conditions");
          }}
        >
          <Text style={{ textAlign: "center" }}>Terms & Condition</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    flex: 0,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  text_header: {
    color: "#05375a",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 30,
    marginBottom: 20,
  },

  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 25,
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
