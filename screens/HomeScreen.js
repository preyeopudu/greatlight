import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  StatusBar,
  TouchableNativeFeedback,
} from "react-native";
import {
  EvilIcons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Buttons } from "../components/Button";
import { getBonus, notify } from "../api/user-api";
import { AuthContext } from "../components/context";
import { Invest } from "../components/Invest";
import { Ads } from "../components/Ads";
import * as Linking from "expo-linking";
import { AdMobInterstitial } from "expo-ads-admob";
import { Loading } from "../components/Loading";
import MarqueeText from "react-native-marquee";

export const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

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
  const [postContent, setPostContent] = useState(ad.ad[0].title);
  const [facebookShareURL, setFacebookShareURL] = useState(ad.ad[0].content);
  const postOnFacebook = () => {
    let facebookParameters = [];
    if (facebookShareURL) {
      facebookParameters.push("u=" + encodeURI(facebookShareURL));
      if (postContent) {
        facebookParameters.push("quote=" + encodeURI(postContent));
        const url =
          "https://www.facebook.com/sharer/sharer.php?" +
          facebookParameters.join("&");

        Linking.openURL(url)
          .then((data) => {
            alert("Share to receive bonus");
            HandleBonus();
          })
          .catch(() => {
            alert("Something went wrong");
          });
      }
    }
  };
  const HandleBonus = async () => {
    setLoading(true);
    const res = await getBonus(user.username);
    if (res.data.user) {
      setUser(res.data.user);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const notified = async () => {
    const res = await notify(user.username).catch((err) => {
      return { err };
    });
    console.log(res);
    setUser(res.data);
    navigation.navigate("Notification");
  };

  const messager = () => {
    Linking.openURL("mailto: greatlightinvestment@gmail.com");
  };

  const join = () => {
    Linking.openURL("https://t.me/greatlightinvestment");
  };

  let bell = <MaterialCommunityIcons name="bell" size={35} color="grey" />;
  let box = <View></View>;

  if (user.notice && user.notice == true) {
    bell = <MaterialCommunityIcons name="bell-alert" size={35} color="grey" />;
    box = (
      <View
        style={{
          paddingVertical: 30,
          backgroundColor: "orange",
          width: "80%",
          marginTop: 20,
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            notified();
          }}
        >
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              color: "white",
              elevation: 2,
            }}
          >
            Notification Alert!!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading == true) {
    return <Loading />;
  } else {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight + 10,
          backgroundColor: "white",
          marginTop: 30,
        }}
      >
        <View
          style={{
            right: 20,
            position: "absolute",
            paddingTop: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              notified();
            }}
          >
            <View>{bell}</View>
          </TouchableOpacity>
        </View>

        <MarqueeText
          style={{ fontSize: 14 }}
          duration={3000}
          marqueeOnStart
          loop
          marqueeDelay={1000}
          marqueeResetDelay={1000}
        >
          {notification[notification.length - 1].text}
        </MarqueeText>

        <View style={{ alignItems: "center", marginTop: 10 }}>
          <View style={[styles.wallet]}>
            <Text
              style={{
                color: "gray",
                fontWeight: "bold",
                marginLeft: 10,
                paddingTop: 10,
              }}
            >
              Portfolio balance
            </Text>
            <Text
              style={{
                fontSize: 29,
                fontWeight: "900",
                color: "black",
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              NGN {user.Amount}
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "100",
                color: "gray",
                textAlign: "right",
                fontWeight: "bold",
                marginTop: 10,
                marginBottom: 10,
                marginRight: 15,
              }}
            >
              NGN {user.deposit}.00
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginLeft: 20,
              marginTop: 15,
              width: "90%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "30%",
                marginLeft: 25,
                marginHorizontal: 5,
                flex: 1,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Withdraw")}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    elevation: 4,
                    paddingVertical: 12,
                    flexDirection: "row",
                    borderRadius: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "red", marginRight: 5, fontSize: 16 }}>
                    Withdraw
                  </Text>
                  <EvilIcons name="arrow-down" size={25} color="red" />
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: "30%",
                marginHorizontal: 5,
                marginRight: 25,
                flex: 1,
              }}
            >
              <TouchableOpacity activeOpacity={0.5} onPress={join}>
                <View
                  style={{
                    backgroundColor: "white",
                    elevation: 4,
                    paddingVertical: 10,
                    flexDirection: "row",
                    borderRadius: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "blue", marginRight: 5, fontSize: 16 }}>
                    Connect
                  </Text>
                  <EvilIcons name="sc-telegram" size={30} color="blue" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <Invest
            press={() => {
              navigation.navigate("Explore");
            }}
            onLoad={() => {
              postOnFacebook();
            }}
          />

          <TouchableOpacity
            activeOpacity={0.9}
            style={{ marginTop: 50, left: "35%" }}
            onPress={() => {
              messager();
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 30,
                width: "100%",
                elevation: 3,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                }}
              >
                <AntDesign name="message1" size={24} color="#c41678" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  wallet: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    elevation: 2,
    marginTop: 70,
  },

  button: {
    backgroundColor: "white",
    marginHorizontal: 10,
    elevation: 3,
    borderRadius: 5,
    alignItems: "center",
    width: "30%",
  },

  button_text: {
    fontSize: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
