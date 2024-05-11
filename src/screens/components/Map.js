import React, { useState, useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import axios from "axios";
import polyline from "@mapbox/polyline";

const API_KEY = "5b3ce3597851110001cf6248ba8bff767c4940bdb52e66f762402a89";

export default function Map() {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const destination = { latitude: -8.9968514, longitude: 13.2636358 };

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
      fetchRoute(location.coords, destination);
    } catch (error) {
      console.log("Error getting current location:", error);
    }
  };

  const fetchRoute = async (currentLocation, destin) => {
    try {
      //console.log("Enviando solicitação de rota...");
      // console.log("Origem:", currentLocation);
      // console.log("Destino:", destin);

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

      // console.log("Resposta da rota:", response.data);
      if (
        response.data &&
        response.data.routes &&
        response.data.routes.length > 0
      ) {
        const route = response.data.routes[0];
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
      console.error("Erro ao obter a rota:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: userLocation ? userLocation.latitude : 0,
          longitude: userLocation ? userLocation.longitude : 0,
          latitudeDelta: 1.16,
          longitudeDelta: 0.9,
        }}
      >
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
        )}
        {destination && (
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            title="Destination"
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
