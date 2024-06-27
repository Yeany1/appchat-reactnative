import {View, Image, Dimensions, TouchableOpacity, ScrollView} from "react-native";
import React from "react";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { Avatar, Text, Box } from "zmp-ui";
const { Group } = Avatar;
const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const Nhom = () => {
  const soNhom = 0;
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: heightScreen,
        flexDirection: "column",
        gap: 7,
      }}
    >
      <TouchableOpacity
        style={{
          height: 70,
          width: widthScreen,
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 55,
            width: 55,
            borderRadius: 100,
            backgroundColor: "#E9F6FF",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <Image
            style={{ width: 50, height: 50, alignSelf: "center" }}
            source={require("../assets/addmaleusergroup.png")}
          />
        </View>
        <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: 480 }}>
          Tạo nhóm mới
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: 150,
          width: widthScreen,
          backgroundColor: "white",
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            marginTop: 5,
            marginLeft: 20,
            fontFamily: FontFamily.robotoBold,
            fontSize: 15.5,
          }}
        >
          Tính năng nổi bật
        </Text>
        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 90,
              height: 115,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 28,
                borderColor: "black",
                borderWidth: 1,
                backgroundColor: "#F7F7F7",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../assets/tearoffcalendar.png")}
              />
            </View>
            <Text style={{ fontSize: 15 }}>Lịch</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 90,
              height: 115,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 28,
                borderColor: "black",
                borderWidth: 1,
                backgroundColor: "#F7F7F7",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../assets/alarmclock.png")}
              />
            </View>
            <Text style={{ fontSize: 15 }}>Nhắc hẹn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 90,
              height: 115,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 28,
                borderColor: "black",
                borderWidth: 1,
                backgroundColor: "#F7F7F7",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../assets/universe.png")}
              />
            </View>
            <Text style={{ fontSize: 15 }}>Nhóm Offline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 90,
              height: 115,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 28,
                borderColor: "black",
                borderWidth: 1,
                backgroundColor: "#F7F7F7",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../assets/image.png")}
              />
            </View>
            <Text style={{ fontSize: 15 }}>Chia sẻ ảnh</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: heightScreen - 355 + 10 + 6,
          width: widthScreen,
          backgroundColor: "white",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: 30,
            width: widthScreen,
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 500 }}>
            Nhóm đang tham gia ({soNhom})
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 30,
              width: 80,
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../assets/clock.png")}
            />
            <Text style={{ fontSize: 16, color: "gray" }}>Sắp xếp</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 380, width: widthScreen }}>
          <ScrollView>
            <TouchableOpacity
              style={{
                height: 80,
                width: widthScreen,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box mt={2} style={{ marginLeft: 10 }}>
                <Group maxCounter={3}>
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                </Group>
              </Box>
              <View style={{ width: 260, gap: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 500 }}>Tên nhóm</Text>
                <Text style={{ fontSize: 16, color: "gray" }}>
                  Nguyen Van A: hehe
                </Text>
              </View>
              <View>
                <Text style={{ color: "gray", position: "absolute", top: -30 }}>
                  17/06
                </Text>
              </View>
              <View
                style={{
                  bottom: 0,
                  right: 0,
                  width: widthScreen - 70,
                  alignSelf: "center",
                  borderBottomColor: "lightgray",
                  borderBottomWidth: 0.5,
                  position: "absolute",
                }}
              ></View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Nhom;
