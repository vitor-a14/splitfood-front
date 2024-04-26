import React, { useState } from "react";
import { Text, TextInput, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import Popup from "../components/PopUp";

export default function SignUp() {
  //state das informações do forms
  const [state, setState] = useState({
    cpf: "",
    username: "",
    password: "",
    role: ""
  });

  //state do pop up que irá informar o usuário se houve sucesso ou erro no cadastro
  const [popupVisible, setPopupVisible] = useState(false); 
  const [popupTitle, setPopupTitle] = useState(""); 
  const [popupMessage, setPopupMessage] = useState("");

  //função chamado para atualizar o forms
  const handleInputChange = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  //função chamada ao finalizar o forms de cadastro
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(JSON.stringify(state))

    //comunicação com o backend
    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na respsota do servidor!');
      }
      return response.json();
    })
    .then(data => {
      //Sucesso
      console.log("Sucesso no cadastro!");
      setPopupTitle("Sucesso ao Cadastrar");
      setPopupMessage("Você será redirecionado para a tela de login");
      setPopupVisible(true); 
    })
    .catch(error => {
      //Erro
      //console.log("Erro no cadastro: ", error);
      setPopupTitle("Erro ao Cadastrar");
      setPopupMessage("Parece que os servidores estão fora do ar, tente novamente mais tarde.");
      setPopupVisible(true);
    });
  };

  const closePopup = () => {
    setPopupVisible(false); 
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
      <Popup visible={popupVisible} onClose={closePopup} title={popupTitle} message={popupMessage} />
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
    borderColor: "#D3D3D3", 
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20, 
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
