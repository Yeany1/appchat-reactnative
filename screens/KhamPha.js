import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import { Pressable } from "react-native";
import { Button, Icon, useSnackbar } from "zmp-ui";
import { ScrollView } from "react-native-web";
import MusicSwiper from "../components/MusicSwiper";

const KhamPha = ({navigation}) => {
    const [miniApps, setMiniApps] = useState([
        {
            "id": 1, 
            "name": "Bảo Hiểm Online",
            "desc": "Bảo Hiểm Online cung cấp nhiều loại bảo hiểm chính hãng như Bảo hiểm TNDS xe máy, Bảo hiểm TNDS ô tô, Bảo hiểm sức khỏe, Bảo hiểm du lịch...đến từ PVI - Công ty bảo hiểm hàng đầu Việt Nam PVI",
            "image": "BaoHiemOnline.jpg",
            "outstanding": true,
            "recent": false
          },
          {
            "id": 2, 
            "name": "Sendo Farm",
            "desc": "SENDO FARM là dịch vụ Đi chợ kiểu mới phục vụ thực phẩm đáp ứng 4 tiêu chí: Tươi - Sạch - Rẻ - Tiện cho khách hàng. Đặt hàng trước 24h hôm nay, mai nhận ngay tại các điểm nhận hàng.",
            "image": "SendoFam.jpg",
            "outstanding": true,
            "recent": false
          },
          {
            "id": 3, 
            "name": "Selly Dễ dàng bán hàng",
            "desc": "SELLY Ứng dụng giúp bạn dễ dàng kinh doanh online mà không cần vốn. Tải Selly và bắt đầu sự nghiệp kinh doanh của bạn ngay thôi nào.",
            "image": "Selly.jpg",
            "outstanding": true,
            "recent": false
          },
          {
            "id": 4, 
            "name": "Quà tặng điện tử Got It",
            "desc": "Tặng quà cá nhân qua Zalo Chat. Kho quà hơn 300 thương hiệu, tặng nhận tức thì, trải nghiệm tiện lợi.",
            "image": "quaTangUnilever.jpg",
            "outstanding": true,
            "recent": false
          },
          {
            "id": 5, 
            "name": "Zalo Shop",
            "desc": "Trải nghiệm cửa hàng trực tuyến trên Zalo",
            "image": "zaloShop.jpg",
            "outstanding": true,
            "recent": false
          },
          {
            "id": 6, 
            "name": "Zalo Connect",
            "desc": "Ứng dụng hỗ trợ mua bán thực phẩm trên Zalo",
            "image": "zaloConnect.jpg",
            "outstanding": false,
            "recent": true
          },
          {
            "id": 7, 
            "name": "Bảo hiểm Sài Gòn Hà Nội",
            "desc": "Tổng Công ty Cổ phần Bảo hiểm Sài Gòn - Hà Nội (BSH) được thành lập vào ngày 12.10.2008.",
            "image": "bsh.jpg",
            "outstanding": false,
            "recent": true
          },
          {
            "id": 8, 
            "name": "Đối tác Sendo",
            "desc": "Đối tác Sendo là ứng dụng dành riêng cho các đối tác của Sendo trong dự án Sendo Farm - Dịch vụ đi chợ kiểu mới Tươi - Sạch - Tiết kiệm - Tiện lợi, cung cấp rau củ quả an toàn và VietGAP.",
            "image": "doiTacSendo.jpg",
            "outstanding": false,
            "recent": true
          },
          {
            "id": 9, 
            "name": "Quà Tặng Unilever",
            "desc": "Mini App Quà tặng Unilever - Tích điểm đổi quà của Unilever",
            "image": "quaTangUnilever.jpg",
            "outstanding": false,
            "recent": true
          }, 
          {
            "id": 10,
            "name": "Dò vé số",
            "desc": "Dò vé số là ứng dụng giúp tra cứu kết quả xổ số kiến thiết 3 miền và kết quả Vietlott",
            "image": "doVeSo.jpg",
            "outstanding": false,
            "recent": true
          }
    ]);

    const [officialAccounts, setOfficialAccounts] = useState([
        {
            "id": 1,
            "name": "Chu Hải Nam 604 Quang Trung HCM",
            "type": "Doanh nghiệp",
            "avatar": "avatar1.jpg",
            "background": "bgr1.jpg",
            "address": "Quận Gò Vấp",
            "desc": "Đây là trang chính thức của cửa hàng thời trang giày da nam Chu Hải Nam số 604 Quang Trung, quận Gò Vấp, TP HCM"
          },
          {
            "id": 2,
            "name": "Công ty Mebipha",
            "type": "Doanh nghiệp",
            "avatar": "avatar2.jpg",
            "background": "bgr2.jpg",
            "address": "Quận Gò Vấp",
            "desc": "Mebipha nhà cung cấp và sản xuất thuốc thú y thủy sản cho ngành chăn nuôi"
          },
          {
            "id": 3, 
            "name": "Thông tin Chính phủ",
            "type": "Cơ quan Nhà Nước",
            "avatar": "avatar3.jpg",
            "background": "bgr3.jpg",
            "address": "Ba Đình, Hà Nội",
            "desc": "Zalo của Cổng thông tin điện tử Chính Phủ nước cộng hòa xã hội Chủ nghĩa Việt Nam"
          }
    ]); 
    const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
    const timmerId = useRef();
    useEffect(() => {
        fetch("http://localhost:3000/miniApps")
            .then((res) => res.json())
            .then((apps) => {
                setMiniApps(apps);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/officialAccount")
            .then((res) => res.json())
            .then((Accounts) => {
                setOfficialAccounts(Accounts);
            });
    }, []);
    useEffect(
        () => () => {
          closeSnackbar();
          clearInterval(timmerId.current);
        },
        []
     );

    const MiniAppItem = ({ item }) => {
        return (
            <Pressable
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "22vw",
                    paddingBottom: 20,
                    overflow: "hidden",
                }}
                numberOfLines={2}
                onPress={() => {
                    navigation.navigate("Mini app", { item });
                }}
            >
                <View
                    style={{
                        backgroundColor: "#F4F5F7",
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Image source={require(`../assets/miniApp/${item.image}`)} style={{ width: 34, height: 34, borderRadius: 8 }} />
                </View>
                <Text style={{ width: 76, textAlign: "center", fontSize: 12 }} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
            </Pressable>
        );
    };
    return (
        <View>
            <View style={styles.header}>
                <Header1 />
                <Header2 />
                <Pressable style={styles.btn_search}>
                    <Icon icon="zi-search" style={styles.search_icon} />
                </Pressable>
                <TextInput style={styles.input_search} placeholder="Tìm kiếm" />
                <Pressable style={{ zIndex: 1, position: "relative", top: 48,left: 'calc(100vw - 58px)', zIndex: 100}}>
                    <Image source={require("../assets/qrcode.png")} style={{ width: 22, height: 22, top: 4}}/>
                </Pressable>
            </View>
            <ScrollView style={styles.body}>
                <View style={{ backgroundColor: "#fff", marginBottom: 10 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 16,
                            paddingVertical: 18,
                        }}
                    >
                        <Text style={{fontSize: 16, fontWeight: 500}}> Mini Apps cho bạn </Text>
                        <Text style={{fontWeight: 400, color: "#007AFF"}}> Chỉnh sửa </Text>
                    </View>
                    <View style={styles.miniAppsBox}>
                        {miniApps.map((item, id) => {
                            if (id < 8)
                                return (
                                    <MiniAppItem key={item.id} item={item} />
                                );
                        })}
                    </View>
                    <View>
                        <Text style={{paddingHorizontal: 16,paddingVertical: 16, color: '#666'}}>Sử dụng gần đây</Text>
                        <ScrollView horizontal={true} style={{paddingHorizontal: 12}}>
                            <View style={{flexDirection: "row"}}>
                                {miniApps.map((item) => {
                                    if (item.recent)
                                        return (
                                            <MiniAppItem key={item.id} item={item} />
                                        );
                                })}
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <View style={{paddingHorizontal: 16,paddingVertical: 12, backgroundColor: '#fff', marginBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('../assets/zingmp3.png')} style={{width:30, height: 30, borderRadius: '50%', marginRight: 8}}/>
                        <Text>Zing MP3 </Text>
                        <Text style={{color: '#828282'}}>• Nhạc mới phát hành </Text>
                    </View>
                    <MusicSwiper/>
                </View>
                                
                <View>
                    <View style={{paddingHorizontal: 16,paddingVertical: 12, backgroundColor: '#fff', marginBottom: 10}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../assets/orangetick.svg')} style={{width:30, height: 30, borderRadius: '50%', marginRight: 8}}/>
                            <Text>Gợi ý Official Account</Text>
                        </View>
                        <ScrollView horizontal={true} style={{paddingVertical: 12}}>
                            <View style={{flexDirection: "row"}} >
                            {
                                officialAccounts.map((item) => {
                                    return(
                                        <Pressable key={item.id} style={{width: 285, height: 350, backgroundColor: '#fff', borderRadius: 12, marginRight: 14, borderWidth: 1, borderColor: '#EAEAEA', justifyContent: 'space-between'}}
                                            onPress={()=>navigation.navigate({name: 'OfficalAccount', params: {item}})}
                                        >
                                            <View>

                                                <View>
                                                    <Image source={require(`../assets/OfficalAccount/${item.background}`)}
                                                        style={{
                                                            borderTopLeftRadius: 12,
                                                            borderTopRightRadius: 12,
                                                            width: 285,
                                                            height: 105,
                                                        }}
                                                    />
                                                    <View style={{paddingBottom: 20}}>
                                                        <Image source={require(`../assets/OfficalAccount/${item.avatar}`)}
                                                            style={{
                                                                width: 58,
                                                                height: 58,
                                                                borderRadius: '50%',
                                                                borderColor: '#fff', 
                                                                borderWidth: 5,
                                                                position: 'absolute', 
                                                                top: -40,
                                                                left: 16,
                                                            }}
                                                        />
                                                        <Image source={require('../assets/orangetick.svg')} 
                                                            style={{width:18, height: 18, borderRadius: '50%', marginRight: 8, position: 'absolute', top:0, left: 54}}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{paddingHorizontal: 16}}>
                                                    <Text style={{fontSize: 16, fontWeight: 600, paddingVertical: 10}} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                                                    <Text style={{color:'#818181'}} numberOfLines={3} ellipsizeMode="tail">{item.desc}</Text>
                                                </View>
                                            </View>

                                            <View style={{paddingHorizontal: 16, paddingBottom: 6}}>
                                                <View>
                                                    <Pressable style={{paddingBottom: 10}}>
                                                        <Button variant="primary" size="medium"
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
                                                    </Pressable>
                                                    <Pressable style={{paddingBottom: 10}} onPress={()=>navigation.navigate({name: 'OfficalAccount', params: {item}})}>
                                                        <Button variant="secondary"  type="neutral" size="medium">
                                                            Xem chi tiết
                                                        </Button>      
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </Pressable>)
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>    
                </View>
            </ScrollView>
        </View>
    );
};

export default KhamPha;

const styles = StyleSheet.create({
    header: {
        position: "fixed",
        zIndex: 2,
    },
    btn_search: {
        zIndex: 1,
        position: "absolute",
        top: 48,
        left: 24,
    },
    search_icon: {
        color: "#fff",
        fontSize: 30,
    },
    input_search: {
        zIndex: 1,
        top: 40,
        position: "absolute",
        cursor: "auto",
        left: 72,
        height: 48,
        width: 240,
        paddingLeft: 4,
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.7)",
        outlineColor: "transparent",
        outlineStyle: "none",
    },

    btn_setting: {
        zIndex: 10,
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
        paddingBottom: 50,
        zIndex: 0,
    },
    miniAppsBox: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#fff",
        justifyContent: "space-around",
        paddingHorizontal: 12,
        // tôi muốn mỗi dòng chỉ chứa 4 item
    },
});
