import {View,Text,Image,Dimensions,TouchableOpacity,ScrollView,TouchableOpacityComponent,FlatList,} from "react-native";
import React, { useEffect, useState } from "react";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSnackbar } from "zmp-ui";
import { set } from "date-fns";
import { Avatar } from "zmp-ui";
const heightScreen = Dimensions.get("window").height;
const widthScreen = Dimensions.get("window").width;
const Tab = createMaterialTopTabNavigator();
const BanBe = ({ route, navigation }) => {
  const sdt = route.params?.user;
  const { openSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [myID, setMyID] = useState();
  const [listAddFriend, setListAddFriend] = useState([]);
  const [listSDTAddFriend, setListSDTAddFriend] = useState([]);
  const [themOk, setThemOk] = useState(false);
  const [xoaOK, setXoaOK] = useState(false);
  const [dsusers, setDsusers] = useState([]);
  const [req, setReq] = useState([]);
  const [user, setUser] = useState({});

  const fetchUsers = () => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((usersss) => {
        if (usersss) setDsusers(usersss);
      });
  };
  const fetchReq = () => {
    fetch("http://localhost:3000/requestAdd")
      .then((response) => response.json())
      .then((json) => {
        if (json) setReq(json);
      });
  };
  useEffect(fetchUsers, [sdt]);
  useEffect(fetchReq, [sdt, themOk, xoaOK]);
  // Viết hàm xóa trên requestAdd và thêm bạn bè vào danh sách bạn bè
  const handleAccept = async (sdt, userID, sdt2) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${myID}`);
      const data1 = await response.json();

      const response2 = await fetch(`http://localhost:3000/users/${myID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friends: [...data1.friends, userID],
        }),
      });
      const friend2 = await fetch(`http://localhost:3000/users/${userID}`);
      const data2 = await friend2.json();

      const response3 = await fetch(`http://localhost:3000/users/${userID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friends: [...data2.friends, myID],
        }),
      });
      console.log("Patch User Response:", await response3.json());

      const reqAdd = req.find(
        (e) => e.friendPhone === sdt && e.myPhone === sdt2
      );
      // delete reqAdd
      fetch(`http://localhost:3000/requestAdd/${reqAdd.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Delete Request Response 2:", json);
        });

      setThemOk(!themOk);
      openSnackbar({
        text: "Đã chấp nhận lời mời kết bạn!",
        type: "success",
        position: "top",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (sdt, sdt2) => {
    try {
      const reqAdd = req.find(
        (e) => e.friendPhone === sdt && e.myPhone === sdt2
      );
      // delete reqAdd
      fetch(`http://localhost:3000/requestAdd/${reqAdd.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Delete Request Response 2:", json);
        });

      openSnackbar({
        text: "Đã hủy lời mời kết bạn!",
        type: "success",
        position: "top",
      });

      setXoaOK(!xoaOK);
    } catch (error) {
      console.log(error);
    }
  };
  // load hết conversation 
  // load hết user
  const [conversations, setConversations] = useState([]);

  const fetchConversations = () => {
    fetch("http://localhost:3000/conversations")
      .then((response) => response.json())
      .then((json) => {
        if (json) setConversations(json);
      });
  };
  useEffect(fetchUsers, []);
  useEffect(fetchConversations, []);

  useEffect(() => {
    const addList = async () => {
      try {
        // Fetch friend data based on the provided phone number (sdt)
        const addFriendResponse = await fetch(
          `http://localhost:3000/requestAdd?friendPhone=${sdt}`
        );
        const addFriendData = await addFriendResponse.json();
        console.log("addFriendData", addFriendData);

        // Set the list of friend phone numbers
        setListSDTAddFriend(addFriendData);

        // Use Promise.all to wait for all asynchronous operations
        const dataPromises = addFriendData.map(async (item) => {
          const friendResponse = await fetch(
            `http://localhost:3000/users?soDienThoai=${item.myPhone}`
          );
          const friendData = await friendResponse.json();
          console.log("friendData", friendData);
          return friendData;
        });

        // Wait for all promises to resolve and set the list of friends
        const friendData = await Promise.all(dataPromises);
        setListAddFriend(friendData);
      } catch (error) {
        console.log(error);
      }
    };

    // Call addList when the component mounts or when sdt changes
    addList();
    const fetchFriendsList = async () => {
      try {
        // Step 1: Fetch user data
        // lấy myID
        const myResponse = await fetch(
          `http://localhost:3000/users?soDienThoai=${sdt}`
        );
        const myData = await myResponse.json();
        setMyID(myData[0].id);

        const userResponse = await fetch("http://localhost:3000/users");
        const userData = await userResponse.json();

        // Step 2: Find the user by phone number (sdt)
        const currentUser = userData.find((user) => user.soDienThoai === sdt);

        if (!currentUser) {
          console.error("User not found");
          return;
        }

        // Step 3: Fetch conversations
        const conversationsResponse = await fetch(
          "http://localhost:3000/conversations"
        );
        const conversationsData = await conversationsResponse.json();

        // Step 4: Fetch user data for each friend
        const dataPromises = currentUser.friends.map(async (friendId) => {
          const friendResponse = await fetch(
            `http://localhost:3000/users/${friendId}`
          );
          const friendData = await friendResponse.json();

          // Step 5: Find the conversation between current user and friend
          const conversation = conversationsData.find((conversation) => {
            const participants = conversation.participants;
            return (
              participants.includes(currentUser.id) &&
              participants.includes(friendData.id)
            );
          });

          return {
            id: friendData.id,
            ten: friendData.ten,
            conversationId: conversation?.id || null,
            status: friendData.status,
          };
        });

        // Step 6: Update the state with the data
        const dataResult = await Promise.all(dataPromises);
        setData(dataResult);
      } catch (error) {
        console.error("Error fetching friends and conversations:", error);
      }
    };

    fetchFriendsList();
  }, [sdt, themOk, xoaOK]);

  console.log(listAddFriend);

  const total = data.length;

  const online = data.reduce((count, item) => {
    return item.status === "online" ? count + 1 : count;
  }, 0);
  const [loc, setLoc] = React.useState("offline");
  const [type, setType] = React.useState([
    {
      id: 1,
      name: "Tất cả",
      component: "offline",
      isSelected: true,
    },
    {
      id: 2,
      name: "Mới truy cập",
      component: "online",
      isSelected: false,
    },
  ]);

  return (
    <View
      style={{
        flex: 1,
        width: widthScreen,
        height: heightScreen,
      }}
    >
      <View
        style={{
          width: widthScreen,
          height: "auto",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {listAddFriend.length === 0 ? (
          <View></View>
        ) : (
          <FlatList
            data={listAddFriend}
            renderItem={({ item }) => {
              let avatarFriend;

              if (listAddFriend.length > 0) {
                try {
                  const friendReq = req.find((e) => e.friendPhone === sdt);
                  setUser(
                    dsusers.find((e) => e.soDienThoai === friendReq.myPhone)
                  );
                  avatarFriend = require(`../assets/stories/${user.avatar}`);
                } catch (error) {
                  avatarFriend = require(`../assets/stories/defaultAvatar.jpg`);
                }
              }
              return (
                <View
                  key={item.id}
                  style={{
                    marginTop: 5,
                    height: 150,
                    width: widthScreen - 30,
                    backgroundColor: "white",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: "lightgray",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        marginLeft: 10,
                      }}
                      source={avatarFriend}
                    />

                    <Text style={{ fontSize: 18, marginLeft: 10 }}>
                      Lời mời kết bạn từ:{" "}
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {listAddFriend.length === 0 ? "" : user.ten}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                      justifyContent: "center",
                      gap: 20,
                    }}
                  >
                    {/* 2 nút bo tròn chấp nhận và hủy TouchOpacity, chấp nhận xanh dương, hủy màu trắng */}
                    <TouchableOpacity
                      onPress={async () =>
                        await handleAccept(
                          sdt,
                          listAddFriend.length === 0 ? "" : user.id,
                          listAddFriend.length === 0
                            ? ""
                            : listAddFriend.length === 0
                            ? ""
                            : user.soDienThoai
                        )
                      }
                      style={{
                        height: 30,
                        width: 100,
                        borderRadius: 15,
                        backgroundColor: "#1A79F9",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 10,
                      }}
                    >
                      <Text style={{ color: "white" }}>Chấp nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () =>
                        await handleCancel(
                          sdt,
                          listAddFriend.length === 0 ? "" : user.soDienThoai
                        )
                      }
                      style={{
                        height: 30,
                        width: 100,
                        borderRadius: 15,
                        backgroundColor: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 10,
                        borderWidth: 1,
                      }}
                    >
                      <Text style={{ color: "black" }}>Hủy</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
      <View style={{ height: 192 }}>
        <View
          style={{
            backgroundColor: "#fff",
            width: widthScreen,
            position: "absolute",
            height: 185,
          }}
        />
        <View
          style={{
            top: 7,
            left: 26,
            width: 377,
            paddingHorizontal: 0,
            paddingVertical: 13,
            position: "absolute",
          }}
        >
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <View style={{ height: 40, width: 40 }}>
              <View
                style={{
                  borderRadius: 13,
                  height: 40,
                  width: 40,
                  backgroundColor: "#1A79F9",
                  position: "absolute",
                }}
              ></View>
              <Image
                style={{
                  marginTop: -15,
                  marginLeft: -15,
                  top: "50%",
                  left: "50%",
                  width: 30,
                  height: 30,
                  position: "absolute",
                }}
                contentFit="cover"
                source={require("../assets/useraccount.png")}
              />
            </View>
            <Text
              style={{
                height: 29,
                color: Color.colorBlack,
                width: 329,
                display: "flex",
                textAlign: "left",
                fontFamily: FontFamily.robotoRegular,
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              Lời mời kết bạn
            </Text>
          </View>
          <View style={{ marginTop: 12, flexDirection: "row" }}>
            <View style={{ height: 40, width: 40 }}>
              <View
                style={{
                  borderRadius: 13,
                  height: 40,
                  width: 40,
                  backgroundColor: "#1A79F9",
                  position: "absolute",
                }}
              ></View>
              <Image
                style={{
                  marginTop: -15,
                  marginLeft: -15,
                  top: "50%",
                  left: "50%",
                  width: 30,
                  height: 30,
                  position: "absolute",
                }}
                contentFit="cover"
                source={require("../assets/addressbook2.png")}
              />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  height: 29,
                  color: Color.colorBlack,
                  width: 329,
                  display: "flex",
                  textAlign: "left",
                  fontFamily: FontFamily.robotoRegular,
                  alignItems: "center",
                }}
              >
                Danh bạ máy
              </Text>
              <Text
                style={{
                  fontSize: FontSize.size_xs,
                  color: "gray",
                  height: 15,
                  marginTop: -5,
                  width: 329,
                  display: "flex",
                  textAlign: "left",
                  fontFamily: FontFamily.robotoRegular,
                  alignItems: "center",
                }}
              >
                Các liên hệ có dùng Zalo
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <View style={{ height: 40, width: 40 }}>
              <View
                style={{
                  borderRadius: 13,
                  height: 40,
                  width: 40,
                  backgroundColor: "#1A79F9",
                  position: "absolute",
                }}
              ></View>
              <Image
                style={{
                  marginTop: -15,
                  marginLeft: -15,
                  top: "50%",
                  left: "50%",
                  width: 30,
                  height: 30,
                  position: "absolute",
                }}
                contentFit="cover"
                source={require("../assets/birthdaycake.png")}
              />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  height: 29,
                  color: Color.colorBlack,
                  width: 329,
                  display: "flex",
                  textAlign: "left",
                  fontFamily: FontFamily.robotoRegular,
                  alignItems: "center",
                }}
              >
                Lịch sinh nhật
              </Text>
              <Text
                style={{
                  fontSize: FontSize.size_xs,
                  color: "gray",
                  height: 15,
                  marginTop: -5,
                  width: 329,
                  display: "flex",
                  textAlign: "left",
                  fontFamily: FontFamily.robotoRegular,
                  alignItems: "center",
                }}
              >
                Theo dõi sinh nhật của bạn bè
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          height: heightScreen - 192,
          width: widthScreen,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            height: 50,
            width: widthScreen,
            backgroundColor: "white",
            borderBottomWidth: 0.1,
            borderBottomColor: "lightgray",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {type.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setLoc(item.component);
                setType(
                  type.map((e) =>
                    e.id === item.id
                      ? { ...e, isSelected: true }
                      : { ...e, isSelected: false }
                  )
                );
              }}
              style={{
                height: 30,
                marginLeft: 20,
                width: "auto",
                borderWidth: 1,
                borderColor: "lightgray",
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 10,
                backgroundColor: item.isSelected ? "lightgray" : "white",
              }}
            >
              <View>
                {item.name == "Tất cả" ? (
                  <Text
                    style={{
                      color: item.isSelected ? Color.colorBlue : "gray",
                      fontWeight: item.isSelected ? "bold" : "normal",
                      fontFamily: FontFamily.robotoRegular,
                    }}
                  >
                    {item.name} {total}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: item.isSelected ? Color.colorBlue : "gray",
                      fontWeight: item.isSelected ? "bold" : "normal",
                      fontFamily: FontFamily.robotoRegular,
                    }}
                  >
                    {item.name} {online}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 415, width: widthScreen, overflow: "scroll" }}>
          <ScrollView>
            {data
              .filter(
                (item) =>
                  item &&
                  item.status &&
                  item.status.includes(loc === "offline" ? "" : "online")
              )
              .map((item) => {
                let avatarFriend;
                const conversation = conversations.find(
                  (conversation) => conversation.id === item.conversationId
                );
                conversation?.participants.map((userID) => {
                  if (userID !== myID) {
                    const user = dsusers.find((user) => user.id === userID);
                    try {
                      avatarFriend = require(`../assets/stories/${user.avatar}`);
                    } catch (error) {
                      avatarFriend = require(`../assets/stories/defaultAvatar.jpg`);
                    }
                  }
                });

                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Chat", {
                        myID: myID,
                        chatID: item.conversationId,
                        name: item.ten,
                      });
                    }}
                    key={item.id}
                    style={{
                      marginTop: 1,
                      height: 60,
                      width: widthScreen,
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    {/* {item.status === "offline" ? (
                    <View
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        marginLeft: 15,
                        marginRight: 10,
                        backgroundColor: "lightblue",
                      }}
                    ></View>
                  ) : (
                    <View style={{ marginRight: 25 }}>
                      <View
                        style={{
                          height: 50,
                          width: 50,
                          borderRadius: 25,
                          top: 5,
                          left: 15,
                          backgroundColor: "red",
                          position: "relative",
                        }}
                      ></View>
                      <View
                        style={{
                          height: 12,
                          width: 12,
                          borderRadius: 25,
                          left: 52,
                          top: -6,
                          backgroundColor: "#5DDE45",
                          position: "relative",
                          borderWidth: 2,
                          borderColor: "white",
                        }}
                      ></View>
                    </View>
                  )} */}

                    <Avatar
                      src={avatarFriend}
                      online={item.status === "online"}
                      size={50}
                      style={{ marginLeft: 12, marginRight: 12 }}
                    />
                    <View>
                      <Text style={{ fontSize: 16 }}>{item.ten}</Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        marginRight: 70,
                        right: 20,
                        padding: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={require("../assets/call.png")}
                        style={{
                          height: 23,
                          width: 23,
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        marginRight: 30,
                        right: 0,
                        padding: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={require("../assets/videocall.png")}
                        style={{
                          height: 23,
                          width: 23,
                        }}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default BanBe;
