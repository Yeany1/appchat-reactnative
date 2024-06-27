import { StyleSheet, View, Text, Image } from "react-native";
import left from "../assets/images/left.png";

export function Group1() {
  return (
    <View style={styles.root}>
      <View style={styles.rectangle} />
      <Text style={styles.dangNh_p}>Đăng nhập</Text>
      <Image
        source={{ uri: left }}
        style={{ width: 22, height: 25 }}
        contentFit="cover"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    width: "428",
    height: "48",
  },
  rectangle: {
    width: "428",
    height: "48",
    flexShrink: 0,
  },
  dangNh_p: {
    width: "82",
    height: "22",
    flexShrink: 0,
    color: "#FFF",
    fontFamily: "PT Sans",
    fontSize: "15.5",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  left: {
    width: "22",
    height: "25",
    flexShrink: 0,
  },
});
