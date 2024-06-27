import {
    Pressable,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
} from "react-native";
import React, {useState} from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
const TaoTaiKhoan = ({navigation}) => {

    const [ten, setTen] = useState('Nguyễn Khánh');
    const [message, setMessage] = useState("");
    const handleNavigate = () => {
        if(ten.trim().length >= 2 && ten.trim().length <= 40) {
            navigation.navigate({
                name: "TaoTaiKhoan2",
                params: {ten},
            })
        } else {
            setMessage('Tên quá ngắn .Tên Zalo phải có từ 2 đến 40 ký tự')
        }
    }
    return (
        <View style={styles.contaiter}>
            <View style={styles.header}>
                <Header1 />
                <Header2 />
                <Pressable style={styles.btn} onPress={()=> navigation.goBack()}>
                    <Image
                        style={styles.icon}
                        source={require("../assets/arrow-left.svg")}
                    />
                </Pressable>
                <Text style={styles.text1}> Tạo tài khoản </Text>

            </View>
            <View style={styles.body}>
                <Text style={styles.text2}>Tên Zalo</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Gồm 2-40 ký tự" 
                    placeholderTextColor="#666" 
                    value={ten}
                    onChangeText={setTen}
                />
                <Text style={styles.textFailLogin}>{message}</Text>
                <Text style={styles.text3}> Lưu ý khi đặt tên:</Text>
                <Text style={styles.text3}>
                     - Không vi phạm <Text style={{color:'#1395fc'}}>Quy định đặt tên trên Zalo </Text>.
                </Text>
                <Text style={styles.text3}>
                     - Nên sử dụng tên thật để giúp bạn bè dễ nhận ra bạn.
                </Text>
            </View>

            <Pressable style={styles.wrapicon} onPress = {handleNavigate}>
                <Image
                    style={styles.icon2}
                    source={require("../assets/arrow-right.svg")}
                />
            </Pressable>
        </View>
    );
};

export default TaoTaiKhoan;

const styles = StyleSheet.create({
    contaiter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        width: "100%",
        overflow: "hidden",
    },
    header: {
      width: '100%',
    },
    header2: {
    },
    btn: { 
        zIndex: 1, 
        position: 'absolute',
        left: 16, 
        top: 52,
    }, 
    icon: {
        width: 22, 
        height: 30,
    },
    text1: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
        textAlign: "left",
        width: '100%',
        height: 22,
        zIndex: 1,
        top: 54,
        left: 50,
        
    },
    body: {
        marginTop: 95,
        width: '100%',
        paddingHorizontal: 16,
    },
    text2: {
        fontSize: 16,
        letterSpacing: -0.3,
        fontWeight: "500",
        color: "#000",
        textAlign: "left",
        width: 69,
        height: 18,
        paddingBottom: 30,
    },
    input: {
        width: '100%',
        height: 40,
        borderTopColor: '#dfdfdf',
        borderTopWidth: 1, 
        borderBottomColor: '#23D1F4', 
        borderBottomWidth: 2,
        outlineStyle: 'none',
        marginBottom: 8,
        fontSize: 16, 
    },
    text3: {
        paddingVertical: 4,
    },
    textFailLogin: {
        color: "red",
        fontSize: 14,
    },
    icon2: {
        width: 22, 
        height: 30,
    }, 
    wrapicon: {
        zIndex: 1, 
        position: 'absolute',
        bottom: 20, 
        right: 20,
        width: 52, 
        height: 52, 
        backgroundColor: '#66ADE6', 
        justifyContent:'center',
        alignItems: 'center', 
        borderRadius: 50, 
    },
});
