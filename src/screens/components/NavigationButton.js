import React from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const NavigationButton = ({ onPressHome, onPressChat, onPressProfile }) => {
  const token = useSelector((state) => state.auth.token);

  console.log(" token >> ", token);
  const onPressLogout = async () => {
    try {
      const response = await fetch("http://192.168.43.63:8080/api/v1/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        Alert.alert("Sair", "Você foi desconectado com sucesso.");
      } else {
        Alert.alert("Sair", "Falha ao sair. Tente novamente.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Sair", "Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPressHome}>
        <AntDesign name="home" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressProfile}>
        <AntDesign name="user" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressLogout}>
        <AntDesign name="logout" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0E7B46",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    width: "80%",
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
