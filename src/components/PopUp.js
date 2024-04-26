// Popup component
import React from "react";
import { Modal, Text, View, Pressable } from "react-native";

export default function Popup({ visible, onClose }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
          <Text>Popup Content</Text>
          <Pressable onPress={onClose} style={{ marginTop: 20 }}>
            <Text>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
