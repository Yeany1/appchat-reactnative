import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Icon } from "zmp-ui";
import { useSelector } from "react-redux";

const DangStory = ({ navigation, route }) => {
  const [user, setUser] = useState([]);
  const soDienThoai = useSelector((state) => state.users.soDienThoai);
  useEffect(() => {
    fetchUser()
  }, []);
  const fetchUser = () => { 
    fetch(`http://localhost:3000/users?soDienThoai=${soDienThoai}`)
    .then((res) => res.json())
    .then((user) => setUser(user[0]));
  }
  return (
    <View>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}
      >
        <Icon icon="zi-arrow-left" style={{ color: "#fff", fontSize: 36 }} />
      </Pressable>
      <Image
        source={require(`../assets/stories/${route.params.img}`)}
        style={{ width: "100vw", height: "100vh", resizeMode: "cover" }}
      />
      <Pressable
        style={{ position: "absolute", bottom: 20, right: 20, zIndex: 10 }}
        onPress={() => {
          if (
            route.params?.option === "avatar" ||
            route.params?.option === "background"
          ) {
            const isAvatar = route.params?.option === "avatar";
            fetch(`http://localhost:3000/users/${user.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                [isAvatar ? "avatar" : "background"]: route.params.img,
              }),
            })
            .then(fetchUser)
            .then(() => {
              if(route.params?.setUser)
                route.params.setUser(user)
            })
              .then(() => {
                if(route.params?.refresh)
                  route.params?.refresh()
              })
              .then(() => {
                navigation.navigate({
                  ...route.params,
                  name: "TrangCaNhan",
                  params: { user },
                });
              });
          } else {
            fetch("http://localhost:3000/stories", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                img: route.params.img,
                user: soDienThoai,
                userName: user.ten,
                date: new Date(),
              }),
            }).then(() => {
              route.params.fetchStories();
              navigation.navigate({ name: "Nhật ký" });
            });
          }
        }}
      >
        <Button variant="primary">
          <Text style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>
            Đăng
          </Text>
        </Button>
      </Pressable>
    </View>
  );
};

export default DangStory;

const styles = StyleSheet.create({});
