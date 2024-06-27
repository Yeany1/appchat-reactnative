import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { Avatar, Text, Box } from "zmp-ui";
const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

const OA = () => {
  const [officialAccounts, setOfficialAccounts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/officialAccount")
      .then((res) => res.json())
      .then((data) => {
        setOfficialAccounts(data);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: heightScreen,
        flexDirection: "column",
        gap: 7,
      }}
    >
      <TouchableOpacity
        style={{
          height: 70,
          width: widthScreen,
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 55,
            width: 55,
            borderRadius: 100,
            backgroundColor: "#E9F6FF",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <Image
            style={{ width: 50, height: 50, alignSelf: "center" }}
            source={require("../assets/antenna.png")}
          />
        </View>
        <Text style={{ marginLeft: 20, fontSize: 18 }}>
          Tìm thêm Official Account
        </Text>
      </TouchableOpacity>

      <View
        style={{
          height: heightScreen - 220,
          width: widthScreen,
          backgroundColor: "white",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: 30,
            width: widthScreen,
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 500 }}>
            Official Account đã quan tâm
          </Text>
        </View>
        <View style={{ height: 538, width: widthScreen }}>
          <ScrollView>
            <View>
              {officialAccounts.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      height: 80,
                      width: widthScreen,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{}}>
                      <Image
                        source={require(`../assets/OfficalAccount/${item.avatar}`)}
                        style={{
                          marginLeft: 15,
                          width: 58,
                          height: 58,
                          borderRadius: "50%",
                          borderColor: "#fff",
                          borderWidth: 5,
                        }}
                      />
                      <Image
                        source={require("../assets/orangetick.svg")}
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          marginRight: 8,
                          position: "absolute",
                          top: 40,
                          left: 54,
                        }}
                      />
                    </View>

                    <Text
                      style={{
                        marginLeft: 15,
                        fontSize: 18,
                        fontWeight: 500,
                        width: 280,
                      }}
                    >
                      Official Account
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default OA;
