import React, { useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import styles from "./Styles/SplashScreenStyle";

const SplashScreen = () => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  const navigation = useNavigation();

  
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigation.navigate("Login");
    }, 1000);

    return () => clearTimeout(redirectTimeout);
  }, [navigation]);


  if (!fontsLoaded) {
    return <View style={styles.container}></View>;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#0E7B46"} />
  
      <Text style={styles.text}>
        <Text
          style={[
            styles.grayText,
            { fontFamily: "Poppins_700Bold", fontSize: 50 },
          ]}
        >
          Money
        </Text>
      </Text>
    </View>
  );
};

export default SplashScreen;
