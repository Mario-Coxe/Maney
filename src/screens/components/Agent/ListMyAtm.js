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
import { Ionicons } from "@expo/vector-icons";
import ATMModal from "./ATMModal";

const ListMyAtm = ({ id, name }) => {
  const route = useRoute();
  //const { id } = route.params;
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedATMId, setSelectedATMId] = useState(null);

  const [hasCash, setHasCash] = useState(false);
  const [hasPaper, setHasPaper] = useState(true);

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

  const updateData = async () => {
    try {
      const response = await fetch(`${API_URL}getAtmAgent/${id}`);
      const data = await response.json();
      setAtm(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const renderLogoBanco = (name) => {
    return name.substring(name.length - 3, name.length);
  };

  const RenderItem = ({ item }) => {
    if (isLoading) {
      return null;
    }

    let textColor = "#00FF00";

    switch (renderLogoBanco(item.atm.name)) {
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
            {renderLogoBanco(item.atm.name)}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.textoBanco,
              { color: textColor, fontFamily: "Poppins_700Bold" },
            ]}
          >
            {item.atm.name}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.dinheiroContainer}>
              {item.atm.has_cash ? (
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
              {item.atm.has_paper ? (
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

  const handleItemPress = (item) => {
    setSelectedATMId(item.atm.id);
    setHasCash(item.atm.has_cash);
    setHasPaper(item.atm.has_paper);
    setModalVisible(true);
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
            renderItem={RenderItem}
            keyExtractor={(item) => item.atm.id.toString()}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.flatListContent}
          />

          <ATMModal
            isVisible={modalVisible}
            closeModal={() => setModalVisible(false)}
            atmId={selectedATMId}
            updateData={updateData}
            _hasCash={hasCash}
            _hasPaper={hasPaper}
          />
        </View>
      )}
    </View>
  );
};

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
    fontSize: 14,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  textoBanco: {
    fontSize: 15,
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
  nameProvinceLuanda: {
    textAlign: "center",
    marginTop: 20,
  },
});

export default ListMyAtm;
