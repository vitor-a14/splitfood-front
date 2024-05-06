// Popup component
import React from "react";
import { Modal, Text, View, Pressable, StyleSheet } from "react-native";

export default function Popup({ visible, onClose, title, message }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text>Entendi</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "red",
    fontSize: 18,
    marginBottom: 10
  },
  modalMessage: {
    textAlign: "center",
    marginBottom: 20
  },
  closeButton: {
    marginTop: 20,
    alignItems: "center",
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: "red", 
    paddingVertical: 10,
    paddingHorizontal: 20 
  }
});
