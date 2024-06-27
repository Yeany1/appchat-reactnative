import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "zmp-ui";

const ChonAnh = ({ navigation, route }) => {
    // đi vào thư mục '../assert/stories/' và load tất cả hình ảnh ra
    var a = 0;
    return (
        <View style={styles.box}>
             <Pressable onPress={() => navigation.goBack()} style={{position: 'fixed', top: 20, left: 20, zIndex: 10}}>
                <Icon icon='zi-arrow-left' style={{color: '#fff', fontSize: 36}}/>
            </Pressable>
            {
                // tạo array rỗng với 10 phần tử và duyệt qua
                Array(100)
                    .fill(0)
                    .map((item, index) => {
                        try {
                            return <Pressable key={index} 
                                onPress={() => {
                                    navigation.navigate({
                                        name: route.params.screen,
                                        params: {
                                            ...route.params,    
                                            img: (100-index)+'.jpg'
                                        }
                                    })
                                }}
                            >
                                <Image source={require(`../assets/stories/${(100-index)+'.jpg'}`)}
                                    style={{
                                        width: '33.33333vw', 
                                        height: '33.33333vw', 
                                        resizeMode: 'cover'
                                    }}
                                />
                            </Pressable>;
                        } catch (error) {
                            // console.log("no")
                        }
                    })
            }
        </View>
    );
};

export default ChonAnh;

const styles = StyleSheet.create({

    box: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
    }
});
