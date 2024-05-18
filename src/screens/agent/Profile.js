/** @format */

import React, { useState, useEffect } from "react";
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
import styles from "../Autentication/Styles/RegisterStyle";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import axios from "axios";
import { API_URL } from "../../../application.properties";

const Profile = () => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const route = useRoute();
  const { userData } = route.params;

  const [username, setUsername] = useState(userData.name);
  const [phone, setPhone] = useState(userData.phone);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState(userData.tipo_usuario);
  const [ativo, setAtivo] = useState(userData.ativo);
  const [foto, setFoto] = useState(userData.foto);
  const [ultimaAtividade, setUltimaAtividade] = useState(userData.ultima_atividade);
  const [createdAt, setCreatedAt] = useState(userData.created_at);
  const [updatedAt, setUpdatedAt] = useState(userData.updated_at);

  useEffect(() => {
    if (userData) {
      setUsername(userData.name);
      setPhone(userData.phone);
      setTipoUsuario(userData.tipo_usuario);
      setUltimaAtividade(userData.ultima_atividade);
      setCreatedAt(userData.created_at);
      setUpdatedAt(userData.updated_at);
    }
  }, [userData]);

  const handleUpdate = () => {
    if (password && password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    axios
      .post(`${API_URL}update`, {
        name: username,
        phone: phone,
        password: password || undefined,
        tipo_usuario: tipoUsuario,
        ativo: ativo,
        foto: foto,
        ultima_atividade: ultimaAtividade,
        created_at: createdAt,
        updated_at: updatedAt,
      })
      .then((response) => {
       // console.log("Atualização bem-sucedida:", response.data);
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      })
      .catch((error) => {
       // console.error("Erro ao atualizar o perfil:", error);
        Alert.alert("Erro", "Erro ao atualizar o perfil, contacte o seu banco!");
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
          <Text style={[styles.bemvindoText, { fontFamily: "Poppins_700Bold" }]}>
            Perfil
          </Text>
          <Text style={[styles.loginText, { fontFamily: "Poppins_400Regular" }]}>
            Dados do agente
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
            <Text style={styles.label}>Nome: </Text>
            {/* <AntDesign name="user" size={24} color="gray" style={styles.inputIcon} /> */}
            <TextInput
              style={[styles.input, { fontFamily: "Poppins_600SemiBold" }]}
              placeholderTextColor={"gray"}
              onChangeText={(text) => setUsername(text)}
              placeholder="Nome"
              value={username}
            />
          </View>
          <View style={styles.inputIconContainer}>
            <Text style={styles.label}>Telefone: </Text>
            {/* <AntDesign name="phone" size={24} color="gray" style={styles.inputIcon} /> */}
            <TextInput
              style={[styles.input, { fontFamily: "Poppins_600SemiBold" }]}
              placeholder="Telefone"
              onChangeText={(text) => setPhone(text)}
              placeholderTextColor={"gray"}
              value={phone}
            />
          </View>
          <View style={styles.inputIconContainer}>
            <Text style={styles.label}>Tipo de Usuário: </Text>
            <TextInput
              style={[styles.input, { fontFamily: "Poppins_600SemiBold" }]}
              placeholder="Tipo de Usuário"
              onChangeText={(text) => setTipoUsuario(text)}
              placeholderTextColor={"gray"}
              value={tipoUsuario}
            />
          </View>
          <View style={styles.inputIconContainer}>
            <Text style={styles.label}>Última Atividade</Text>
            <TextInput
              style={[styles.input, { fontFamily: "Poppins_600SemiBold" }]}
              placeholder="Última Atividade"
              onChangeText={(text) => setUltimaAtividade(text)}
              placeholderTextColor={"gray"}
              value={ultimaAtividade}
            />
          </View>
          <TouchableOpacity style={styles.entrarButton} onPress={handleUpdate}>
            <Text style={[styles.entrarButtonText, { fontFamily: "Poppins_600SemiBold" }]}>
              Atualizar
            </Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="#0077B6" />
      </ScrollView>
    </View>
  );
};

export default Profile;
