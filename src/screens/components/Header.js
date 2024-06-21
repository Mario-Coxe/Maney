import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { AntDesign } from "@expo/vector-icons";
import { API_URL } from "../../../application.properties";
import { useSelector } from "react-redux";

const Header = ({ title }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  const token = useSelector((state) => state.auth.token);

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
        navigation.navigate("Login");
        Alert.alert("Saindo", "Você foi desconectado com sucesso.");
      } else {
        //Alert.alert("Erro", "Falha ao sair. Tente novamente.");
        navigation.navigate("Login");
      }
    } catch (error) {
      //console.error("Error logging out:", error);
      // Alert.alert("Sair", "Ocorreu um erro. Tente novamente.");
      navigation.navigate("Login");
    }
  };

  if (!fontsLoaded) {
    return <View style={styles.container}></View>;
  }

  return (
    <View style={styles.header}>
      <Text style={[styles.headerText, { fontFamily: "Poppins_700Bold" }]}>
        {title}
      </Text>
      <TouchableOpacity style={styles.button} onPress={onPressLogout}>
        <AntDesign name="logout" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    paddingTop: 36,
    backgroundColor: "#0E7B46",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
  },
  textSair: {
    color: "#fff",
    fontSize: 18,
    textAlign: "right",
  },
});

export default Header;
