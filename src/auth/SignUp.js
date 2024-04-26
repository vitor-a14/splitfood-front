import React, { useState } from "react";
import { Text, TextInput, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import Popup from "../components/PopUp";

export default function SignUp() {
  const [state, setState] = useState({
    cpf: "",
    username: "",
    password: "",
    role: ""
  });

  const [popupVisible, setPopupVisible] = useState(false);

  const handleInputChange = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPopupVisible(true);
    console.log(state);
  };

  const closePopup = () => {
    setPopupVisible(false); // Close the popup
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crie uma nova conta</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={state.cpf}
          onChangeText={(value) => handleInputChange("cpf", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          value={state.username}
          onChangeText={(value) => handleInputChange("username", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={state.password}
          onChangeText={(value) => handleInputChange("password", value)}
        />
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Pressable>
      </View>
      <Popup visible={popupVisible} onClose={closePopup} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingTop: 70,
    alignItems: "center",
    justifyContent: "top",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 40,
  },
  inputView: {
    width: "80%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#D3D3D3", // Slightly grey border color
    borderWidth: 1,
    borderRadius: 10, // Rounded corners
    marginBottom: 20, // Increase space between inputs
  },
  button: {
    backgroundColor: "red",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
});
