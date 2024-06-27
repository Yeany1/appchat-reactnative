import {Image, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { ImageBackground } from "react-native";
import { Button } from "zmp-ui";
import { useSelector } from "react-redux";

const DangBai = ({ navigation, route }) => {

    console.log(route.params);

    const post = route.params?.post; 
    const [images, setimages] = useState(post?.images||[]);
    const [content, setContent] = useState(post?.content||"");
    const user = useSelector((state) => state.users.soDienThoai);

    const [array, setArray] = useState([])

    useEffect(() => {
        const array1 = [...images]
        for(let i = 100; i >= 1; i--){
            let item = i+'.jpg'; 
            if(array1.includes(item))
                continue;
            array1.push(item)
        }
        setArray(array1);
    }, [])

    return (
        <View>
            <TextInput
                placeholder="Bạn đang nghĩ gì?"
                placeholderTextColor="#666"
                style={{
                    padding: 12,
                    height: "25vh",
                    fontSize: 18,
                    outlineColor: "transparent",
                    outlineStyle: "none",
                }}
                textAlignVertical="top"
                multiline={true}
                numberOfLines={10}
                value={content}
                onChangeText={(e) => setContent(e)}
            />
            <Button
                variant="primary"
                type="highlight"
                size="small"
                disabled={content.trim() === "" && images.length === 0}
                style={{
                    // position: 'absolute',
                    width: 92,
                    height: 42,
                    top: -10,
                    left: 288,
                }}
                onClick={() => {
                    fetch(`http://localhost:3000/posts/${post?post.id:''}`, {
                        method: post ? "PUT" : "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            user,
                            content,
                            images,
                            date: new Date().toISOString(),
                        }),
                    }).then(() => {
                        route.params.fetchPosts();
                    }).then(() => {
                        if(route.params?.handleRefreshPost)
                            route.params?.handleRefreshPost();
                        navigation.goBack();
                    })
                }}
            >
                <Text
                    style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}
                >
                    Đăng
                </Text>
            </Button>
            <ScrollView style={{ height: "65vh", bottom: 0 }}>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        borderTopWidth: 2,
                        borderTopColor: "#333",
                    }}
                >
                    {array.map((id, index) => {
                            try {
                                return (
                                    <Pressable
                                        key={index}
                                        onPress={() => {
                                            if (images.includes(id))
                                                setimages(images.filter((item) =>item !==id));
                                            else
                                                setimages([...images, id,]);
                                        }}
                                    >
                                        <ImageBackground
                                            source={require(`../assets/stories/${id}`)}
                                            style={{
                                                width: "33.33333vw",
                                                height: "33.33333vw",
                                                resizeMode: "cover",
                                            }}
                                        >
                                            <View
                                                style={
                                                    images.includes(
                                                        id
                                                    )
                                                        ? styles.overlay
                                                        : {}
                                                }
                                            ></View>

                                            <View
                                                style={{
                                                    width: 26,
                                                    height: 26,
                                                    backgroundColor:
                                                        images.includes(
                                                            id
                                                        )
                                                            ? "#006AF5"
                                                            : "rgba(0,0,0,0.5)",
                                                    borderWidth: 2,
                                                    borderColor: "#fff",
                                                    borderRadius: "50%",
                                                    position: "absolute",
                                                    right: 8,
                                                    top: 8,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: "#fff",
                                                        lineHeight: 26,
                                                        width: 26,
                                                        justifyContent:
                                                            "center",
                                                        textAlign: "center",
                                                        alignItems: "center",
                                                        verticalAlign: "middle",
                                                    }}
                                                >
                                                    {" "}
                                                    {images.includes(
                                                        id
                                                    )
                                                        ? images.indexOf(
                                                              id
                                                          ) + 1
                                                        : ""}{" "}
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </Pressable>
                                );
                            } catch (error) {}
                        })}
                </View>
            </ScrollView>
        </View>
    );
};

export default DangBai;

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
});
