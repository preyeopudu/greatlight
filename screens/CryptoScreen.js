import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Loading } from "../components/Loading";
import { userWithdraw, cryptoWithdraw } from "../api/user-api";
import { AuthContext } from "../components/context";

export const CryptoScreen = () => {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState();
  const [amount, setAmount] = useState();
  const [facebook, setFacebook] = useState();
  const { auth, setAuth, user, setUser, notification, setNotification } =
    React.useContext(AuthContext);

  const amountHandler = (input) => {
    setAmount(input.replace(/[^0-9]/g, ""));
  };

  const HandleWithdraw = async () => {
    if (amount == undefined || wallet == undefined) {
      Alert.alert("Invalid credentials", "Fill the form properly.");
    } else if (wallet.length <= 25) {
      Alert.alert("invalid wallet address");
    } else if (amount < 1000) {
      Alert.alert("Invalid amount", "Wothdraw above 999");
    } else {
      setLoading(true);
      const res = await cryptoWithdraw(user.username, {
        wallet,
        amount,
        facebook,
      });
      console.log(res);
      if (res.data.user) {
        setUser(res.data.user);
        Alert.alert("Succesful", "Payment has been added to queue");
        setLoading(false);
      } else if (res.data.insufficient) {
        Alert.alert("Insufficient balance", "Failed to add to queue");
        setLoading(false);
      } else if (res.data.active) {
        Alert.alert("Active on a plan", "Failed to add to queue");
        setLoading(false);
      }
    }
  };

  if (loading == true) {
    return <Loading />;
  } else {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 30,
            flex: 1,
          }}
        >
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="bank-transfer-out"
              size={24}
              color="#05375a"
            />
            <TextInput
              placeholder="(TRC20) wallet Address"
              style={styles.textInput}
              onChangeText={(val) => {
                setWallet(val);
              }}
            />
          </View>

          <View style={styles.action}>
            <MaterialCommunityIcons
              name="credit-card-check-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Amount"
              style={styles.textInput}
              keyboardType="decimal-pad"
              onChangeText={(val) => {
                setAmount(val);
              }}
            />
          </View>

          <View style={styles.action}>
            <MaterialCommunityIcons name="facebook" size={24} color="#05375a" />
            <TextInput
              placeholder="Name on Facebook"
              style={styles.textInput}
              onChangeText={(val) => {
                setFacebook(val);
              }}
            />
          </View>

          <TouchableNativeFeedback onPress={() => HandleWithdraw()}>
            <View
              style={{
                backgroundColor: "white",
                marginTop: 30,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 15,
                elevation: 5,
              }}
            >
              <Text style={{ fontSize: 15 }}>Withdraw</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    marginTop: 40,
  },
  textInput: {
    flex: 1,
    marginTop: -3,
    paddingLeft: 10,
    color: "#05375a",
  },
});
