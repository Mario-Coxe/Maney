import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderOther from "./HeaderOther";
import { API_URL } from "../../../application.properties";
import Loading from "./Loading";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

const ListMunicipeOthersProvincia = () => {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
  const [street, setStreet] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  //console.log(" id municipio >> ", municipeId)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}municipeByProvince/${id}`);
        const data = await response.json();
        setStreet(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStreets = (id) => {
    navigation.navigate("Street", { id });
  };

  if (!fontsLoaded) {
    return <View style={styles.container}></View>;
  }
  // console.log(street);

  return (
    <View style={styles.container}>
      <HeaderOther title={"Municipio"} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.container}>
            <FlatList
              data={street}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleStreets(item.id)}
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

          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/ui/Caminho_1.png")}
              style={styles.image}
            />
            <Image
              source={require("../../../assets/ui/Caminho_1.png")}
              style={styles.image}
            />
            <Image
              source={require("../../../assets/ui/Caminho_1.png")}
              style={styles.image}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 550,
    marginLeft: -40,
    marginRight: -10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
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
    fontFamily: "Poppins_400Regular",
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  flatListContent: {
    alignItems: "flex-start",
  },
});

export default ListMunicipeOthersProvincia;
