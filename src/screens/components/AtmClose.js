import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Modal,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const atm = [
  {
    id: "1",
    logoBanco: "BAI",
    banco: "Banco BAI",
    distancia: "1.2km",
    status: "Activo",
  },
  {
    id: "2",
    logoBanco: "BFA",
    banco: "Banco BFA",
    distancia: "1.2km",
    status: "Activo",
  },
  {
    id: "3",
    logoBanco: "BIC",
    banco: "Banco BIC",
    distancia: "1.2km",
    status: "Activo",
  },
  {
    id: "4",
    logoBanco: "BAI",
    banco: "Banco BAI",
    distancia: "1.2km",
    status: "Activo",
  },
];

export default function AtmClose() {

  const RenderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          style={estilos.containerAtm}
        >
          <View style={estilos.logo}>
            <Text style={estilos.textoLogo}>{item.logoBanco}</Text>
          </View>
          <View>
            <Text style={estilos.textoBanco}>{item.banco}</Text>
            <Text style={estilos.textoEstado}>{item.status}</Text>
          </View>
          <View>
            <Text style={estilos.textoDistancia}>{item.distancia}</Text>
            <Text style={estilos.textoEstado}>Activo</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={estilos.container}>
      <View>
        <Text style={estilos.texto}>4 ATM's próximo de você</Text>
      </View>
      <View>
        {/* <FlatList
          data={atm}
          renderItem={RenderItem}
          keyExtractor={(item) => item.id.toString()}
          vertical
          showsVerticalScrollIndicator={true}
        /> */}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    backgroundColor: "#0E7B46",
    marginTop: 30,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: width
  },
  texto: {
    color: "white",
    marginTop: 30,
    marginBottom: 5,
    fontSize: 15,
    textAlign: "center"
  },
  logo: {
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textoLogo: {
    color: "blue",
  },
  containerAtm: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  textoBanco: {
    color: "black",
  },
  textoEstado: {
    color: "black",
  },
  textoDistancia: {
    color: "black",
  },
});