import React from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { API_URL } from "../../../application.properties";
import { useNavigation } from "@react-navigation/native";

const NavigationButton = ({ onPressHome, onPressProfile }) => {
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();

  const onPressLogout = async () => {
    try {
      const response = await fetch(`${API_URL}logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        Alert.alert("Saindo", "Você foi desconectado com sucesso.");
        navigation.navigate("Login");
      } else {
       // Alert.alert("Erro", "Falha ao sair. Tente novamente.");
        navigation.navigate("Login");

      }
    } catch (error) {
      console.error("Error logging out:", error);
     // Alert.alert("Sair", "Ocorreu um erro. Tente novamente.");
        navigation.navigate("Login");

    }
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.button} onPress={onPressHome}>
        <AntDesign name="home" size={20} color="white" />
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button} onPress={onPressLogout}>
        <AntDesign name="logout" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressProfile}>
        <AntDesign name="user" size={20} color="white" />
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
