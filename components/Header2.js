import { StyleSheet, Text, View } from "react-native";
import React from "react";
// import { LinearGradient } from "expo-linear-gradient";
import LinearGradient from "react-native-web-linear-gradient";
const Header2 = () => {
  return (
    <LinearGradient
      colors={["#006af5", "#52a0ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        zIndex: 1,
        flex: 1,
        width: "100%",
        height: 48,
        backgroundColor: "transparent",
        position: "fixed",
        top: 40,
        left: 0,
      }}
    />
  );
};

export default Header2;

const styles = StyleSheet.create({});
