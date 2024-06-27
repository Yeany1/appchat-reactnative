import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Header1 = () => {
    return (
        <LinearGradient
            style={{
                zIndex: 1,
                flex: 1,
                width: "100%",
                height: 40,
                backgroundColor: "transparent",
                position: "fixed",
                top: 0,
                left: 0,
            }}
            locations={[0.03, 0.28, 0.55, 0.74, 0.95]}
            colors={["#1d64cc", "#166fcb", "#0f7bcb", "#068aca", "#0293c8"]}
            useAngle={true}
            angle={90}
        />
    );
};

export default Header1;

const styles = StyleSheet.create({});
