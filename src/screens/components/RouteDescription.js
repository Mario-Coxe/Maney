import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

const RouteDescription = ({ title, distance, startPoint, endPoint }) => {
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
      <View style={styles.title}>
        <Text style={[styles.headerText, { fontFamily: "Poppins_700Bold" }]}>
          {title}
        </Text>
        <Text
          style={[styles.distanceText, { fontFamily: "Poppins_400Regular" }]}
        >
          <Text style={{ fontFamily: "Poppins_700Bold" }}> {distance}</Text> Km
        </Text>
        <Text style={[styles.pointText, { fontFamily: "Poppins_400Regular" }]}>
          De: {startPoint} - Para: {endPoint}
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
    color: "#fff",
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
    color: "#fff",
    fontSize: 12,
  },
  pointText: {
    color: "black",
    fontSize: 12,
  },
});

export default RouteDescription;
