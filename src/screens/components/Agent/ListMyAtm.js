import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Switch
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
import { useSelector } from "react-redux";

const ListMyAtm = ({ id, name }) => {
  const route = useRoute();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedATM, setSelectedATM] = useState(null);
  const [hasCash, setHasCash] = useState(false);
  const [hasPaper, setHasPaper] = useState(true);
  const [howManyCash, setHowManyCash] = useState(0);
  const [howManyPaper, setHowManyPaper] = useState(0);

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  const [atm, setAtm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}getAtmAgent/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setAtm(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro:", error);
        setIsLoading(true);
      }
    };

    fetchData();
  }, [id, token]);

  const handleItemPress = (item) => {
    setSelectedATM(item.atm);
    setHasCash(item.atm.has_cash);
    setHasPaper(item.atm.has_paper);
    setHowManyCash(item.atm.how_many_cash);
    setHowManyPaper(item.atm.how_many_paper);
    setModalVisible(true);
  };

  const handleUpdateAtm = async () => {
    try {
      const response = await fetch(`${API_URL}atmUpdate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedATM.id,
          has_cash: hasCash,
          has_paper: hasPaper,
          how_many_cash: howManyCash,
          how_many_paper: howManyPaper,
        }),
      });

      if (response.ok) {
        setModalVisible(false);
        // Refresh ATM data
        const updatedAtm = atm.map((a) =>
          a.atm.id === selectedATM.id
            ? { ...a, atm: { ...selectedATM, has_cash: hasCash, has_paper: hasPaper, how_many_cash: howManyCash, how_many_paper: howManyPaper } }
            : a
        );
        setAtm(updatedAtm);
      } else {
        console.error("Failed to update ATM");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const renderLogoBanco = (name) => {
    return name;
  };

  const RenderItem = ({ item }) => {
    if (isLoading) {
      return null;
    }

    let textColor = "#00FF00";

    switch (renderLogoBanco(item.atm.bank.slug)) {
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
            {renderLogoBanco(item.atm.bank.slug)}
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

  if (!fontsLoaded) {
    return <View style={styles.container}></View>;
  }
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <FlatList
            data={atm}
            renderItem={RenderItem}
            keyExtractor={(item) => item.atm.id.toString()}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>ACTUALIZAR</Text>
            {/* <Text style={styles.modalText}>ID: {selectedATM?.id}</Text> */}
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Tem Dinheiro:</Text>
              <Switch
                value={hasCash}
                onValueChange={(value) => setHasCash(value)}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Tem Papel:</Text>
              <Switch
                value={hasPaper}
                onValueChange={(value) => setHasPaper(value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={String(howManyCash)}
                onChangeText={(text) => setHowManyCash(Number(text))}
                placeholder="Quantidade de Dinheiro"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                value={String(howManyPaper)}
                onChangeText={(text) => setHowManyPaper(Number(text))}
                placeholder="Quantidade de Papel"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleUpdateAtm}>
                <Text style={styles.buttonText}>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.80,
    shadowRadius: 0,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular'
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins_400Regular'
  },
});

export default ListMyAtm;
