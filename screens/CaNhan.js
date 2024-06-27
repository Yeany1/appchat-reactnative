import { Pressable, StyleSheet, Text, View, TextInput, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import { Icon } from "zmp-ui";
import { ScrollView } from "react-native-web";
import { useSelector } from "react-redux";
const CaNhan = ({navigation}) => {
    const soDienThoai = useSelector((state) => state.users.soDienThoai);
    const [user, setUser] = useState([]);
    useEffect( () => {
        fetch(`http://localhost:3000/users?soDienThoai=${soDienThoai}`)
            .then(res => res.json())
            .then((user) => setUser(user[0]))
    }, [])
    let avatar;
    try { 
        avatar = require(`../assets/stories/${user.avatar}`);
    } catch (error) {
        avatar = require('../assets/avatar-fallback.png');
    }
    return (
        <View>
            <View style={styles.header}>
                <Header1 />
                <Header2 />
                <Pressable style={styles.btn_search}>
                    <Icon icon='zi-search' style={styles.search_icon}/>
                </Pressable>
                <TextInput style={styles.input_search} placeholder="Tìm kiếm"/>
                <Pressable style={styles.btn_setting} onPress={() => navigation.navigate('CaiDat')}>
                    <Icon icon='zi-setting' style={styles.setting_icon}/>
                </Pressable>
            </View>
            <ScrollView style={styles.body}>
                <View style={{paddingBottom: 6}}>
                    <View style={styles.box1}>
                        <Pressable style={{flexDirection: 'row', alignItems: 'center'}} 
                            onPress={() => navigation.navigate({name:'TrangCaNhan', params: {user, setUser}})}>
                            <Image source={avatar} style={{width:60, height: 60, borderRadius: '50%', margin: 15, marginLeft: 20 }}/>
                            <View>
                                <Text style={{fontSize: 18, lineHeight: 30}}>{user?.ten}</Text>
                                <Text style={{fontSize: 16, color: '#999'}}>xem trang cá nhân</Text>
                            </View>
                        </Pressable>
                        <Pressable style={{paddingRight: 28}}>
                            <Icon icon='zi-switch-users' style={{fontSize: 30, color: '#006AF5'}}/>
                        </Pressable>
                    </View>
                </View>
                <View style={{paddingBottom: 6}}>
                    <Pressable style={styles.box1}>
                        <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{ paddingHorizontal : 20}}>
                                <Image source={require('../assets/MusicalNotes.png')} style={{width: 30, height: 30}} />
                            </View>
                            <View>
                                <Text style={{fontSize: 18, lineHeight: 30}}>Nhạc chờ Zalo</Text>
                                <Text style={{fontSize: 16, color: '#999'}}>Đăng ký nhạc chờ, thể hiện cá tính</Text>
                            </View>
                        </Pressable>
                    </Pressable>
                </View>
                <View style={{paddingBottom: 6}}>
                    <Pressable style={styles.box1}>
                        <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{ paddingHorizontal : 20}}>
                                <Image source={require('../assets/ViQR.svg')} style={{width: 30, height: 30}} />
                            </View>
                            <View>
                                <Text style={{fontSize: 18, lineHeight: 30}}>Ví QR</Text>
                                <Text style={{fontSize: 16, color: '#999'}}>Lưu trữ và xuất trình các mã QR quan trọng</Text>
                            </View>
                        </Pressable>
                    </Pressable>
                </View>

                <View style={{paddingBottom: 6}}>
                    <Pressable style={styles.box1}>
                        <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{ paddingHorizontal : 20}}>
                            <Image source={require('../assets/Cloud.svg')} style={{width: 30, height: 30}} />
                            </View>
                            <View>
                                <Text style={{fontSize: 18, lineHeight: 30}}>Cloud của tôi</Text>
                                <Text style={{fontSize: 16, color: '#999'}}>Lưu trữ các tin nhắn quan trọng</Text>
                            </View>
                        </Pressable>
                        <Icon icon='zi-chevron-right' style={{fontSize: 30, color: '#707070', paddingRight: 50}}/>
                    </Pressable>
                    <Pressable style={styles.box1}>
                        <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{ paddingHorizontal : 20}}>
                            <Image source={require('../assets/PieChart.svg')} style={{width: 30, height: 30}} />
                            </View>
                            <View>
                                <Text style={{fontSize: 18, lineHeight: 30}}>Dữ liệu trên máy</Text>
                                <Text style={{fontSize: 16, color: '#999'}}>Quản lý dữ liệu Zalo của bạn</Text>
                            </View>
                        </Pressable>
                        <Icon icon='zi-chevron-right' style={{fontSize: 30, color: '#707070', paddingRight: 50}}/>
                    </Pressable>
                </View>

                <Pressable style={styles.box2}>
                    <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{ paddingHorizontal : 20}}>
                            <Image source={require('../assets/SecurityLock.svg')} style={{width: 30, height: 30}} />
                        </View>
                        <View>
                            <Text style={{fontSize: 18, lineHeight: 30}}>Tài khoản và bảo mật</Text>
                        </View>
                    </Pressable>
                    <Icon icon='zi-chevron-right' style={{fontSize: 30, color: '#707070', paddingRight: 50}}/>
                </Pressable>
                <Pressable style={styles.box2}>
                    <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{ paddingHorizontal : 20}}>
                            <Icon icon='zi-lock' style={{fontSize: 30, color: '#006AF5'}}/>
                        </View>
                        <View>
                            <Text style={{fontSize: 18, lineHeight: 30}}>Quyền riêng tư</Text>
                        </View>
                    </Pressable>
                    <Icon icon='zi-chevron-right' style={{fontSize: 30, color: '#707070', paddingRight: 50}}/>
                </Pressable>
                
            </ScrollView>
        </View>
    );
};

export default CaNhan;

const styles = StyleSheet.create({
    header: {
        position: "fixed",
        zIndex: 2,
    },
    btn_search: { 
        zIndex: 1, 
        position: 'absolute',
        top: 48,
        left: 24,
    },
    search_icon: {
        color: '#fff', 
        fontSize: 30,
    }, 
    input_search: {
        zIndex: 1, 
        top: 40,
        position: 'absolute',
        cursor: 'auto',
        left: 72,
        height: 48,
        width: 240,
        paddingLeft: 4,
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        outlineColor: 'transparent', 
        outlineStyle: 'none',
    },

    btn_setting : {
        zIndex: 3, 
        position: "relative",
        top: 48,
        left: 'calc(100vw - 58px)',
    },
    setting_icon : {
        color: '#fff', 
        fontSize: 30,
    },
    body: {
        marginTop: 88,
        height: '100vh',
        paddingBottom: 130,
    }, 
    box1: {
        backgroundColor: "#fff",
        width: "100%",
        height: 90, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        borderTopWidth: 1, 
        borderTopColor: '#e9ebed',
    },
    box2: {
        backgroundColor: "#fff",
        width: "100%",
        height: 60, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        borderTopWidth: 1, 
        borderTopColor: '#e9ebed',
    }
});
