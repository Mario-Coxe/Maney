import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../../application.properties";
import Loading from "./Loading";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";

const AtmClose = () => {
  const navigation = useNavigation();
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
      setIsLoading(true);

      try {
        if (userLocation) {
          const response = await fetch(
            `${API_URL}closest?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`
          );
          if (!response.ok) {
            <Loading />;
          }
          const data = await response.json();
          setAtms(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar os caixas eletrônicos:", error);
        setIsLoading(true);
      }
    };

    fetchClosestAtms();

    // Atualização a cada 1 minuto (60000 milissegundos)
    const intervalId = setInterval(fetchClosestAtms, 60000);

    // Limpar intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, [userLocation]);

  const renderLogoBanco = (name) => {
    return name.substring(name.length - 3, name.length);
  };

  const handleItemPress = (item) => {
    navigation.navigate("MapAtmView", { atmData: item });
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

    return (
      <TouchableOpacity
        style={styles.atmContainer}
        onPress={() => handleItemPress(item)}
      >
        <View style={[styles.logoContainer, { backgroundColor: textColor }]}>
          <Text style={styles.logoText}>{renderLogoBanco(item.name)}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.addressText}>{item.address}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              Dinheiro:{" "}
              {item.has_cash ? (
                <Ionicons name="checkmark" size={20} color="green" />
              ) : (
                <Ionicons name="close" size={20} color="red" />
              )}
            </Text>
            <Text style={styles.statusText}>
              Papel:{" "}
              {item.has_paper ? (
                <Ionicons name="checkmark" size={20} color="green" />
              ) : (
                <Ionicons name="close" size={20} color="red" />
              )}
            </Text>
          </View>
        </View>
        <Text style={styles.distanceText}>{item.distance} km</Text>
      </TouchableOpacity>
    );
  };

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    !isLoading && (
      <View style={styles.container}>
        <Text style={styles.atmsproximos}>ATMs MAIS PRÓXIMOS</Text>
        <FlatList
          data={atms}
          renderItem={renderAtmItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 10,
  },
  atmContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  logoText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#fff",
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  addressText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#777",
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#333",
  },
  distanceText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#333",
  },
});

export default AtmClose;
