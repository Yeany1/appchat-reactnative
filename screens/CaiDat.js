import {Image,Pressable,StyleSheet,Text,TextInput,View,} from "react-native";
import React, { useState } from "react";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import { Button, Icon, Sheet, Text as Text2, Box, Page } from "zmp-ui";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../features/users/usersSlice";

const CaiDat = ({ navigation}) => {
    // const soDienThoai = useSelector((state) => state.users.soDienThoai);
    // const [sheetVisible, setSheetVisible] = useState(false);
    // const dispatch = useDispatch(); 
    // const [actionSheetVisible, setActionSheetVisible] = useState(false);
    return (
        <View>
            <View style={styles.header}>
                <Header1 />
                <Header2 />
                <Pressablem style={styles.btn_back} onPress={() => navigation.goBack()}>
                    <Icon icon="zi-arrow-left" style={styles.back_icon} />
                </Pressablem>
                <Text style={styles.title}>Cài đặt</Text>
                <Pressable style={styles.btn_search}>
                    <Icon icon="zi-search" style={styles.back_icon} />
                </Pressable>
            </View>

            {/* <ScrollView style={styles.body}>
                <View style={{ paddingBottom: 6 }}>
                    <Pressable style={styles.box2}>
                        <Pressable style={{ flexDirection: "row", alignItems: "center"}}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Image source={require("../assets/SecurityLock.svg")} style={{ width: 30, height: 30 }}/>
                            </View>
                            <View> <Text style={{ fontSize: 18, lineHeight: 30 }}> Tài khoản và bảo mật </Text></View>
                        </Pressable>
                        <Icon icon="zi-chevron-right" style={{fontSize: 30, color: "#707070", paddingRight: 50}}/>
                    </Pressable>

                    <Pressable style={styles.box2}>
                        <Pressable style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Icon icon="zi-lock" style={{ fontSize: 30, color: "#006AF5" }}/>
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, lineHeight: 30 }}>Quyền riêng tư</Text>
                            </View>
                        </Pressable>
                        <Icon icon="zi-chevron-right" style={{fontSize: 30, color: "#707070", paddingRight: 50}}/>
                    </Pressable>
                </View>

                <View style={{ paddingBottom: 6 }}>
                    <Pressable style={styles.box1}>
                        <Pressable style={{flexDirection: "row", alignItems: "center",}}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Image source={require("../assets/PieChart.svg")} style={{ width: 30, height: 30 }}/>
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, lineHeight: 30 }}>Dữ liệu trên máy</Text>
                                <Text style={{ fontSize: 16, color: "#999" }}>Quản lý dữ liệu Zalo của bạn</Text>
                            </View>
                        </Pressable>
                        <Icon icon="zi-chevron-right" style={{fontSize: 30, color: "#707070", paddingRight: 50}}/>
                    </Pressable>

                    <Pressable style={styles.box1}>
                        <Pressable style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Image vsource={require("../assets/backup.svg")} style={{ width: 30, height: 30 }} />
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, lineHeight: 30 }}>Sao lưu và khôi phục</Text>
                                <Text style={{fontSize: 16, color: "#999", width: 240}}>Bảo vệ tin nhắn khi đổi máy hoặc cài lại Zalo</Text>
                            </View>
                        </Pressable>
                        <Icon icon="zi-chevron-right" style={{fontSize: 30, color: "#707070", paddingRight: 50}}/>
                    </Pressable>
                </View>

                <View style={{ paddingBottom: 6 }}>
                    <Pressable style={styles.box2}>
                        <Pressable style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Icon icon="zi-notif" style={{ fontSize: 30, color: "#006AF5" }}/>
                            </View>
                            <View> <Text style={{ fontSize: 18, lineHeight: 30 }}>Thông báo</Text> </View>
                        </Pressable>
                        <Icon icon="zi-chevron-right" style={{fontSize: 30, color: "#707070", paddingRight: 50}}/>
                    </Pressable>
                    <Pressable style={styles.box2}>
                        <Pressable style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Icon icon="zi-chat" style={{ fontSize: 30, color: "#006AF5" }}/>
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, lineHeight: 30 }}>Tin nhắn</Text>
                            </View>
                        </Pressable>
                        <Icon icon="zi-chevron-right" style={{fontSize: 30, color: "#707070", paddingRight: 50}}/>
                    </Pressable>
                    <Pressable style={styles.box2}>
                        <Pressable style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Icon icon="zi-call" style={{ fontSize: 30, color: "#006AF5" }}/>
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, lineHeight: 30 }}>Cuộc gọi</Text>
                            </View>
                        </Pressable>
                        <Icon icon="zi-chevron-right" style={{fontSize: 30, color: "#707070", paddingRight: 50}} />
                    </Pressable>
                    <Pressable style={styles.box2}>
                        <Pressable style={{flexDirection: "row",alignItems: "center"}}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Icon icon="zi-clock-2" style={{ fontSize: 30, color: "#006AF5" }} />
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, lineHeight: 30 }}>Nhật ký</Text>
                            </View>
                        </Pressable>
                        <Icon icon="zi-chevron-right" style={{fontSize: 30, color: "#707070", paddingRight: 50}}/>
                    </Pressable>
                    <Pressable style={styles.box2}>
                        <Pressable style={{flexDirection: "row",alignItems: "center"}}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Image source={require("../assets/CallList.svg")} style={{ width: 30, height: 30 }}/>
                            </View>

                            <View> <Text style={{ fontSize: 18, lineHeight: 30 }}>Danh bạ</Text></View>
                        </Pressable>

                        <Icon icon="zi-chevron-right"style={{fontSize: 30,color: "#707070",paddingRight: 50}}/>
                    </Pressable>
                    <Pressable style={styles.box2}>
                        <Pressable style={{flexDirection: "row",alignItems: "center"}}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Icon icon="zi-wallpaper" style={{ fontSize: 30, color: "#006AF5" }}/>
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, lineHeight: 30 }}>Giao diện và ngôn ngữ</Text>
                            </View>
                        </Pressable>
                        <Icon icon="zi-chevron-right" style={{fontSize: 30, color: "#707070", paddingRight: 50}}/>
                    </Pressable>
                </View>

                <View style={{ paddingBottom: 6 }}>
                    <Pressable style={styles.box2}>
                        <Pressable
                            style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Icon icon="zi-info-circle" style={{ fontSize: 30, color: "#006AF5" }}/>
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, lineHeight: 30 }}>Thông tin về Zalo</Text>
                            </View>
                        </Pressable>
                        <Icon icon="zi-chevron-right" style={{fontSize: 30, color: "#707070", paddingRight: 50 }} />
                    </Pressable>
                    <Pressable style={styles.box2}>
                        <Pressable style={{ flexDirection: "row", alignItems: "center"}}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Icon icon="zi-help-circle" style={{ fontSize: 30, color: "#006AF5" }}/>
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, lineHeight: 30 }}> Liên hệ hỗ trợ </Text>
                            </View>
                        </Pressable>
                        <Icon icon="zi-chevron-right" style={{fontSize: 30, color: "#707070", paddingRight: 50 }}/>
                    </Pressable>
                </View>

                <View style={{ paddingBottom: 6 }}>
                    <Pressable style={styles.box2}>
                        <Pressable style={{ flexDirection: "row", alignItems: "center"}}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Icon icon="zi-switch-users" style={{ fontSize: 30, color: "#006AF5" }}/>
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, lineHeight: 30 }}>Chuyển tài khoản</Text>
                            </View>
                        </Pressable>
                        <Icon icon="zi-chevron-right" style={{fontSize: 30, color: "#707070", paddingRight: 50}}/>
                    </Pressable>

                    <Pressable style={[styles.box1, {paddingHorizontal: 8}]}>
                        <Button variant="secondary" fullWidth onClick={() => {setActionSheetVisible(true);}}
                            type="neutral" suffixIcon={<Icon icon = 'zi-leave'/>}>
                            <Text style={{fontWeight: 400, fontSize: 18}}>Đăng xuất</Text>
                        </Button>
                    </Pressable>
                </View>
            </ScrollView> */}
            {/* <Sheet.Actions mask visible={actionSheetVisible} title="Đăng xuất khỏi tài khoản này?" onClose={() => setActionSheetVisible(false)} swipeToClose
                actions={[
                    [
                        {
                            text: "Đăng xuất",
                            danger: true,
                            onClick: () => {
                                setActionSheetVisible(false);
                                dispatch(userLogout());
                                navigation.navigate("DangNhapDangKy");
                            }
                        },
                    ],
                    [{ text: "Hủy", close: true }],
                ]}
            /> */}
        </View>
    );
};

export default CaiDat;

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
        position: "absolute",
        left: 72,
        height: 48,
        lineHeight: 48,
        width: 240,
        paddingLeft: 4,
        fontSize: 18,
        color: "#fff",
        fontWeight: 600,
    },

    btn_search: {
        zIndex: 1,
        position: "relative",
        top: 48,
        left: 'calc(100vw - 58px)',
        zIndex: 100,
    },

    btn_setting: {
        zIndex: 1,
        position: "absolute",
        top: 48,
        right: 20,
    },
    setting_icon: {
        color: "#fff",
        fontSize: 30,
    },
    body: {
        height: "100vh",
        paddingTop: 88,
        // paddingBottom: 90,
        zIndex: 0,
    },
    box1: {
        backgroundColor: "#fff",
        width: "100%",
        height: 90,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#e9ebed",
    },
    box2: {
        backgroundColor: "#fff",
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#e9ebed",
    },
});
