/** @format */

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import styles from "./Styles/RegisterStyle";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import axios from "axios";
import { API_URL } from "../../../application.properties";

const RegisterScreen = () => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não iguais.");
      return;
    }

    axios
      .post(`${API_URL}register`, {
        name: username,
        phone: phone,
        password: password,
        tipo_usuario: "cliente",
      })
      .then((response) => {
        //console.log("Registro bem-sucedido:", response.data);
        Alert.alert("Sucesso", "Usuário registrado com sucesso!");

        setUsername("");
        setPhone("");
        setPassword("");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Erro ao registrar o usuário:", error);
        Alert.alert("Erro", "Erro ao registrar o usuário.");
      });
  };

  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return <View style={styles.container}></View>;
  }

  return (
  <View style={styles.container}>
      <ScrollView>
        <View style={styles.cardContainer}>
          <Text
            style={[styles.bemvindoText, { fontFamily: "Poppins_700Bold" }]}
          >
            Registar Conta
          </Text>
          <Text
            style={[styles.loginText, { fontFamily: "Poppins_400Regular" }]}
          >
            Digite seu suas credencias para poder
          </Text>
          <Text
            style={[styles.loginText, { fontFamily: "Poppins_400Regular" }]}
          >
            fazer login posteriormente, por favor
          </Text>
          <Text
            style={[styles.loginText, { fontFamily: "Poppins_400Regular" }]}
          >
            digete valores para todos os input
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputIconContainer}>
            <AntDesign
              name="user"
              size={24}
              color="gray"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { fontFamily: "Poppins_600SemiBold" }]}
              placeholderTextColor={"gray"}
              onChangeText={(text) => setUsername(text)}
              placeholder="Nome"
            />
          </View>
          <View style={styles.inputIconContainer}>
            <AntDesign
              name="phone"
              size={24}
              color="gray"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { fontFamily: "Poppins_600SemiBold" }]}
              placeholder="Telefone"
              onChangeText={(text) => setPhone(text)}
              placeholderTextColor={"gray"}
            />
          </View>
          <View style={styles.inputIconContainer}>
            <AntDesign
              name="lock1"
              size={24}
              color="gray"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { fontFamily: "Poppins_600SemiBold" }]}
              placeholder="Senha"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={"gray"}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome5
                name={showPassword ? "eye-slash" : "eye"}
                size={24}
                color="gray"
                style={styles.passwordIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputIconContainer}>
            <AntDesign
              name="lock1"
              size={24}
              color="gray"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { fontFamily: "Poppins_600SemiBold" }]}
              placeholder="Confirmar Senha"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholderTextColor={"gray"}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome5
                name={showPassword ? "eye-slash" : "eye"}
                size={24}
                color="gray"
                style={styles.passwordIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.entrarButton}
            onPress={handleRegister}
          >
            <Text
              style={[
                styles.entrarButtonText,
                { fontFamily: "Poppins_600SemiBold" },
              ]}
            >
              Registar
            </Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="#0077B6" />
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
