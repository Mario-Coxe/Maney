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
import HeaderOther from "../components/HeaderOther";
import { API_URL } from "../../../application.properties";
import Loading from "../components/Loading";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

const Street = () => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
  const [street, setStreet] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  //console.log(" id municipio >> ", municipeId)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setNotFound(false);
      try {
        const response = await fetch(`${API_URL}streetByMunicipe/${id}`);
        const data = await response.json();
        setStreet(data);
        setIsLoading(false);

        //console.log(street.length);
        if (street.length === 0) {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Erro:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(street);
  const ListViewAtms = (id) => {
    navigation.navigate("ListViewAtms", { id });
  };

  if (!fontsLoaded) {
    return <View style={styles.container}></View>;
  }
  return (
    <View style={styles.container}>
      <HeaderOther title={"Ruas"} />
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
                  onPress={() => ListViewAtms(item.id)}
                >
                  <Image
                    source={require("../../../assets/image/street.jpg")}
                    style={styles.imagem}
                  />
                  <Text
                    style={[
                      styles.nomeAtm,
                      { fontFamily: "Poppins_400Regular" },
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
            />

            {notFound ? (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Poppins_700Bold",
                    color: "red",
                    fontSize: 16
                  }}
                >
                  Sem Ruas Cadastradas
                </Text>
              </View>
            ) : (
              <View></View>
            )}
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

export default Street;
