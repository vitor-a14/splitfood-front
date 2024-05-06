import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import Popup from "../components/PopUp";
import LoadingOverlay from '../components/LoadingOverlay';

//mock
import { useMockData } from "../debug/Mocks";

export default function Login() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        cpf: '',
        password: ''
    });

    //componente que mostra uma animação de carregamento para aguardar os requests HTTP
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //state do pop up que irá informar o usuário se houve sucesso ou erro no cadastro
    const [popupVisible, setPopupVisible] = useState(false); 
    const [popupTitle, setPopupTitle] = useState(""); 
    const [popupMessage, setPopupMessage] = useState("");

    const closePopup = () => {
        setPopupVisible(false); 
    };

    //mock
    const { findUserByCPF } = useMockData();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        /*
        requisição para o backend

        try {
            //comunicação com o backend
            const response = await fetch(`http://localhost:8080/users/${formData.cpf}`);
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor!');
            }

            const userData = await response.json();
            
            // verifica se a senha é a mesma da digitada no forms de login
            if (userData != null && userData.password === formData.password) {
                // dados confirmados com sucesso, redireciona o usuário
                navigation.navigate('Home', { userData: userData });
            } else {
                // senha incorreta
                setPopupTitle("Erro ao fazer login");
                setPopupMessage("CPF ou senha incorretos. Por favor, tente novamente.");
                setPopupVisible(true);
            }
        } catch(error) {
            // Erro na requisição
            console.error("Erro ao buscar usuário: ", error);
            setPopupTitle("Erro ao fazer login");
            setPopupMessage("Parece que os servidores estão fora do ar, tente novamente mais tarde.");
            setPopupVisible(true);
        }

        setLoading(false);
        */

        setTimeout(() => {
            const userData = findUserByCPF(formData.cpf);
            
            // verifica se a senha é a mesma da digitada no forms de login
            console.log(formData.password);
            if (userData != null && userData.password === formData.password) {
                // dados confirmados com sucesso, redireciona o usuário
                navigation.navigate('Home', { userData: userData });
            } else {
                // senha incorreta
                setPopupTitle("Erro ao fazer login");
                setPopupMessage("CPF ou senha incorretos. Por favor, tente novamente.");
                setPopupVisible(true);
            }

            setLoading(false);
        }, 200);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>SplitFood</Text>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder='CPF do usuário'
                    value={formData.cpf}
                    onChangeText={(value) => handleChange('cpf', value)}
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(value) => handleChange('password', value)}
                    autoCorrect={false}
                    autoCapitalize='none'
                />

                <View style={styles.buttonView}>
                    <Pressable style={styles.button} onPress={handleSubmit}>
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
            <Popup visible={popupVisible} onClose={closePopup} title={popupTitle} message={popupMessage} />
            <LoadingOverlay loading={loading} />
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
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: 40,
        color: "red"
    },
    inputView: {
        gap: 15,
        width: "100%",
        paddingHorizontal: 40,
        marginBottom: 5,
        flex: 1
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
        justifyContent: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    buttonView: {
        width: "100%",
        paddingHorizontal: 50
    },
    footerText: {
        height: 100,
        justifyContent: "top",
        textAlign: "center",
        color: "gray",
    },
    signup: {
        color: "red",
        fontSize: 13
    }
});
