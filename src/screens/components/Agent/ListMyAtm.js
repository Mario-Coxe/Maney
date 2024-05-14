import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_URL } from "../../../../application.properties";
import Loading from "../Loading";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

const ListMyAtm = ({ id, name }) => {
  const route = useRoute();
  //const { id } = route.params;
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  const [atm, setAtm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const provinceLuandaId = 5;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}getAtmAgent/${id}`);
        const data = await response.json();
        setAtm(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(atm);

  const handleStreets = (id) => {
    navigation.navigate("Street", { id });
  };

  if (!fontsLoaded) {
    return <View style={styles.container}></View>;
  }
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <View style={styles.provinceLuanda}>
            <Text style={styles.nameProvinceLuanda}>
              {" "}
              <Text style={[styles.atmText, { fontFamily: "Poppins_700Bold" }]}>
                ATMs geridos por
              </Text>{" "}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 12,
                  color: "#000",
                }}
              >
                {" "}
                - {name}
              </Text>
            </Text>
          </View>

          <FlatList
            data={atm}
            keyExtractor={(item) => item.atm.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                //onPress={() => handleStreets(item.id)}
              >  
                <Image
                  source={require("../../../../assets/image/atm-infector-fb.png")}
                  style={styles.imagem}
                />
                <Text style={styles.nomeAtm}>{item.atm.name}</Text>
                <Text style={styles.nomeAtm}>{item.atm.address}</Text>
              </TouchableOpacity>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 40,
    alignItems: "center",
  },
  nomeAtm: { 
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#000",
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  flatListContent: {
    alignItems: "flex-start",
  },
  provinceLuanda: {},
  nameProvinceLuanda: {
    color: "#000",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 20
  },
  atmText: {
    color: "#0E7B46",
    fontSize: 15,
    right: -20,
  },
});

export default ListMyAtm;
