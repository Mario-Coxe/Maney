import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import HeaderOther from "../components/HeaderOther";
import Map from "../components/Map";
import { useRoute } from "@react-navigation/native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import axios from "axios";
import polyline from "@mapbox/polyline";
import MapView, { Marker, Polyline } from "react-native-maps";
import RouteDescription from "../components/RouteDescription";
const API_KEY = "5b3ce3597851110001cf6248ba8bff767c4940bdb52e66f762402a89";

const MapAtmView = () => {
  const route = useRoute();
  const { atmData } = route.params;
  const { latitude, longitude } = atmData;
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState();
  const [duration, setDuration] = useState();
  const [userAddress, setUserAddress] = useState("");

  const destination = {
    latitude: Number(longitude),
    longitude: Number(latitude),
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === "granted") {
        getCurrentLocation();
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await getCurrentPositionAsync({});
      //console.log("Current position:", location.coords);
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      fetchRoute(location.coords, destination);
      fetchUserAddress(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      // console.log("Error getting current location:", error);
    }
  };

  const fetchUserAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      if (response.data && response.data.display_name) {
        setUserAddress(response.data.display_name);
      } else {
        //console.error("Erro ao obter o endereço do usuário");
      }
    } catch (error) {
      // console.error("Erro ao obter o endereço do usuário:", error);
    }
  };

  const fetchRoute = async (currentLocation, destin) => {
    try {
      const response = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car",
        {
          coordinates: [
            [currentLocation.longitude, currentLocation.latitude],
            [destin.longitude, destin.latitude],
          ],
          options: {
            avoid_features: ["ferries"],
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      if (
        response.data &&
        response.data.routes &&
        response.data.routes.length > 0
      ) {
        const route = response.data.routes[0];
        if (route.summary && route.summary.distance) {
          const distance = route.summary.distance;
          const duration = route.summary.duration;

          setDuration(duration);
          setDistance(distance);
        }
        if (route.geometry) {
          const decodedCoordinates = polyline.decode(route.geometry);
          const coordinates = decodedCoordinates.map((coord) => ({
            latitude: coord[0],
            longitude: coord[1],
          }));
          setRouteCoordinates(coordinates);
        } else {
          console.error(
            "A resposta não contém a geometria da rota esperada:",
            response
          );
        }
      } else {
        console.error(
          "Resposta da API do OpenRouteService não está no formato esperado:",
          response
        );
      }
    } catch (error) {
      //console.error("Erro ao obter a rota:", error);
    }
  };

  function formatarDuracao(duration) {
    const horas = Math.floor(duration / 60);
    const minutos = duration % 60;

    const minutosArredondados = Math.round(minutos * 10) / 10;
    let mensagem = "";

    if (horas > 0) {
      mensagem += `${horas} hora${horas !== 1 ? "s" : ""}`;
      if (minutosArredondados > 0) {
        mensagem += ` e ${minutosArredondados} minuto${
          minutosArredondados !== 1 ? "s" : ""
        }`;
      }
    } else {
      mensagem += `${minutosArredondados} minuto${
        minutosArredondados !== 1 ? "s" : ""
      }`;
    }

    return mensagem;
  }

  const mensagemDuracao = formatarDuracao(duration);
  //console.log(`Faltam ${mensagemDuracao}.`);


  console.log(userLocation)
  return (
    <View style={styles.container}>
      <HeaderOther />
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          region={{
            latitude: userLocation ? userLocation.latitude : 0,
            longitude: userLocation ? userLocation.longitude : 0,
            latitudeDelta: 0.007,
            longitudeDelta: 0.026,
          }}
        >
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Minha localização"
              description={userAddress}
              pinColor="#008000"
            />
          )}
          {destination && (
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              title="Destino"
              description={atmData.name}
              pinColor="red"
            />
          )}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={3}
              strokeColor="#000"
            />
          )}
        </MapView>
      </View>
      <View>
        <RouteDescription
          title={atmData.address}
          distance={distance}
          //duration={mensagemDuracao}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapAtmView;
