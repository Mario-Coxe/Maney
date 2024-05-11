import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Search = () => {
  return (
    <View style={styles.barraDeBusca}>
      <TouchableOpacity activeOpacity={0.1}>
        <View style={styles.caixaBotaoBusca}>
          <FontAwesome5 name="search" color="#0E7B46" />
        </View>
      </TouchableOpacity>
      <TextInput style={styles.input} />
      <TouchableOpacity activeOpacity={0.6}>
        <View style={styles.caixaBotaoConfiguracoes}>
          <FontAwesome5 name="filter" color="#0E7B46" size={20} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  barraDeBusca: {
    flexDirection: "row",
    width: "90%",
    height: 35,
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    justifyContent: "space-between",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 25,
  },
  caixaBotaoBusca: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
  },
  caixaBotaoConfiguracoes: {
    width: 35,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    marginTop: 5,
    borderLeftColor: "#d3cbcb",
  },
});

export default Search;
