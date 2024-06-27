import React, { useEffect, useRef, useState } from "react";
import {StyleSheet, View, Pressable, Text, Dimensions, TouchableOpacity, TextInput, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Icon, Input } from "zmp-ui";
import { Padding, FontSize, FontFamily, Color } from "../GlobalStyles";
import { format } from "date-fns";
import { ScrollView } from "react-native-web";

const heightScreen = Dimensions.get("window").height;
const widthScreen = Dimensions.get("window").width;

const Chat = (props) => {
  const [clicked, setClicked] = useState(false);
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const myID = route.params.myID;
  const chatID = route.params.chatID;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [inputWidth, setInputWidth] = useState(200);
  const messName = route.params.name;
  const [scroll, setScroll] = useState(false);
  const scrollViewRef = useRef();

  const [dsusers, setDsusers] = useState([]);
  const fetchUsers = () => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((usersss) => {
        if (usersss) setDsusers(usersss);
      });
  };
  useEffect(fetchUsers, []);

  const handleTextChange = (text) => {
    if (text.length > 0) {
      setInputWidth(630);
    } else {
      setInputWidth(200);
    }
    setNewMessage(text);
  };
  const fetchMessenger = async () => {
    try {
      // Fetch conversations
      const conversationsResponse = await fetch(
        "http://localhost:3000/conversations"
      );
      const conversationsData = await conversationsResponse.json();
      const filteredConversations = conversationsData.filter(
        (conversation) =>
          conversation.id === chatID &&
          !conversation.participants.includes(myID)
      );

      // Fetch users
      const usersResponse = await fetch("http://localhost:3000/users");
      const usersData = await usersResponse.json();
      const usersMap = new Map(usersData.map((user) => [user.id, user]));

      // Fetch messages
      const messagesResponse = await fetch("http://localhost:3000/messages");
      const messagesData = await messagesResponse.json();
      const filteredMessages = messagesData.filter(
        (message) => message.conversationId === chatID
      );

      // Transform messages with additional information
      const formattedMessages = filteredMessages.map((message) => ({
        messageId: message.id,
        senderId: message.senderId,
        senderName: usersMap.get(message.senderId)?.ten, // Replace "Unknown" with a default name
        senderAvatar: usersMap.get(message.senderId)?.avatar || "", // Replace "" with a default avatar
        conversationId: message.conversationId,
        content: message.content,
        timestamp: message.timestamp,
      }));

      // Sort messages by timestamp
      const sortedMessages = formattedMessages.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      setMessages(sortedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      try {
        // Fetch messages first to get the current length
        const messagesResponse = await fetch("http://localhost:3000/messages");
        const messagesData = await messagesResponse.json();
        const currentMessagesLength = messagesData.length;
        setClicked(true);
        // Tạo một đối tượng tin nhắn mới với ID là updated length + 1
        const newMessageObj = {
          id: currentMessagesLength + 1, // ID tăng dần
          senderId: myID, // ID người gửi (có thể thay đổi theo logic của bạn)
          conversationId: chatID, // ID người nhận (có thể thay đổi theo logic của bạn)
          content: newMessage,
          timestamp: new Date().toISOString(), // Sử dụng thời gian hiện tại
        };

        await fetch("http://localhost:3000/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessageObj),
        })
          .then((response) => response.json())

          .catch((error) => {
            console.error("Error:", error);
          });

        // Cập nhật state messages bằng cách thêm tin nhắn mới vào cuối danh sách
        setMessages([...messages, newMessageObj]);

        // Đặt lại nội dung tin nhắn mới về rỗng
        setNewMessage("");

        // Fetch messages again to get the updated messages data
        await fetchMessenger();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    if (scrollViewRef.current && !scroll) {
      scrollViewRef.current.scrollToEnd({ animated: true });
      setScroll(true);
    }
    const intervalId = setInterval(() => {
      fetchMessenger();
      if (clicked) {
        handleSendMessage();
        setClicked(false);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, [myID, messages, clicked]);
  let prevSenderId = null;
  return (
    <View
      style={{
        backgroundColor: "#e2e9f1",
        flex: 1,
        height: heightScreen,
        width: widthScreen,
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
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          height: 48,
          width: widthScreen,
          flexDirection: "row",
          alignItems: "center",
        }}
        locations={[0.03, 0.28, 0.55, 0.74, 0.95]}
        colors={["#247bff", "#257cff", "#1e85fe", "#129afd", "#03b4fa"]}
      >
        <Pressable
          style={{
            marginLeft: 16,
            alignItems: "center",
            height: 29,
            width: 22,
          }}
          onPress={() => {
            goBack();
          }}
        >
          <Image
            style={{ height: 29, width: 22 }}
            contentFit="cover"
            source={require("../assets/left.png")}
          />
        </Pressable>
        <Text
          style={{
            marginLeft: 10,
            color: "white",
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          {messName}
        </Text>
        <View
          style={{
            paddingVertical: 0,
            paddingHorizontal: Padding.p_3xs,
            flexDirection: "row",
            right: 20,
            position: "absolute",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={{ width: 50 }}>
            <Image
              style={{ height: 30, width: 30 }}
              contentFit="cover"
              source={require("../assets/callwhite.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 50 }}>
            <Image
              style={{ height: 30, width: 30 }}
              contentFit="cover"
              source={require("../assets/videocallwhite.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 30 }}>
            <Image
              style={{ height: 30, width: 30 }}
              contentFit="cover"
              source={require("../assets/bulletedlist.png")}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View
        style={{
          height: heightScreen - 50 - 40 - 48,
          width: widthScreen,
          backgroundColor: "#E2E9F1",
        }}
      >
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }}
        >
          {messages.map((message) => {
            const senderId = message.senderId;
            const userSend = dsusers.find((user) => user.id === senderId);

            // const userIdSender = message.senderId;

            const isCurrentUser = message.senderId === myID;
            const isSameSender = message.senderId === prevSenderId;
            // Update the previous sender ID
            prevSenderId = message.senderId;

            return (
              <View
                key={message.messageId}
                style={{
                  flexDirection: "row",

                  justifyContent:
                    message.senderId === myID ? "flex-end" : "flex-start",
                  marginTop: 10,
                }}
              >
                {!isCurrentUser && !isSameSender && (
                  <Pressable
                    onPress={() =>
                      navigation.navigate({
                        name: "TrangCaNhan",
                        params: { user: userSend },
                      })
                    }
                  >
                    <Image
                      source={require("../assets/stories/" + userSend?.avatar)}
                      style={{
                        height: 30,
                        width: 30,
                        alignSelf: "center",
                        borderRadius: 15,
                        backgroundColor: "blue",
                        marginLeft: 10,
                      }}
                    />
                  </Pressable>
                )}
                <View
                  style={{
                    backgroundColor:
                      message.senderId === myID ? "#D6F0FF" : "white",
                    borderRadius: 10,
                    padding: 10,
                    marginLeft:
                      message.senderId === myID ? 0 : isSameSender ? 50 : 10,
                    marginHorizontal: 10,
                    maxWidth: "80%",
                    borderColor: "lightgray",
                    borderWidth: 1,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{color: "black", fontSize: 16}}>{message.content}</Text>
                  <View>
                    <Text style={{ fontSize: 12, color: "gray", textAlign: message.senderId === myID ? "right" : "left"}}>
                      {format(new Date(message.timestamp), "HH:mm")}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View
        style={{
          backgroundColor: "white",
          height: 50,
          width: widthScreen,
          bottom: 0,
          position: "absolute",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={{ width: 30, marginLeft: 20 }}>
          <Image style={{ height: 30, width: 30 }} contentFit="cover" source={require("../assets/face.png")}/>
        </TouchableOpacity>
        <TextInput value={newMessage} cursorColor={"red"} onChangeText={handleTextChange} placeholder="Tin nhắn" placeholderTextColor={"gray"}
          style={{
            fontSize: 20,
            outlineStyle: "none",
            width: inputWidth,
            marginLeft: 5,
          }}
        ></TextInput>

        {newMessage.length == 0 ? (
          <View style={{ flexDirection: "row", gap: 15, right: 15 }}>
            <TouchableOpacity>
              <Image style={{ height: 30, width: 30 }} contentFit="cover" source={require("../assets/more.png")}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={{ height: 30, width: 30 }} contentFit="cover" source={require("../assets/microphone.png")}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={{ height: 30, width: 30 }} contentFit="cover" source={require("../assets/imageicon.png")}/>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={{ width: 30, marginRight: 20 }} onPress={handleSendMessage} >
            <Icon icon="zi-send-solid" style={{ color: "#1892F8" }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Chat;
