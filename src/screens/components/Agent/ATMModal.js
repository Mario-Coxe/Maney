import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Switch,
  StyleSheet,
} from "react-native";

const ATMModal = ({ isVisible, closeModal, atmId, updateData }) => {
  const [hasCash, setHasCash] = useState(false);
  const [hasPaper, setHasPaper] = useState(false);

  const toggleCash = () => {
    setHasCash(!hasCash);
  };

  const togglePaper = () => {
    setHasPaper(!hasPaper);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://192.168.43.63:8080/api/v1/atmUpdate/${atmId}/${
          hasCash ? 1 : 0
        }/${hasPaper ? 1 : 0}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      console.log(data); // Aqui você pode lidar com a resposta do servidor, se necessário
      closeModal();
      updateData();
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Alterar estado do ATM</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Dinheiro:</Text>
            <Switch value={hasCash} onValueChange={toggleCash} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Papel:</Text>
            <Switch value={hasPaper} onValueChange={togglePaper} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.button, styles.saveButton]}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={closeModal}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  switchLabel: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#E91E63",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ATMModal;
