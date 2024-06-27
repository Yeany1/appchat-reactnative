import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

const MiniApp = ({ route }) => {
    const item = route.params?.item;
    return (
        <View style={{ alignItems: "center", justifyContent: "center", width: '100%', height: '100%'}}numberOfLines={2}>
            <View style={{ backgroundColor: "#F4F5F7", width: 48, height: 48, borderRadius: 8, justifyContent: "center", alignItems: "center"}}>
                <Image source={require(`../assets/miniApp/${item.image}`)} style={{ width: 34, height: 34, borderRadius: 8 }}/>
            </View>
            <Text style={{ width: 200, textAlign: "center", fontSize: 12 }}>{item.name}</Text>
        </View>
    );
};

export default MiniApp;

const styles = StyleSheet.create({});
