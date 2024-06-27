import "react-native-gesture-handler/jestsetup";

jest.mock("react-native/libraries/animated/src/nativeanimatedhelper");

jest.mock("react-native-reanimated", () => {
  const reanimated = require("react-native-reanimated/mock");

  // the mock for `call` immediately calls the callback which is incorrect
  // so we override it with a no-op
  reanimated.default.call = () => {};

  return reanimated;
});
