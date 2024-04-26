// Popup component
import React from "react";
import { Modal, Text, View, Pressable, StyleSheet } from "react-native";

export default function Popup({ visible, onClose, title, message }) {
    console.log("Title:", title); // Debugging statement
    console.log("Message:", message); // Debugging statement
    
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text>Close</Text>
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
    fontWeight: "bold",
    color: "red",
    fontSize: 18,
    marginBottom: 10
  },
  modalMessage: {
    marginBottom: 20
  },
  closeButton: {
    marginTop: 20,
    alignItems: "center"
  }
});
