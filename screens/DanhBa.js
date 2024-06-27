import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily } from "../GlobalStyles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BanBe from "./BanBe";
import Nhom from "./Nhom";
import OA from "./OA";
const heightScreen = Dimensions.get("window").height;
const widthScreen = Dimensions.get("window").width;
import { NavigationContainer } from "@react-navigation/native";
const Tab = createMaterialTopTabNavigator();
const DanhBa = ({ route }) => {
  const user = route.params?.user;
  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
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
            top: 0,
            width: widthScreen,
            backgroundColor: "transparent",
            position: "absolute",
            height: 48,
          }}
          locations={[0, 0, 0.48, 0.63, 0.72]}
          colors={["#247bff", "#257cff", "#1e85fe", "#129afd", "#03b4fa"]}
        />
        <View style={{ width: widthScreen, flexDirection: "row", alignItems: "center", height: 48}}>
          <Image style={{width: 30, height: 30, marginLeft: 20}} contentFit="cover" source={require("../assets/search.png")}/>
          <Text style={{fontSize: 18, color: "#b9dcff", width: 270, height: 22, marginLeft: 20, textAlign: "left"}}>Tìm kiếm</Text>
          <Image style={{width: 40, height: 40, right: 20, position: "absolute"}} contentFit="cover" source={require("../assets/addusermale.png")}/>
        </View>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Bạn bè" component={BanBe} initialParams={{ user: user }}/>
        <Tab.Screen name="Nhóm" component={Nhom} initialParams={{ user: user }}/>
        <Tab.Screen name="OA" component={OA} />
      </Tab.Navigator>
    </View>
  );
};

export default DanhBa;
