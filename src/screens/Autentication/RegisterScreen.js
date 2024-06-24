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
import MessageAlert from "../components/shared/MessageAlert";

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
  const [message, setMessage] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      showMessage("error", "As senhas não são iguais.");
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
        showMessage("success", "Usuário registrado com sucesso!");

        // Navegar para a tela de login após 3 segundos
        setTimeout(() => {
          setUsername("");
          setPhone("");
          setPassword("");
          setConfirmPassword("");
          navigation.navigate("Login");
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao registrar o usuário:", error);
        showMessage("error", "Erro ao registrar o usuário.");
      });
  };

  // Função para exibir mensagem
  const showMessage = (type, text) => {
    setMessage({ type, text });

    // Limpa a mensagem após 3 segundos
    setTimeout(() => {
      setMessage({});
    }, 3000);
  };

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
            <AntDesign name="arrowleft" size={24} color="#0E7B46" />
          </TouchableOpacity>
        </View>
        {message.type && (
          <MessageAlert type={message.type} message={message.text} />
        )}
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
              value={username}
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
              maxLength={9}
              onChangeText={(text) => setPhone(text)}
              placeholderTextColor={"gray"}
              value={phone}
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
              value={password}
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
              value={confirmPassword}
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
              Registrar
            </Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="#0077B6" />
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
