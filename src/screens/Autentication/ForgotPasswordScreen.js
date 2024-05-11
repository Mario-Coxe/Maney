/** @format */

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Fontisto, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import styles from "./Styles/ForgotPasswordScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins"


const ForgotPasswordScreen = () => {

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });


  const [phone, setPhone] = useState("");
  const navigation = useNavigation();



  const handleSendEmail = () => {
    navigation.navigate("OTP");
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
        <Text style={[styles.bemvindoText, { fontFamily: "Poppins_700Bold" }]}>Esqueceu a senha?</Text>
        <Text style={[styles.loginText, { fontFamily: "Poppins_400Regular" }]}>Digite seu número de telefone </Text>
        <Text style={[styles.loginText, { fontFamily: "Poppins_400Regular" }]}>e enviaremos instruções para</Text>
        <Text style={[styles.loginText, { fontFamily: "Poppins_400Regular" }]}>redefinir sua senha </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <AntDesign name='arrowleft' size={24} color='#fff' />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputIconContainer}>
          <Fontisto
            name='phone'
            size={22}
            color='gray'
            style={styles.inputIcon}
          />
          <TextInput
            style={[styles.input, { fontFamily: "Poppins_600SemiBold" }]}
            placeholder='000-000-000'
            onChangeText={(text) => setPhone(text)}
            placeholderTextColor={"gray"}
          />
        </View>

        <TouchableOpacity style={styles.entrarButton} onPress={handleSendEmail}>
          <Text style={[styles.entrarButtonText, { fontFamily: "Poppins_600SemiBold" }]}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style='#0077B6' />
    </View>
  );
};

export default ForgotPasswordScreen;
