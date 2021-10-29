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
} from "react-native";
import { Ads } from "../components/Ads";
import { Entypo } from "@expo/vector-icons";
import { Plan } from "../components/Plan";
import { getUser } from "../api/user-api";
import { AuthContext } from "../components/context";
import { Loading } from "../components/Loading";
import { addPlan } from "../api/plan-api";

export const ExploreScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState();
  const [loading, setLoading] = useState(false);
  const { auth, setAuth, user, setUser, notification, setNotification } =
    React.useContext(AuthContext);

  const HandlePLan = async (plan) => {
    setLoading(true);
    const res = await addPlan(user.username, plan);
    console.log(res.data);
    if (res.data.user) {
      setUser(res.data.user);
      setLoading(false);
      navigation.navigate("Home");
    } else if (res.data.active) {
      setLoading(false);
      navigation.navigate("Home");
      alert("Already on a plan");
    } else if (res.data.insufficient) {
      navigation.navigate("Home");
      setLoading(false);
      alert("Insufficient credit");
    } else {
      navigation.navigate("Home");
      setLoading(false);
      alert("Try again");
    }
  };

  const onRefresh = async () => {
    const res = await getUser(user.username);
    if (res.data) {
      setUser(res.data.user);
      console.log(res.data.user);
      setRefreshing(false);
    }
  };

  if (loading == true) {
    return <Loading />;
  } else {
    return (
      <View style={{ backgroundColor: "white" }}>
        <ScrollView
          style={{ marginTop: StatusBar.currentHeight, width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={{ textAlign: "center" }}>PULL TO REFRESH</Text>
          <View style={{ flex: 1, alignItems: "center", marginTop: 0 }}>
            <Plan
              title={"EMERALD"}
              detail={"invest 15k earn 650 daily (19,500)"}
              click={() => {
                Alert.alert("Purchase", "Emerald stack", [
                  { text: "Cancel" },
                  { text: "purchase", onPress: () => HandlePLan("emerald") },
                ]);
              }}
            />

            <Plan
              title={"RUBY"}
              detail={"invest 30k earn 1,300 daily (39,000)"}
              click={() => {
                Alert.alert("Purchase", "Ruby stack", [
                  { text: "Cancel" },
                  { text: "purchase", onPress: () => HandlePLan("ruby") },
                ]);
              }}
            />

            <Plan
              title={"SAPPHIRE"}
              detail={"invest 60k earn 2,600 daily (78,000)"}
              click={() => {
                {
                  Alert.alert("Purchase", "Sapphire stack", [
                    { text: "Cancel" },
                    { text: "purchase", onPress: () => HandlePLan("sapphire") },
                  ]);
                }
              }}
            />

            <Plan
              title={"ONYX"}
              detail={"invest 120k earn 5,200 daily (156,000)"}
              click={() => {
                {
                  Alert.alert("Purchase", "Onyx stack", [
                    { text: "Cancel" },
                    { text: "purchase", onPress: () => HandlePLan("onyx") },
                  ]);
                }
              }}
            />

            <Plan
              title={"CHRYSOLITE"}
              detail={"invest 240K earn 10,400 daily (312,000)"}
              click={() => {
                {
                  Alert.alert("Purchase", "Chyroslite stack", [
                    { text: "Cancel" },
                    {
                      text: "purchase",
                      onPress: () => HandlePLan("chrysolite"),
                    },
                  ]);
                }
              }}
            />

            <Plan
              title={"AGATE"}
              detail={"invest 480k earn 25,600 daily (768,000)"}
              click={() => {
                {
                  Alert.alert("Purchase", "Agate stack", [
                    { text: "Cancel" },
                    { text: "purchase", onPress: () => HandlePLan("agate") },
                  ]);
                }
              }}
            />

            <Plan
              title={"AMETHYST"}
              detail={"invest 960k earn 51,200 daily (1,536,000)"}
              click={() => {
                {
                  Alert.alert("Purchase", "Amethyst stack", [
                    { text: "Cancel" },
                    { text: "purchase", onPress: () => HandlePLan("amethyst") },
                  ]);
                }
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
};
