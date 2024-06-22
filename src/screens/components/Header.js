import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../../application.properties";

const Header = ({ title }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  const navigation = useNavigation();
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
        navigation.navigate("Login");
      }
    } catch (error) {
      navigation.navigate("Login");
    }
  };

  if (!fontsLoaded) {
    return null; // Evita renderização vazia caso as fontes não estejam carregadas
  }

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={onPressLogout}>
        <AntDesign name="logout" size={24} color="#fff" />
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    height: 60,
    backgroundColor: "#0E7B46",
    borderBottomWidth: 1,
    borderBottomColor: "#0B5C37",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
    fontFamily: "Poppins_700Bold",
  },
});

export default Header;
