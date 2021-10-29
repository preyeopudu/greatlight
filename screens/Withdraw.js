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
import { userWithdraw } from "../api/user-api";
import { AuthContext } from "../components/context";

export const Withdraw = () => {
  const [loading, setLoading] = useState(false);
  const [accountName, setAccountName] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [bank, setBankName] = useState();
  const [amount, setAmount] = useState();
  const [facebook, setFacebook] = useState();
  const { auth, setAuth, user, setUser, notification, setNotification } =
    React.useContext(AuthContext);

  const amountHandler = (input) => {
    setAmount(input.replace(/[^0-9]/g, ""));
  };

  const HandleWithdraw = async () => {
    if (
      amount == undefined ||
      bank == undefined ||
      accountName == undefined ||
      accountNumber == undefined
    ) {
      Alert.alert("Invalid credentials", "Fill the form properly.");
    } else {
      setLoading(true);
      const res = await userWithdraw(user.username, {
        accountNumber,
        accountName,
        bank,
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
              name="account-cash-outline"
              size={20}
              color="black"
            />
            <TextInput
              placeholder="Account Name"
              style={styles.textInput}
              onChangeText={(val) => {
                setAccountName(val);
              }}
            />
          </View>

          <View style={styles.action}>
            <MaterialCommunityIcons
              name="numeric-10-box"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Account Number"
              style={styles.textInput}
              onChangeText={(val) => {
                setAccountNumber(val);
              }}
            />
          </View>

          <View style={styles.action}>
            <MaterialCommunityIcons
              name="bank-transfer-out"
              size={24}
              color="#05375a"
            />
            <TextInput
              placeholder="Bank Name"
              style={styles.textInput}
              onChangeText={(val) => {
                setBankName(val);
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
