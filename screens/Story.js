import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, Icon, Sheet } from "zmp-ui";
import { useSelector } from "react-redux";

const Story = ({ navigation, route }) => {
    const item = route.params?.item;
    const baoXau = item.user !== useSelector((state) => state.users.soDienThoai);
    const [user, setUser] = useState([]);
    const percentRef = useRef(0);
    const [percent, setPercent] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [isActive, setIsActive] = useState(true);
    const [actionSheetVisible, setActionSheetVisible] = useState(false);
    const [isBack, setIsBack] = useState(false);
    useEffect( () => {
        fetch(`http://localhost:3000/users?soDienThoai=${item.user}`)
            .then(res => res.json())
            .then((user) => setUser(user[0]))
    }, [])

    let avatar;
    try {
        avatar = require(`../assets/stories/${user.avatar}`);
    } catch (error) {
        avatar = require("../assets/avatar-fallback.png");
    }
   

    useEffect(() => {
        console.log(isActive)
        const interval = setInterval(() => {
            if(isActive) {
                percentRef.current += 0.2333333;
                setPercent(percentRef.current);
            }
            if (percentRef.current >= 100) {
                clearInterval(interval);
                navigation.goBack();
            }
            setIntervalId(interval); 
        }, 0.1); 

        return () => {
            clearInterval(interval);
        };
    }, [isActive]);

    const handleGoback = () => {
        setIsActive(false)
        navigation.goBack();
    };

    const handleDelete = () => {

        fetch(`http://localhost:3000/stories/${item.id}`, {
            method: 'DELETE',
        }).then(() => {
            clearInterval(intervalId);
            route.params.fetchStories();
            navigation.goBack();
        })
    }
   
    const Progress = () => {
        return (
            <View style={{ position: "relative", zIndex: 3 }}>
                <View
                    style={{
                        height: 3,
                        width: `${percent}vw`,
                        backgroundColor: "#fff",
                        position: "absolute",
                        top: 8,
                        zIndex: 2,
                    }}
                />
                <View
                    style={{
                        height: 3,
                        width: "100vw",
                        backgroundColor: "#666",
                        position: "absolute",
                        top: 8,
                    }}
                />
            </View>
        );
    };

    const handleShowModalDelete = ()=> {
        setActionSheetVisible(true);
        setIsActive(false); 
    }

    return (
        <View style={{ width: "100%", height: "100%" }}>
            <Progress />
            <ImageBackground
                source={require(`../assets/stories/${item.img}`)}
                resizeMode={"cover"}
                style={{ width: "100%", height: "100%" }}
            >
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 12,
                            paddingTop: 20,
                        }}
                    >
                        <Pressable
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                            onPress={()=>{
                                setIsActive(false); 
                                navigation.navigate({name: 'TrangCaNhan', params: {user,...route.params, setIsActive}})
                            }}
                        >
                            <Avatar
                                online={false}
                                size={40}
                                src={avatar}
                                style={{ marginRight: 12 }}
                            />
                            <Text style={{ color: "#fff", fontWeight: 600 }}>
                                {" "}
                                {item.userName}{" "}
                            </Text>
                        </Pressable>
                        <View style={{ flexDirection: "row" }}>
                            <Pressable onPress={handleShowModalDelete} style={{paddingHorizontal: 4}}>
                                <Icon icon="zi-more-horiz-solid" style={{ color: "#fff" }} />
                            </Pressable> 
                            <Pressable onPress={handleGoback} style={{paddingHorizontal: 4}}>
                                <Icon icon="zi-close" style={{ color: "#fff" , fontSize: 30}}/>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <Sheet.Actions
                mask
                visible={actionSheetVisible}
                title= {baoXau ? "Báo cáo" : "Xóa story này?"}
                onClose={() => { 
                    setActionSheetVisible(false);
                    setIsActive(true);
                }}
                swipeToClose
                actions={[
                    [
                        {
                            text: baoXau ? "Báo xấu" : "Xóa",
                            danger: true,
                            onClick: () => {
                                setActionSheetVisible(false);
                                if(!baoXau)
                                handleDelete(); 
                            }
                        },
                    ],
                    [{ 
                        text: "Hủy", 
                        // close: true, 
                        onClick: () => {
                            setActionSheetVisible(false);
                            setIsActive(true);
                        }
                    }],
                ]}
            />
        </View>
    );
};

export default Story;

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject, // Để lớp màu xám đầy đủ kích thước của hình nền
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});
