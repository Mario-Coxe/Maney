import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { API_URL } from "../../../application.properties";
import { useNavigation, useRoute } from "@react-navigation/native";
import Loading from "./Loading";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

const ListProvince = () => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });
  const navigation = useNavigation();
  const [province, setProvince] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}province`);
        const data = await response.json();
        setProvince(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleMunicipe = (id) => {
    navigation.navigate("MunicipeOtherProvince", { id });
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
                ATMs
              </Text>{" "}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 12,
                  color: "#000",
                }}
              >
                {" "}
                - Outras Província
              </Text>
            </Text>
          </View>

          <FlatList
            data={province}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleMunicipe(item.id)}
              >
                <Image
                  source={require("../../../assets/image/atm-infector-fb.png")}
                  style={styles.imagem}
                />
                <Text style={styles.nomeAtm}>{item.name}</Text>
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
    fontSize: 12,
    marginTop: 10,
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
  },
  atmText: {
    color: "#0E7B46",
    fontSize: 15,
  },
});

export default ListProvince;
