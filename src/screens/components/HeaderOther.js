import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

const HeaderOther = ({ title }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };
  if (!fontsLoaded) {
    return <View style={styles.container}></View>;
  }
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <FontAwesome5 name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text
        style={[styles.headerText, { fontFamily: "Poppins_400Regular" }]}
        onPress={handleGoBack}
      >
        Voltar
      </Text>

      <View style={styles.title}>
        <Text style={[styles.headerText, { fontFamily: "Poppins_700Bold" }]}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    paddingTop: 36,
    backgroundColor: "#0E7B46",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  headerText: {
    color: "black",
    fontSize: 15,
    marginLeft: 10,
  },
  backButton: {
    marginLeft: 10,
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    left: -50,
  },
});

export default HeaderOther;
