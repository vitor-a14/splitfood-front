// Popup component
import React, { useState } from 'react';
import { Modal, Text, View, Pressable, StyleSheet, TextInput } from "react-native";
import { InputNumber } from 'primereact/inputnumber';
import "primereact/resources/themes/lara-light-cyan/theme.css";
export default function Popup({ visible, onClose }) {
  const [formData, setFormData] = useState({
      itemName: '',
      quantity: 0,
  });

  const handleChange = (name, value) => {
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Adicionar novo item</Text>
          <TextInput
                    style={styles.input}
                    placeholder='Nome do item'
                    value={formData.cpf}
                    onChangeText={(value) => handleChange('itemName', value)}
                    autoCorrect={false}
                    autoCapitalize='none'
                />

          <InputNumber value={formData.quantity} onValueChange={(e) => handleChange('quantity', e.value)} buttonLayout="horizontal" step={1}
            decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            mode="decimal" showButtons min={1} max={100} />

          <Text style={styles.modalMessage}>mensagem</Text>
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
