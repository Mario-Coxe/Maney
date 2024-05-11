import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderOther from "../components/HeaderOther";
import { useRoute, useNavigation } from "@react-navigation/native"; // Importe useNavigation
import { API_URL } from "../../../application.properties";
import Loading from "../components/Loading";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

const { width } = Dimensions.get("window");

export default function ListViewAtms() {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation(); // Obtenha a função de navegação
  const [atms, setAtms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nomeRua, setNomeRua] = useState("");

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  useEffect(() => {
    const fetchData = async () => {
      //setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}atms/ByStreet/${id}`);
        if (!response.ok) {
          throw new Error("Erro na requisição da API");
        }
        const data = await response.json();
        setAtms(data);
        setIsLoading(false);
        if (data.length > 0) {
          const nomeRuaPrimeiroAtm = data[0].street.name;
          setNomeRua(nomeRuaPrimeiroAtm.substring(5));
        }
      } catch (error) {
        console.error("Erro:", error);
        setIsLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log(atms);

  const handleItemPress = (item) => {
    navigation.navigate("MapAtmView", { atmData: item });
  };

  const renderLogoBanco = (name) => {
    return name.substring(name.length - 3, name.length);
  };

  const RenderItem = ({ item }) => {
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
            {renderLogoBanco(item.name)}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.textoBanco,
              { color: textColor, fontFamily: "Poppins_700Bold" },
            ]}
          >
            {item.name}
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
      <HeaderOther />
      <View style={styles.nomeRuaContainer}>
        <Text style={[styles.nomeRua, { fontFamily: "Poppins_700Bold" }]}>
          {nomeRua}
        </Text>
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
