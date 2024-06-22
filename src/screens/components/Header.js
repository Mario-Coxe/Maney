import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../../application.properties";

const Header = ({ title }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);
  //console.log("token", token);
  const onPressLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsLoading(false);
        navigation.navigate("Login");
      } else {
      }
    } catch (error) {
      setIsLoading(true);
    } finally {
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={onPressLogout}
        disabled={isLoading}
      >
        <AntDesign name="logout" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Saindo...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    height: 65,
    backgroundColor: "#0E7B46",
    borderBottomWidth: 1,
    borderBottomColor: "#0B5C37",
    position: "relative",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    marginBottom: -40,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -30,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 5,
    fontFamily: "Poppins_700Bold",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },
});

export default Header;
