import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

function Wait() {
  return (
    <View style={{flex: 1}}>
      <LottieView
        source={require("../../../../assets/lottieFiles/wait.json")}
        autoPlay
        loop
        speed={0.5}
      />
      <Text>OIE HDJDKDKDKD</Text>
    </View>
  );
};

export default Wait;
