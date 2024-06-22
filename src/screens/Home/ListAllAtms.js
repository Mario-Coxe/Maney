import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderOther from "../components/HeaderOther";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../../application.properties";
import Loading from "../components/Loading";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ListAllAtms() {
  const navigation = useNavigation();
  const [atms, setAtms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nomeRua, setNomeRua] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  const fetchData = async (address = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}atms/search/${address}`);
      if (!response.ok) {
        setIsLoading(true);
        //throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAtms(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);
  //console.log("searchQuery: ", searchQuery);
  //console.log(atms);
  const handleItemPress = (item) => {
    navigation.navigate("MapAtmView", { atmData: item });
  };

  const renderLogoBanco = (name) => {
    return name;
  };

  const RenderItem = ({ item }) => {
    if (isLoading) {
      return null;
    }

    let textColor = "#00FF00";

    switch (renderLogoBanco(item.bank.slug)) {
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
      <TouchableOpacity
        style={styles.containerAtm}
        onPress={() => handleItemPress(item)}
      >
        <View style={styles.logo}>
          <Text
            style={[
              styles.textoLogo,
              { color: textColor, fontFamily: "Poppins_700Bold" },
            ]}
          >
            {renderLogoBanco(item.bank.slug)}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.textoBanco,
              { color: textColor, fontFamily: "Poppins_700Bold" },
            ]}
          >
            {item.address}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.dinheiroContainer}>
              {item.has_cash ? (
                <>
                  <Text style={styles.values}>Dinheiro</Text>
                  <Ionicons name="checkmark" size={20} color="green" />
                </>
              ) : (
                <>
                  <Text style={styles.values}>Dinheiro</Text>
                  <Ionicons name="close" size={20} color="red" />
                </>
              )}
            </View>
            <View style={styles.papelContainer}>
              {item.has_paper ? (
                <>
                  <Text style={styles.values}>Papel</Text>
                  <Ionicons name="checkmark" size={20} color="green" />
                </>
              ) : (
                <>
                  <Text style={styles.values}>Papel</Text>
                  <Ionicons name="close" size={20} color="red" />
                </>
              )}
            </View>
            <View style={styles.distanciaContainer}></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderOther title={"ATMs"} />

      <View style={styles.barraDeBusca}>
        <TouchableOpacity activeOpacity={0.1}>
          <View style={styles.caixaBotaoBusca}>
            <FontAwesome5 name="search" color="#0E7B46" />
          </View>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Digite o endereço"
        />
        <TouchableOpacity activeOpacity={0.6}>
          <View style={styles.caixaBotaoConfiguracoes}>
            <FontAwesome5 name="filter" color="#0E7B46" size={20} />
          </View>
        </TouchableOpacity>
      </View>
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
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAtm: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8ff",
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
    fontSize: 14,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  textoBanco: {
    fontSize: 12,
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
    paddingBottom: 20,
  },
  barraDeBusca: {
    flexDirection: "row",
    width: "90%",
    height: 35,
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    justifyContent: "space-between",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 25,
  },
  caixaBotaoBusca: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
  },
  caixaBotaoConfiguracoes: {
    width: 35,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    marginTop: 5,
    borderLeftColor: "#d3cbcb",
  },
});
