import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import styles from './Styles/OTPScreenStyle';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins"



const OTPScreen = () => {

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });


  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const navigation = useNavigation()

  const handleSendOtp = () => {
    navigation.navigate("Reset")
  };

  const handleOtpInputChange = (text, index) => {
    if (text.length === 1 && index < 3) {
      otpInputRefs[index + 1].focus();
    }
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = text;
    setOtpDigits(newOtpDigits);
  };

  const otpInputRefs = [];


  if (!fontsLoaded) {
    return (
      <View style={styles.container}>

      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={[styles.bemvindoText, { fontFamily: "Poppins_700Bold" }]}>
          Verificação de OTP
        </Text>
        <Text style={[styles.loginText, { fontFamily: "Poppins_400Regular" }]}>
          Digite o código de verificação de 4 dígitos
        </Text>
        <Text style={[styles.loginText]}>
          enviando para <Text style={[styles.loginText, { fontFamily: "Poppins_400Regular" }]}>+244 000000000</Text>
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.otpInputContainer}>
          {otpDigits.map((digit, index) => (
            <TextInput
              key={index}
              style={[styles.otpInput, { fontFamily: "Poppins_600SemiBold" }]}
              placeholder="0"
              placeholderTextColor={'gray'}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handleOtpInputChange(text, index)}
              ref={(input) => (otpInputRefs[index] = input)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.entrarButton} onPress={handleSendOtp}>
          <Text style={[styles.entrarButtonText, { fontFamily: "Poppins_600SemiBold" }]}>
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="#0077B6" />
    </View>
  );
};

export default OTPScreen;
