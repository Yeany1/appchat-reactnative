import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TinNhan from "./TinNhan";
import DanhBa from "./DanhBa";
import KhamPha from "./KhamPha";
import NhatKy from "./NhatKy";
import CaNhan from "./CaNhan";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, SnackbarProvider } from "zmp-ui";
const Tab = createBottomTabNavigator();
const BaseContainer = ({ route }) => {
  const user = route.params?.soDienThoai;
  const [selectedTab, setSelectedTab] = useState("Tin nhắn");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Tin nhắn") {
              iconName = focused ? "zi-chat-solid" : "zi-chat";
            } else if (route.name === "Danh bạ") {
              iconName = focused ? "zi-call-solid" : "zi-call";
            } else if (route.name === "Khám phá") {
              iconName = focused ? "zi-more-grid-solid" : "zi-more-grid";
            } else if (route.name === "Nhật ký") {
              iconName = focused ? "zi-clock-1-solid" : "zi-clock-1";
            } else if (route.name === "Cá nhân") {
              iconName = focused ? "zi-user-solid" : "zi-user";
            }

            return (
              <Icon
                icon={iconName}
                style={{ color: focused ? "#006AF5" : "#000" }}
              />
            );
          },
          tabBarActiveTintColor: "#006AF5",
          tabBarInactiveTintColor: "#000",
          tabBarLabelPosition: "below-icon",
          tabBarLabelStyle: {
            // paddingTop: 6,
            fontSize: 14,
          },
          tabBarItemStyle: {
            flexDirection: "column",
            justifyContent: "center",
          },
          tabBarStyle: {
            height: 78,
            paddingBottom: 30,
          },
          // i want change icon color
        })}
      >
        <Tab.Screen
          name="Tin nhắn"
          component={TinNhan}
          options={{
            headerShown: false,
            tabBarLabel: selectedTab === "Tin nhắn" ? "Tin nhắn" : "",
          }}
          initialParams={{ user: user }}
          listeners={({ navigation, route }) => ({
            focus: () => {
              setSelectedTab("Tin nhắn");
            },
            blur: () => {
              setSelectedTab("");
            },
          })}
        />
        <Tab.Screen
          name="Danh bạ"
          component={DanhBa}
          options={{
            headerShown: false,
            tabBarLabel: selectedTab === "Danh bạ" ? "Danh bạ" : "",
          }}
          initialParams={{ user: user }}
          listeners={({ navigation, route }) => ({
            focus: () => {
              setSelectedTab("Danh bạ");
            },
            blur: () => {
              setSelectedTab("");
            },
          })}
        />
        <Tab.Screen
          name="Khám phá"
          component={KhamPha}
          options={{
            headerShown: false,
            tabBarLabel: selectedTab === "Khám phá" ? "Khám phá" : "",
          }}
          initialParams={{ user: user }}
          listeners={({ navigation, route }) => ({
            focus: () => {
              setSelectedTab("Khám phá");
            },
            blur: () => {
              setSelectedTab("");
            },
          })}
        />
        <Tab.Screen
          name="Nhật ký"
          component={NhatKy}
          options={{
            headerShown: false,
            tabBarLabel: selectedTab === "Nhật ký" ? "Nhật ký" : "",
          }}
          initialParams={{ user: user }}
          listeners={({ navigation, route }) => ({
            focus: () => {
              setSelectedTab("Nhật ký");
            },
            blur: () => {
              setSelectedTab("");
            },
          })}
        />
        <Tab.Screen
          name="Cá nhân"
          component={CaNhan}
          options={{
            headerShown: false,
            tabBarLabel: selectedTab === "Cá nhân" ? "Cá nhân" : "",
          }}
          initialParams={{ user: user }}
          listeners={({ navigation, route }) => ({
            focus: () => {
              setSelectedTab("Cá nhân");
            },
            blur: () => {
              setSelectedTab("");
            },
          })}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BaseContainer;

const styles = StyleSheet.create({});
