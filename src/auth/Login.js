import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
    const navigation = useNavigation();
    const {username,setUsername}=  useState("");
    const {password,setPassword}=  useState("");

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>SplitFood</Text>

        <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder='Nome do Usuário' value={username} onChangeText={setUsername} autoCorrect={false}
        autoCapitalize='none' />
            <TextInput style={styles.input} placeholder='Senha' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false}
        autoCapitalize='none'/>

            <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={() => Alert.alert("Login Successfuly!","yay")}>
                <Text style={styles.buttonText}>Entrar</Text>
            </Pressable>
            </View>

        </View>

        <Text style={styles.footerText}>
            Não tem uma conta ainda?
            <Text>{' '}</Text> {/* Adiciona um espaço entre os textos*/}
            <Text style={styles.signup} onPress={() => navigation.navigate('SignUp')}>
                Cadastre aqui!
            </Text>
        </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container : {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      paddingTop: 70,
      alignItems: "center",
      justifyContent : "top",
    },
    title : {
      fontSize : 30,
      fontWeight : "bold",
      textAlign: "center",
      paddingVertical : 40,
      color : "red"
    },
    inputView : {
      gap : 15,
      width : "100%",
      paddingHorizontal : 40,
      marginBottom : 5,
      flex: 1
    },
    input : {
      height : 50,
      paddingHorizontal : 20,
      borderColor : "red",
      borderWidth : 1,
      borderRadius: 7
    },
    button : {
      backgroundColor : "red",
      height : 45,
      borderColor : "gray",
      borderWidth  : 1,
      borderRadius : 5,
      alignItems : "center",
      justifyContent : "center"
    },
    buttonText : {
      color : "white"  ,
      fontSize: 18,
      fontWeight : "bold"
    }, 
    buttonView :{
      width :"100%",
      paddingHorizontal : 50
    },
    footerText : {
      height: 100,
      justifyContent : "top",
      textAlign: "center",
      color : "gray",
    },
    signup : {
      color : "red",
      fontSize : 13
    }
  });