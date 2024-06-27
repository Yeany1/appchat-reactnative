import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSnackbar } from "zmp-ui";
import React, { useState } from "react";
const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const ThemBan = (props) => {
  const { openSnackbar } = useSnackbar();
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const [sodienthoai, setSoDienThoai] = useState("");
  const handleTim = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?soDienThoai=${sodienthoai}`
      );
      const userData = await response.json();

      if (userData.length > 0) {
        await fetch("http://localhost:3000/requestAdd", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            myPhone: route.params.sdt,
            friendPhone: sodienthoai,
          }),
        });

        openSnackbar({
          text: "Gửi yêu cầu thành công!",
          type: "success",
          position: "top",
        });

        goBack();
      } else {
        openSnackbar({
          text: "Người dùng không tồn tại!",
          type: "error",
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error handling friend request:", error);

      openSnackbar({
        text: "Đã xảy ra lỗi khi xử lý yêu cầu kết bạn.",
        type: "error",
        position: "top",
      });
    }
  };

  return (
    <View style={{ flex: 1, width: widthScreen, height: heightScreen }}>
      <View
        style={{ backgroundColor: "#D5D5D9", height: 40, width: widthScreen }}
      ></View>
      <View
        style={{
          height: 48,
          width: widthScreen,
          backgroundColor: "#F7F7F7",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
        >
          <Image
            style={{ height: 30, width: 30, marginLeft: 20 }}
            source={require("../assets/leftBlack.png")}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>
          Thêm bạn
        </Text>
      </View>
      <View
        style={{
          height: 330,
          width: widthScreen,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ height: 330, width: 428 }}
          source={require("../assets/quetqr.png")}
        />
      </View>
      <View
        style={{
          height: 80,
          width: widthScreen,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          flexDirection: "row",
        }}
      >
        <TextInput
          style={{
            width: 280,
            height: 46,
            color: "black",
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            fontSize: 18,
          }}
          placeholder="Nhập số điện thoại"
          placeholderTextColor={"gray"}
          value={sodienthoai}
          onChangeText={(text) => setSoDienThoai(text)}
        ></TextInput>
        <TouchableOpacity onPress={handleTim}>
          <Image
            style={{ height: 50, width: 50, marginLeft: 5 }}
            source={require("../assets/nutThem.png")}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <View
          style={{
            height: 60,
            width: widthScreen,
            backgroundColor: "white",
            marginBottom: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{ height: 30, width: 30, marginLeft: 20 }}
            source={require("../assets/qrxanh.png")}
          />
          <Text style={{ fontSize: 16, marginLeft: 20 }}>Quét mã QR</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            height: 60,
            width: widthScreen,
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{ height: 30, width: 30, marginLeft: 20 }}
            source={require("../assets/danhbaxanh.png")}
          />
          <Text style={{ fontSize: 16, marginLeft: 20 }}>Danh bạ máy</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            height: 60,
            width: widthScreen,
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{ height: 30, width: 30, marginLeft: 20 }}
            source={require("../assets/groupxanh.png")}
          />
          <Text style={{ fontSize: 16, marginLeft: 20 }}>
            Bạn bè có thể quen
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ThemBan;
