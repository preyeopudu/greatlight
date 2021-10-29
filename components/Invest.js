import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Share,
} from "react-native";
import { AuthContext } from "./context";
import { EvilIcons, Entypo, AntDesign } from "@expo/vector-icons";

export const Invest = (props) => {
  const { auth, setAuth, user, setUser, notification, setNotification } =
    React.useContext(AuthContext);
  let button;
  if (
    user.active == true &&
    Math.round((new Date(user.nextday) - Date.now()) / (60 * 1000)) <= 0
  ) {
    button = (
      <TouchableNativeFeedback onPress={() => props.onLoad()}>
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Entypo name="share" size={30} color="red" />
        </View>
      </TouchableNativeFeedback>
    );
  } else if (user.claimed == false) {
    button = (
      <TouchableNativeFeedback onPress={() => props.onLoad()}>
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "black",
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
          >
            <Entypo name="share" size={30} color="red" />
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  } else if (user.claimed == true) {
    button = (
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 15 }}>
          Reload in{" "}
          {Math.round((new Date(user.nextday) - Date.now()) / (60 * 60 * 1000))}{" "}
          hrs
        </Text>
      </View>
    );
  }
  if (user.plan.length >= 1) {
    return (
      <View
        style={{
          backgroundColor: "white",
          marginTop: 20,
          paddingVertical: 40,
          width: "90%",
          elevation: 4,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>{user.plan[0].name} PLAN</Text>

        {button}
      </View>
    );
  } else {
    return (
      <View
        style={{
          backgroundColor: "white",
          marginTop: 60,
          paddingVertical: 40,
          width: "90%",
          elevation: 4,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableNativeFeedback
            onPress={() => {
              props.press();
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: 100,
                alignItems: "center",
                elevation: 0.2,
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              <Entypo name="share" size={30} color="red" />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
};
