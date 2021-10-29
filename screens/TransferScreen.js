import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  StatusBar,
  RefreshControl,
} from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";

import { Ads } from "../components/Ads";
import { Plan } from "../components/Plan";
import { getUser, transfer } from "../api/user-api";
import { AuthContext } from "../components/context";
import { Loading } from "../components/Loading";

export const TransferScreen = ({ navigation }) => {
  const { auth, setAuth, user, setUser, notification, setNotification } =
    React.useContext(AuthContext);
  const [amount, SetAmount] = useState();
  const [receiver, setReceiver] = useState();
  const [loading, setLoading] = useState(false);

  const HandleSubmit = async () => {
    setLoading(true);
    if (receiver == null || amount == null) {
      setLoading(false);
      Alert.alert("Error", "No value entered");
    } else {
      const res = await transfer(user.username, { user: receiver, amount });
      if (res.data.userFalse) {
        setLoading(false);
        Alert.alert("User does not exist");
      } else if (res.data.success) {
        setLoading(false);
        Alert.alert("Sent Successfully");
        setUser(res.data.user);
      } else if (!res.data.success) {
        setLoading(false);
        Alert.alert("Insufficient balance");
      } else {
        setLoading(false);
        Alert.alert("Can't transfer");
      }
    }
  };

  const HandleAmount = (val) => {
    SetAmount(val);
  };

  const HandleReceiver = (val) => {
    setReceiver(val);
  };
  if (loading == true) {
    return <Loading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 120, width: "100%" }}>
          <View>
            <View style={{ width: "100%", paddingHorizontal: 30 }}>
              <View
                style={{
                  marginVertical: 20,
                  borderBottomColor: "grey",
                  borderBottomWidth: 1,
                  paddingHorizontal: 20,
                }}
              >
                <TextInput
                  style={{
                    textAlign: "center",
                    marginBottom: 10,
                    fontSize: 16,
                    color: "black",
                  }}
                  placeholder="Recipents mail"
                  placeholderTextColor="black"
                  autoCapitalize="none"
                  onChangeText={(val) => {
                    HandleReceiver(val);
                  }}
                />
              </View>

              <View
                style={{
                  marginVertical: 20,
                  borderBottomColor: "grey",
                  borderBottomWidth: 0.5,
                  paddingHorizontal: 20,
                }}
              >
                <TextInput
                  style={{
                    textAlign: "center",
                    marginBottom: 10,
                    fontSize: 16,
                    color: "black",
                  }}
                  placeholder="Amount To be Transferred"
                  placeholderTextColor="black"
                  autoCapitalize="none"
                  onChangeText={(val) => {
                    HandleAmount(val);
                  }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              marginTop: 40,
              width: "100%",
              paddingHorizontal: 30,
            }}
          >
            <TouchableOpacity
              onPress={HandleSubmit}
              activeOpacity={0.5}
              style={{
                borderColor: "white",
                elevation: 10,
                backgroundColor: "white",
                borderRadius: 10,
                borderWidth: 1,
                marginTop: 0,
                width: "100%",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <FontAwesome name="paper-plane" size={30} color="#c41678" />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate("Transactions")}
          >
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              View Transactions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: "100%",
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    flex: 1,
  },
  child: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 150,
    width: "90%",
    justifyContent: "center",
  },
  action: {
    flexDirection: "row",
    marginTop: 30,
    borderBottomWidth: 0.9,
    borderBottomColor: "black",
    paddingBottom: 5,
    marginBottom: 15,
    paddingTop: 10,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    marginTop: -3,
    paddingLeft: 10,
    color: "black",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
  },
});
