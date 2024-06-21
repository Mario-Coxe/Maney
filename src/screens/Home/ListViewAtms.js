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
import { useRoute, useNavigation } from "@react-navigation/native";
import { API_URL } from "../../../application.properties";
import Loading from "../components/Loading";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

export default function ListViewAtms() {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
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
          <Loading />;
        }
        const data = await response.json();
        setAtms(data);
        //console.log("data", data);
        setIsLoading(false);
        if (data.length > 0) {
          const nomeRuaPrimeiroAtm = data[0].street.name;
          setNomeRua(nomeRuaPrimeiroAtm.substring(0));
        }
      } catch (error) {
        //console.error("Erro:", error);
        setIsLoading(true);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

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

    //console.log(item);
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
              { color: "#0E7B46", fontFamily: "Poppins_700Bold" },
            ]}
          >
            {item.name}
          </Text>
          <View style={styles.iconContainer}>
            <View style={styles.statusContainer}>
              <Ionicons
                name="cash-outline"
                size={24}
                color="#4CAF50"
                style={styles.icon}
              />
              <Text style={styles.values}>Dinheiro</Text>
              <Ionicons
                name={
                  item.has_cash
                    ? "checkmark-circle-outline"
                    : "close-circle-outline"
                }
                size={24}
                color={item.has_cash ? "green" : "red"}
                style={styles.iconStatus}
              />
              <Text style={styles.quantidade}>{item.how_many_cash}</Text>
            </View>
            <View style={styles.statusContainer}>
              <Ionicons
                name="document-outline"
                size={24}
                color="#4CAF50"
                style={styles.icon}
              />
              <Text style={styles.values}>Papel</Text>
              <Ionicons
                name={
                  item.has_paper
                    ? "checkmark-circle-outline"
                    : "close-circle-outline"
                }
                size={24}
                color={item.has_paper ? "green" : "red"}
                style={styles.iconStatus}
              />
              <Text style={styles.quantidade}>{item.how_many_paper}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderOther />
      <View style={styles.nomeRuaContainer}>
        <Text
          style={[
            styles.nomeRua,
            { fontFamily: "Poppins_700Bold", textTransform: "uppercase" },
          ]}
        >
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
    borderRadius: 0,
    padding: 15,
    paddingHorizontal: 20,
    shadowColor: "#0E7B46",
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 0,
    elevation: 15,
  },
  logo: {
    backgroundColor: "white",
    borderRadius: 25,
    borderColor: "#ddd",
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
    marginLeft: 20,
  },
  textoBanco: {
    fontSize: 15,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  quantidade: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
  nomeRuaContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  nomeRua: {
    textAlign: "center",
    fontSize: 15,
  },
  values: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginRight: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  values: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginLeft: 5,
  },
  quantidade: {
    marginLeft: 5,
    fontSize: 16,
    color: "#666",
  },
  icon: {
    marginRight: 5,
  },
  iconStatus: {
    marginLeft: 5,
  },
});
