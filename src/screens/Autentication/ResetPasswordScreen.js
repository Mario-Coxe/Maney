/** @format */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import styles from "./Styles/LoginScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins"


const ResetPasswordScreen = () => {

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation()

  const handleLogin = () => {
    navigation.navigate("Login")
  };

  const handleForgotPassword = () => {

  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>

      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={[styles.bemvindoText, { fontFamily: "Poppins_700Bold" }]}>Redefinir Senha</Text>
        <Text style={[styles.loginText, { fontFamily: "Poppins_400Regular" }]}>
          Digite seu novo senha nos campos abaixo
        </Text>
        <Text style={[styles.loginText, { fontFamily: "Poppins_400Regular" }]}>
          e clique em Redefinir Senha para concluir
        </Text>
        <Text style={[styles.loginText, { fontFamily: "Poppins_400Regular" }]}>
          o processo de redefinição de senha
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputIconContainer}>
          <AntDesign
            name='lock1'
            size={24}
            color='gray'
            style={styles.inputIcon}
          />
          <TextInput
            style={[styles.input, { fontFamily: "Poppins_600SemiBold" }]}
            placeholder='Senha'
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor={"gray"}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome5
              name={showPassword ? "eye-slash" : "eye"}
              size={24}
              color='gray'
              style={styles.passwordIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputIconContainer}>
          <AntDesign
            name='lock1'
            size={24}
            color='gray'
            style={styles.inputIcon}
          />
          <TextInput
            style={[styles.input, { fontFamily: "Poppins_600SemiBold" }]}
            placeholder='Confirmar Senha'
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor={"gray"}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome5
              name={showPassword ? "eye-slash" : "eye"}
              size={24}
              color='gray'
              style={styles.passwordIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.entrarButton} onPress={handleLogin}>
          <Text style={[styles.entrarButtonText, { fontFamily: "Poppins_600SemiBold" }]}>Redefinir Senha</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style='#0077B6' />
    </View>
  );
};

export default ResetPasswordScreen;
