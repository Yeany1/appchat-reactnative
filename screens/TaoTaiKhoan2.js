import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import checkboxUnchecked from "../assets/checkbox.svg";
import checkboxChecked from "../assets/checkbox1.svg";
import { Box, Button, Modal, useSnackbar } from "zmp-ui";
const TaoTaiKhoan2 = ({ navigation, route }) => {
    const [soDienThoai, setSoDienThoai] = useState("0333900858");
    const [matKhau, setMatKhau] = useState("123456");
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const { openSnackbar } = useSnackbar();
    const handleNavigate = () => {
        // viết một phương thức để hash mật khẩu 1 chiều
        const md5 = require('md5');
        if (soDienThoai.trim() === "") alert("Vui lòng nhập số điện thoại");
        else if (matKhau.trim() === "") alert("Vui lòng nhập mật khẩu");
        else if( !checked || !checked2) alert("Vui lòng đồng ý với các điều khoản");
        else {
            fetch(`http://localhost:3000/users?soDienThoai=${soDienThoai}`)
                .then(res => res.json())
                .then((users) => {
                    if(users.length > 0) {
                        setPopupVisible(true);
                    }
                    else
                        fetch('http://localhost:3000/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body : JSON.stringify({
                                soDienThoai: soDienThoai,
                                matKhau: md5(matKhau),
                                ten: route.params.ten,
                                trangThai: "offline",
                                friends: [],
                                avatar: "defaultAvatar.jpg",
                                background: "41.jpg",
                            })   
                        })
                        .then(() => {
                            openSnackbar({
                                text: "Đăng ký tài khoản thành công!",
                                type: "success",
                                position: 'top'
                            });
                            navigation.navigate({
                                name: "DangNhap",
                                params: { soDienThoai },
                            });
                        })
                })
        }
    };
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
        <Text style={styles.text1}>Tạo tài khoản</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.wraptext2}>
          <Text style={styles.text2}>
            Nhập số điện thoại của bạn để tạo tài khoản mới
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <TextInput
            style={styles.input2}
            placeholder="Nhập số điện thoại"
            placeholderTextColor="#666"
            value={soDienThoai}
            onChangeText={setSoDienThoai}
          />
          <TextInput
            style={styles.input2}
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#666"
            value={matKhau}
            onChangeText={setMatKhau}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.wrapqd}>
          <Pressable
            style={styles.checkbox}
            onPress={() => setChecked(!checked)}
          >
            <Image
              style={styles.checkboxicon}
              source={checked ? checkboxChecked : checkboxUnchecked}
            />
          </Pressable>
          <Text style={styles.text2}>
            Tôi đồng ý với các{" "}
            <Text style={styles.textblue}>điều khoản sử dụng Zalo</Text>
          </Text>
        </View>
        <View style={styles.wrapqd}>
          <Pressable
            style={styles.checkbox}
            onPress={() => setChecked2(!checked2)}
          >
            <Image
              style={styles.checkboxicon}
              source={checked2 ? checkboxChecked : checkboxUnchecked}
            />
          </Pressable>
          <Text style={styles.text2}>
            Tôi đồng ý với các{" "}
            <Text style={styles.textblue}>điều khoản Mạng xã hội của Zalo</Text>
          </Text>
        </View>
      </View>
      <Pressable style={styles.wrapicon} onPress={handleNavigate}>
        <Image
          style={styles.icon2}
          source={require("../assets/arrow-right.svg")}
        />
      </Pressable>
      <Modal
                visible={popupVisible}
                title="Opps!"
                onClose={() => {
                setPopupVisible(false);
                }}
                verticalActions
                description="Số điện thoại này đã được đăng ký, vui lòng thử lại bằng số khác!"
            >
                <Box p={6}>
                <Button
                    onClick={() => {
                    setPopupVisible(false);
                    }}
                    fullWidth
                    variant="secondary"
                    type="danger"
                >
                    Xác nhận
                </Button>
                </Box>
            </Modal>
    </View>
  );
};

export default TaoTaiKhoan2;

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
  text2: {
    fontSize: 16,
  },
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
    // marginTop: 40,
    fontSize: 16,
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

  wrapqd: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  checkbox: {},
  checkboxicon: {
    width: 27,
    height: 27,
    marginRight: 10,
  },
  textblue: {
    color: "#1395fc",
    fontWeight: 600,
  },
});
