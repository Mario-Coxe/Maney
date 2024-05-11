import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  useFonts,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const Header = ({ title }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <View style={styles.container}></View>;
  }

  return (
    <View style={styles.header}>
      <Text style={[styles.headerText, { fontFamily: "Poppins_700Bold" }]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    paddingTop: 36,
    backgroundColor: "#0E7B46",
    alignContent: "flex-end",
    marginBottom: 0.5,
    borderColor: "#fff",
  },
  headerText: {
    color: "#fff",
    right: -30,
    fontSize: 18,
  },
});

export default Header;
