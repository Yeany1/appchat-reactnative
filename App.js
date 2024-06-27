const Stack = createNativeStackNavigator();
import { Linking, Platform } from 'react-native';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import DangNhapDangKy from "./screens/DangNhapDangKy";
import TaoTaiKhoan from "./screens/TaoTaiKhoan";
import TaoTaiKhoan2 from "./screens/TaoTaiKhoan2";
import DangNhap from "./screens/DangNhap";
import LayLaiMatKhau from "./screens/LayLaiMatKhau";
import CaiDat from "./screens/CaiDat";
import OfficalAccount from "./screens/OfficalAccount";
import MiniApp from "./screens/MiniApp";
import "zmp-ui/zaui.css";
import BaseContainer from "./screens/BaseContainer";
import { Provider } from "react-redux";
import { store } from "./store";
import { SnackbarProvider } from "zmp-ui";
import Story from "./screens/Story";
import ChonAnh from "./screens/ChonAnh";
import DangStory from "./screens/DangStory";
import DangBai from "./screens/DangBai";
import Chat from "./screens/Chat";
import TrangCaNhan from "./screens/TrangCaNhan";
import { SafeAreaView } from "react-native";
import TimKiem from "./screens/TimKiem";
import ThemBan from "./screens/ThemBan";
import TaoNhom from "./screens/TaoNhom";
const App = () => {
  const handleOpenExample = () => {
    Linking.openURL('https://chatappreactnative.vercel.app');
  };
  
  return (
    <TouchableOpacity onPress={handleOpenExample}>
      <Text>Open Example</Text>
    </TouchableOpacity>
  );
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [fontsLoaded, error] = useFonts({
    "PTSans-Bold": require("./assets/fonts/PTSans-Bold.ttf"),
    "AlumniSans-Bold": require("./assets/fonts/AlumniSans-Bold.ttf"),
    "Almarai-Bold": require("./assets/fonts/Almarai-Bold.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <SnackbarProvider>
        <NavigationContainer>
          {hideSplashScreen ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="DangNhapDangKy"
                component={DangNhapDangKy}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DangNhap"
                component={DangNhap}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LayLaiMatKhau"
                component={LayLaiMatKhau}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TaoTaiKhoan"
                component={TaoTaiKhoan}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TaoTaiKhoan2"
                component={TaoTaiKhoan2}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="BaseContainer"
                component={BaseContainer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CaiDat"
                component={CaiDat}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OfficalAccount"
                component={OfficalAccount}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Mini app"
                component={MiniApp}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Story"
                component={Story}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Chọn ảnh"
                component={ChonAnh}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DangStory"
                component={DangStory}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Đăng bài"
                component={DangBai}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="TrangCaNhan"
                component={TrangCaNhan}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TimKiem"
                component={TimKiem}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TaoNhom"
                component={TaoNhom}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ThemBan"
                component={ThemBan}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : null}
        </NavigationContainer>
      </SnackbarProvider>
    </Provider>
  );
};
export default App;
