import {Pressable, StyleSheet, Text, View, TextInput, Image} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";

const LayLaiMatKhau = ({ navigation }) => {
  const [soDienThoai, setSoDienThoai] = useState("");
  const handleNavigate = () => {};
  return (
    <View style={styles.contaiter}>
      <View style={styles.header}>
        <Header1 />
        <Header2 />
        <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            source={require("../assets/arrow-left.svg")}
          />
        </Pressable>
        <Text style={styles.text1}> Đăng nhập </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.wraptext2}>
          <Text style={styles.text2}>
            Nhập số điện thoại để lấy lại mật khẩu
          </Text>
        </View>
        <TextInput
          style={styles.input1}
          placeholder="Số điện thoại"
          placeholderTextColor="#666"
          value={soDienThoai}
          onChangeText={setSoDienThoai}
        />
      </View>
      <Pressable style={styles.wrapicon} onPress={handleNavigate}>
        <Image
          style={styles.icon2}
          source={require("../assets/arrow-right.svg")}
        />
      </Pressable>
    </View>
  );
};

export default LayLaiMatKhau;

const styles = StyleSheet.create({
  contaiter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    width: "100%",
    overflow: "hidden",
  },
  header: {
    width: "100%",
  },
  header2: {},
  btn: {
    zIndex: 1,
    position: "absolute",
    left: 16,
    top: 52,
  },
  icon: {
    width: 22,
    height: 30,
  },
  text1: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    textAlign: "left",
    width: "100%",
    height: 22,
    zIndex: 1,
    top: 54,
    left: 50,
  },
  wraptext2: {
    backgroundColor: "#F3F4F6",
    width: "100%",
    position: "absolute",
    height: 43,
    left: 0,
    top: -28,
    justifyContent: "center",
    paddingLeft: 20,
  },
  text2: {},
  text3: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1993f3",
    textAlign: "left",
    width: 157,
    height: 33,
    paddingTop: 10,
  },

  input1: {
    width: "100%",
    height: 40,
    outlineStyle: "none",
    marginBottom: 8,
    borderBottomColor: "#dfdfdf",
    borderBottomWidth: 2,
    marginTop: 40,
  },
  input2: {
    width: "100%",
    height: 40,
    borderBottomColor: "#23D1F4",
    borderBottomWidth: 2,
    outlineStyle: "none",
    marginBottom: 8,
  },
  body: {
    marginTop: 95,
    width: "100%",
    paddingHorizontal: 16,
  },
  icon2: {
    width: 22,
    height: 30,
  },
  wrapicon: {
    zIndex: 1,
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 52,
    height: 52,
    backgroundColor: "#66ADE6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
