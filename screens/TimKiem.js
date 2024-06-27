import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Input, Avatar } from "zmp-ui";
const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const TimKiem = (props) => {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const [textSearch, setTextSearch] = useState("");
  const [miniApps, setMiniApps] = useState([]);
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, miniAppResponse] = await Promise.all([
          fetch("http://localhost:3000/users"),
          fetch("http://localhost:3000/miniApps"),
        ]);

        const [userJson, miniAppJson] = await Promise.all([
          userResponse.json(),
          miniAppResponse.json(),
        ]);
        setListUser(userJson);
        setMiniApps(miniAppJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handelTextSearch = (text) => {
    setTextSearch(text);
  };
  const MiniAppItem = ({ item }) => {
    return (
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "22vw",
          paddingBottom: 20,
          overflow: "hidden",
        }}
        numberOfLines={2}
        onPress={() => {
          navigation.navigate("Mini app", { item });
        }}
      >
        <View
          style={{
            backgroundColor: "#F4F5F7",
            width: 48,
            height: 48,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require(`../assets/miniApp/${item.image}`)}
            style={{ width: 34, height: 34, borderRadius: 8 }}
          />
        </View>
        <Text
          style={{ width: 76, textAlign: "center", fontSize: 12 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        height: heightScreen,
        width: widthScreen,
        backgroundColor: "white",
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          height: 40,
          width: widthScreen,
        }}
        locations={[0, 0, 0.48, 0.63, 0.72]}
        colors={["#1d64cc", "#166fcb", "#0f7bcb", "#068aca", "#0293c8"]}
      />
      <View>
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            width: widthScreen,
            backgroundColor: "transparent",
            top: 0,
            height: 48,
          }}
          locations={[0, 0, 0.48, 0.63, 0.72]}
          colors={["#247bff", "#257cff", "#1e85fe", "#129afd", "#03b4fa"]}
        />
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 0,
            height: 48,
            width: widthScreen,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              goBack();
            }}
          >
            <Image
              source={require("../assets/left.png")}
              style={{ marginLeft: 3, height: 29, width: 22 }}
            />
          </TouchableOpacity>
          <Input.Search
            placeholder="Tìm kiếm"
            autoFocus={true}
            value={textSearch}
            style={{
              height: 36,
              width: widthScreen - 100,
              fontSize: 18,
              marginLeft: 5,
              color: "white",
              outlineColor: "transparent",
              outlineStyle: "none",
            }}
            clearable={true}
            onChange={() => {
              handelTextSearch();
            }}
          />
          <Pressable style={{ alignItems: "center", marginLeft: 10 }}>
            <Image
              source={require("../assets/qrcode.png")}
              style={{ width: 25, height: 25 }}
            />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          width: widthScreen,
          height: heightScreen - 88,
          flexDirection: "column",
        }}
      >
        <View
          style={{ width: widthScreen, height: 110, flexDirection: "column" }}
        >
          <Text style={{ margin: 5, fontWeight: "bold" }}>Truy cập nhanh</Text>
          <View
            style={{
              marginTop: 10,
              width: widthScreen,
              height: 100,
              overflow: "scroll",
              alignItems: "center",
            }}
          >
            <ScrollView horizontal={true}>
              <View style={{ flexDirection: "row", marginLeft: 35 }}>
                {miniApps.map((item) => {
                  if (item.recent)
                    return <MiniAppItem key={item.id} item={item} />;
                })}
              </View>
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            width: widthScreen,
            height: 110,
            flexDirection: "column",
            marginTop: 25,
          }}
        >
          <Text style={{ margin: 5, fontWeight: "bold" }}>Liên hệ gần đây</Text>
          <View
            style={{
              marginTop: 10,
              width: widthScreen,
              height: 100,
              overflow: "scroll",
              alignItems: "center",
            }}
          ></View>
        </View>
      </View>
    </View>
  );
};

export default TimKiem;
