import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Linking,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  Easing,
  SafeAreaView,
} from "react-native";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Avatar, Box } from "zmp-ui";
import { FontFamily, Color } from "../GlobalStyles";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../features/chat/tinNhanSlice";
const heightScreen = Dimensions.get("window").height;
const widthScreen = Dimensions.get("window").width;
const { Group } = Avatar;
const TinNhan = ({ navigation, route }) => {
  const [chatList, setChatList] = useState([]);
  const sdt = route.params?.user;
  const [myID, setMyID] = useState();
  const [my, setMy] = useState();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.chat);
  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const options = [
    {
      name: "Thêm bạn",
      icon: require("../assets/themban.png"),
      action: () => {
        navigation.navigate("ThemBan", { sdt: sdt });
        resizeBox(0);
      },
    },
    {
      name: "Tạo nhóm",
      icon: require("../assets/taonhom.png"),
      action: () => {
        navigation.navigate("TaoNhom", { myID: myID, dsusers: dsusers });
        resizeBox(0);
      },
    },
    {
      name: "Cloud của tôi",
      icon: require("../assets/cloudcuatoi.png"),
      action: () => {
        resizeBox(0);
      },
    },
    {
      name: "Lịch Zalo",
      icon: require("../assets/lichzalo.png"),
      action: () => {
        resizeBox(0);
      },
    },
    {
      name: "Tạo cuộc gọi nhóm",
      icon: require("../assets/taocuocgoinhom.png"),
      action: () => {
        resizeBox(0);
      },
    },
    {
      id: 6,
      name: "Quản lý thiết bị đăng nhập",
      icon: require("../assets/quanlythietbidangnhap.png"),
      action: () => {
        resizeBox(0);
      },
    },
  ];

  // Khánh update ///////////////////////////////////

  // load hết conversation ra
  // load hết user ra

  const [dsusers, setDsusers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const fetchUsers = () => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((usersss) => {
        if (usersss) setDsusers(usersss);
      });
  };
  const fetchConversations = () => {
    fetch("http://localhost:3000/conversations")
      .then((response) => response.json())
      .then((json) => {
        if (json) setConversations(json);
      });
  };
  useEffect(fetchUsers, []);
  useEffect(fetchConversations, []);

  ///////////////////////////////////////////////////

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((json) => {
        const user = json.find(
          (user) => user.soDienThoai === route.params?.user
        );
        setMyID(user.id);
        setMy(user);
      });

    dispatch(fetchData(route.params?.user));
  }, [route.params?.user]);

  function resizeBox(to) {
    to === 0 ? setVisible(false) : setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      to === 0 ? setVisible(false) : setVisible(true);
    });
  }
  return (
    <View style={styles.TinNhan}>
      <Modal transparent visible={visible}>
        <SafeAreaView
          style={{ flex: 1 }}
          onTouchStart={() => resizeBox(0)}
          onTouchEnd={() => resizeBox(0)}
        >
          <Animated.View
            onPress={() => resizeBox(0)}
            style={{
              borderRadius: 8,
              borderColor: "#333",
              borderWidth: 1,
              backgroundColor: "#fff",
              position: "absolute",
              top: 45,
              right: 8,
              opacity: scale.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [{ scale }],
            }}
          >
            {options.map((op, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => op.action()}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: "7",
                  borderBottomColor: "#ccc",
                  borderBottomWidth: i === options.length - 1 ? 0 : 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Image source={op.icon} style={{ width: 30, height: 30 }} />
                  <Text style={{ marginLeft: 10 }}>{op.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </SafeAreaView>
      </Modal>
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
            height: 48,
            width: widthScreen,
            position: "absolute",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Image
            style={{ width: 30, height: 30, marginLeft: 20 }}
            contentFit="cover"
            source={require("../assets/search.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TimKiem");
            }}
          >
            <TextInput
              style={{
                fontSize: 18,
                color: "rgba(255, 255, 255, 0.6)",
                width: 200,
                height: 22,
                marginLeft: 20,
                textAlign: "left",
                outlineColor: "transparent",
                outlineStyle: "none",
              }}
              placeholder="Tìm kiếm"
              placeholderTextColor={"#b9dcff"}
            ></TextInput>
          </TouchableOpacity>

          <Image
            style={{
              width: 28,
              height: 28,
            }}
            contentFit="cover"
            source={require("../assets/qrcode.png")}
          />
          <TouchableOpacity
            onPress={() => {
              resizeBox(1);
            }}
          >
            <Image
              style={{
                width: 28,
                height: 28,
                marginLeft: 40,
              }}
              contentFit="cover"
              source={require("../assets/plusmath.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: heightScreen - 97,
          width: widthScreen,
        }}
      >
        <ScrollView>
          <FlatList
            data={chatData.data}
            renderItem={({ item }) => {
              let avatarFriend;
              const conversation = conversations.find(
                (conversation) => conversation.id === item.chatID
              );
              const isGroup = conversation?.participants.length > 2;
              let isOnline = false;
              conversation?.participants.map((userID) => {
                if (userID !== myID) {
                  const user = dsusers.find((user) => user.id === userID);
                  if (user.status === "online") isOnline = true;
                  try {
                    avatarFriend = require(`../assets/stories/${user.avatar}`);
                  } catch (error) {
                    avatarFriend = require(`../assets/stories/defaultAvatar.jpg`);
                  }
                }
              });

              const GrAvatar = () => {
                return (
                  <View
                    style={{
                      paddingLeft: 20,
                      marginRight: 10,
                      width: 60,
                      height: 60,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Group>
                      {conversation?.participants.map((userID) => {
                        if (userID !== myID) {
                          const user = dsusers.find(
                            (user) => user.id === userID
                          );
                          try {
                            avatarFriend = require(`../assets/stories/${user.avatar}`);
                          } catch (error) {
                            avatarFriend = require(`../assets/stories/defaultAvatar.jpg`);
                          }
                          return <Avatar key={user.id} src={avatarFriend} />;
                        }
                      })}
                    </Group>
                  </View>
                );
              };

              return (
                <TouchableOpacity
                  style={{
                    width: widthScreen,
                    height: 88,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("Chat", {
                      myID: myID,
                      chatID: item.id,
                      name: item.name,
                      isGroup,
                      avatarFriend,
                      dsusers,
                    });
                  }}
                >
                  {!isGroup ? (
                    // <Image
                    //   style={{
                    //     marginLeft: 10,
                    //     width: 60,
                    //     height: 60,
                    //     borderRadius: 30,
                    //   }}
                    //   source={avatarFriend}
                    // />
                    <Avatar
                      src={avatarFriend}
                      size={48}
                      style={{ marginLeft: 16, marginRight: 6 }}
                      story="default"
                      online={isOnline}
                    />
                  ) : (
                    <GrAvatar />
                  )}

                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: "column",
                      gap: 2,
                      height: 80,
                      width: widthScreen - 180,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        fontFamily: FontFamily.interRegular,
                        color: "#000",
                        width: "auto",
                        textAlign: "left",
                        height: 28,
                        overflow: "hidden",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#8e949a",
                        width: "auto",
                        overflow: "hidden",
                        height: 20,
                        fontFamily: FontFamily.robotoRegular,
                        textAlign: "left",
                      }}
                    >
                      {item.nameSendLastMessage === my?.ten
                        ? "Bạn"
                        : item.nameSendLastMessage}
                      : {item.lastMessages}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#848d92",
                      fontFamily: FontFamily.robotoRegular,
                      marginBottom: 35,
                    }}
                  >
                    {format(new Date(item.timeLastMessages), "dd/MM/yyyy")}
                  </Text>
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
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TinNhan: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 926,
    overflow: "hidden",
    width: "100%",
  },
});

export default TinNhan;
