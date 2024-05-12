import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { API_URL } from "../../../application.properties";
import Loading from "./Loading";
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
  const [userLocation, setUserLocation] = useState(null);
  const [atms, setAtms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

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

  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.containerAtm}>
        <View style={styles.logo}>
          <Text style={styles.textoLogo}>{item.name}</Text>
        </View>
        <View>
          <Text style={styles.textoBanco}>{item.address}</Text>
          <Text style={styles.textoEstado}>
            Dinheiro: {item.has_cash ? "Sim" : "Não"}
          </Text>
          <Text style={styles.textoEstado}>
            Papel: {item.has_paper ? "Sim" : "Não"}
          </Text>
        </View>
        <View>
          <Text style={styles.textoDistancia}>{item.distance} km</Text>
        </View>
      </TouchableOpacity>
    );
  };

  console.log(atms);

  return (
    <View style={estilos.container}>
      {isLoading ? (
        <View style={{ marginTop: 40 }}>
          <Loading />
        </View>
      ) : (
        <FlatList
          data={atms}
          renderItem={RenderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={estilos.flatListContent}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    backgroundColor: "#0E7B46",
    marginTop: 30,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: width,
  },
  texto: {
    color: "white",
    marginTop: 30,
    marginBottom: 5,
    fontSize: 15,
    textAlign: "center",
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
  flatListContent: {
    paddingBottom: 20, // Adicione margem inferior para a FlatList
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAtm: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 15,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
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
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  textoBanco: {
    fontSize: 16,
    marginBottom: 5,
  },
  textoDistancia: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dinheiroContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  papelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  distanciaContainer: {
    flexDirection: "row",
    marginTop: 50,
    right: 300,
  },
  nomeRuaContainer: {
    marginTop: 10,
  },
  nomeRua: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 15,
  },
  values: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  flatListContent: {
    paddingBottom: 20, // Adicione margem inferior para a FlatList
  },
});
   