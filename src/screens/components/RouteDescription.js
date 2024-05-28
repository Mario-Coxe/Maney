import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Poppins_700Bold, Poppins_400Regular } from "@expo-google-fonts/poppins";
import Loading from "./Loading";
const RouteDescription = ({ title, distance, duration }) => {
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

  if (!distance) {
    return (
      <View style={styles.header}>
         <Loading/>
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <View style={styles.title}>
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            color: "#000",
            fontSize: 12,
          }}
        >
          Endereço:
          <Text style={[styles.headerText, { fontFamily: "Poppins_700Bold" }]}>
            {title}
          </Text>
        </Text>
        <Text
          style={[styles.distanceText, { fontFamily: "Poppins_400Regular" }]}
        >
          Distância:
          <Text style={{ fontFamily: "Poppins_700Bold" }}> {distance}</Text> Km
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
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  headerText: {
    color: "#000",
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
    marginTop: 0,
    marginBottom: 20,
  },
  distanceText: {
    color: "#000",
    fontSize: 12,
  },
  pointText: {
    color: "black",
    fontSize: 12,
  },
});

export default RouteDescription;
