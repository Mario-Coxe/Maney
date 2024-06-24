import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../components/Header";
import BankCard from "./shared/BankCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import ListMyAtm from "../components/Agent/ListMyAtm";
import NavigationButton from "../components/NavigationButton";
import Profile from "./Profile";

const HomeAgent = () => {
  const route = useRoute();
  const { userData } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title={"MONEY"} />
      <BankCard
        bankName="Banco XYZ"
        name={userData.name}
        cardNumber="1234 5678 9012 3456"
      />
      <ListMyAtm id={userData.id} name={userData.name} />
      <View style={{ alignItems: "center" }}>
        <NavigationButton
          onPressProfile={() => {
            navigation.navigate("Profile", { userData: userData });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Cor de fundo da tela
  },
});

export default HomeAgent;
