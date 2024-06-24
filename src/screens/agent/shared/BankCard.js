import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BankCard = ({ bankName, name, cardNumber }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.bankName}>{bankName}</Text>
        <Text style={styles.cardNumber}>{cardNumber}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#1E3F5A",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    elevation: 20, // Elevação para sombra no Android
    shadowColor: "#000", // Cor da sombra no iOS
    shadowOffset: { width: 20, height: 2 }, // Configuração da sombra
    shadowOpacity: 0.3, // Opacidade da sombra
    shadowRadius: 2, // Raio da sombra
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  bankName: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  cardNumber: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  cardContent: {
    alignItems: "flex-start",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
  },
});

export default BankCard;
