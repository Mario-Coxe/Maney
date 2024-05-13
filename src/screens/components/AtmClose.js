import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { API_URL } from "../../../application.properties";
import Loading from "./Loading";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function AtmClose() {
  const [userLocation, setUserLocation] = useState(null);
  const [atms, setAtms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  const requestLocationPermission = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === "granted") {
        console.log("Location permission granted");
        getCurrentLocation();
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await getCurrentPositionAsync({});
      console.log("Current position:", location.coords);
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log("Error getting current location:", error);
    }
  };

  useEffect(() => {
    const fetchClosestAtms = async () => {
      try {
        if (userLocation) {
          const response = await fetch(
            `${API_URL}closest?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`
          );
          const data = await response.json();
          setAtms(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar os caixas eletrônicos:", error);
        setIsLoading(false);
      }
    };

    fetchClosestAtms();
  }, [userLocation]);

  const renderLogoBanco = (name) => {
    return name.substring(name.length - 3, name.length);
  };

  const renderAtmItem = ({ item }) => {
    if (isLoading) {
      return null;
    }

    let textColor = "#00FF00";

    switch (renderLogoBanco(item.name)) {
      case "BAI":
        textColor = "blue";
        break;
      case "BFA":
        textColor = "#FD6502";
        break;
      case "SOL":
        textColor = "#fecb00";
        break;
      case "BIC":
        textColor = "red";
        break;
      case "BIR":
        textColor = "#C27A23";
        break;
      case "BCI":
        textColor = "#C27A23";
        break;
      case "BCS":
        textColor = "#C27A23";
        break;
      case "BMA":
        textColor = "#0d6efd";
        break;
      default:
        textColor = "#0E7B46";
        break;
    }

    if (!fontsLoaded) {
      return <View style={styles.container}></View>;
    }

    return (
      <TouchableOpacity style={styles.atmContainer}>
        <View style={[styles.logoContainer, { backgroundColor: textColor }]}>
          <Text
            style={[
              styles.logoText,
              { fontFamily: "Poppins_700Bold", fontSize: 13, color: "#fff" },
            ]}
          >
            {renderLogoBanco(item.name)}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.addressText,
              { fontFamily: "Poppins_700Bold", fontSize: 12, color: "#000" },
            ]}
          >
            {item.address}
          </Text>
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.statusText,
                { fontFamily: "Poppins_400Regular", fontSize: 13 },
              ]}
            >
              Dinheiro:{" "}
              {item.has_cash ? (
                <Ionicons name="checkmark" size={20} color="green" />
              ) : (
                <Ionicons name="close" size={20} color="red" />
              )}
            </Text>
            <Text
              style={[
                styles.statusText,
                { fontFamily: "Poppins_400Regular", fontSize: 13 },
              ]}
            >
              Papel:{" "}
              {item.has_paper ? (
                <Ionicons name="checkmark" size={20} color="green" />
              ) : (
                <Ionicons name="close" size={20} color="red" />
              )}
            </Text>
          </View>
        </View>
        <Text
          style={[styles.distanceText, { fontFamily: "Poppins_400Regular" }]}
        >
          {item.distance} km
        </Text>
      </TouchableOpacity>
    );
  };

  console.log(atms);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={atms}
          renderItem={renderAtmItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E7B46",
    marginTop: 30,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  atmContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "white",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  addressText: {
    color: "black",
  },
  statusContainer: {
    marginTop: 5,
  },
  statusText: {
    color: "black",
  },
  distanceText: {
    fontSize: 13,
    color: "black",
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
