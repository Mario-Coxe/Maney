import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5, FontAwesome, AntDesign } from "@expo/vector-icons";

const NavigationButton = ({ onPressHome, onPressChat, onPressProfile }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPressHome}>
        <AntDesign name="home" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressChat}>
        <FontAwesome5 name="comment" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressProfile}>
        <AntDesign name="user" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0077B6",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    width: "90%",
    elevation: 50,
    alignContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
});

export default NavigationButton;
