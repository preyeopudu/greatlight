import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
  RefreshControl,
  FlatList,
} from "react-native";
import { Ads } from "../components/Ads";
import { Entypo } from "@expo/vector-icons";
import { Plan } from "../components/Plan";
import { getUser } from "../api/user-api";
import { AuthContext } from "../components/context";
import { Loading } from "../components/Loading";
import { addPlan } from "../api/plan-api";

export const Notification = ({ navigation }) => {
  const { auth, setAuth, user, setUser, notification, setNotification } =
    React.useContext(AuthContext);
  let DATA = notification.reverse();
  const Item = ({ item, onPress, style }) => (
    <View
      style={{
        elevation: 10,
        backgroundColor: "white",
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 25,
      }}
    >
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={{ color: "black", marginTop: 5, fontSize: 20 }}>
          {item.title}
        </Text>
        <Text style={{ color: "black", marginTop: 5, fontSize: 15 }}>
          {item.text}
        </Text>
        <Text
          style={{
            color: "black",
            textAlign: "right",
            marginTop: 15,
            marginBottom: 20,
            fontSize: 12,
            fontWeight: "800",
          }}
        >
          {new Date(item.date).toDateString()}
        </Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    return <Item item={item} onPress={() => setSelectedId(item._id)} />;
  };

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        flex: 1,
        height: "100%",
      }}
    >
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={DATA}
        keyExtractor={(item, index) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};
