import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import { Button, Icon, Sheet, useSnackbar } from "zmp-ui";

const OfficalAccount = ({ navigation, route }) => {
    const item = route.params?.item;
    const [actionSheetVisible, setActionSheetVisible] = useState(false);
    const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
    return (
        <View>
            <View style={styles.header}>
                <Header1 />
                <Header2 />
                <Pressable
                    style={styles.btn_back}
                    onPress={() => navigation.goBack()}
                >
                    <Icon icon="zi-arrow-left" style={styles.back_icon} />
                </Pressable>
                <View style={{ zIndex: 1 }}>
                    <Text
                        style={styles.title}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >
                        {item?.name}
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                <Image
                    source={require(`../assets/OfficalAccount/${item.background}`)}
                    style={{
                        width: "100%",
                        aspectRatio: 16 / 9,
                        resizeMode: "contain",
                    }}
                />
                <View style={{paddingHorizontal: 20, paddingTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            source={require(`../assets/OfficalAccount/${item.avatar}`)}
                            style={{
                                width: 58,
                                height: 58,
                                borderRadius: "50%",
                            }}
                        />
                        <View>
                            <View style={{paddingHorizontal: 20, width: '60vw'}}>
                                <Text style={{fontSize: 16, fontWeight: 600}}>{item.name}</Text>
                                <Text style={{color:'#818181'}} >{item.type}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('../assets/orangetick.svg')} 
                            style={{width:18, height: 18, borderRadius: '50%', marginRight: 8}}
                        />
                        <Pressable onPress={() => setActionSheetVisible(true)}>
                            <Icon icon="zi-more-horiz"/>
                        </Pressable>
                    </View>
                </View>
                <View style={{flexDirection: 'row',paddingHorizontal: 20, paddingTop: 16, width: '100%' }}>
                    <Button variant="primary" size="medium" fullWidth
                        onClick={() => {
                            openSnackbar({
                                text: "Đang phát triển",
                                position: "top",
                                zIndex: 10,
                              });
                        }}
                    >
                        Nhắn tin
                    </Button>   
                    <Button variant="secondary" size="medium" fullWidth
                        onClick={() => {
                            openSnackbar({
                                text: "Đang phát triển",
                                position: "top",
                                zIndex: 10,
                              });
                        }}
                    >
                        Quan tâm
                    </Button>   
                </View>
                <Text style={{paddingHorizontal: 20, paddingTop: 20}}>
                    {item.desc}
                </Text>
            </View>

            <Sheet.Actions
                mask
                visible={actionSheetVisible}
                onClose={() => setActionSheetVisible(false)}
                swipeToClose
                actions={[
                    [{ text: "Chia sẻ OA này với bạn bè", close: true }],
                    [{ text: "Xem mã QR của OA", close: true }],
                    [
                        {
                            text: "Báo xấu OA này",
                            danger: true,
                            onClick: () => {
                                setActionSheetVisible(false);
                                dispatch(userLogout());
                                navigation.navigate("DangNhapDangKy");
                            }
                        },
                    ],
                    
                ]}
            />
        </View>
    );
};

export default OfficalAccount;

const styles = StyleSheet.create({
    header: {
        position: "fixed",
        zIndex: 2,
    },
    btn_back: {
        zIndex: 1,
        position: "absolute",
        top: 48,
        left: 24,
    },
    back_icon: {
        color: "#fff",
        fontSize: 30,
    },
    title: {
        zIndex: 1,
        top: 40,
        position: "fixed",
        left: 72,
        height: 48,
        lineHeight: 48,
        width: 260,
        paddingLeft: 4,
        fontSize: 18,
        color: "#fff",
        fontWeight: 600,
    },
    body: {
        height: "100vh",
        paddingTop: 88,
        paddingBottom: 30,
        zIndex: 0,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
});
