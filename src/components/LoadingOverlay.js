import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

//esse componente é uma sobreposição com uma animação de carregamento
//pode ser chamada enquanto o usuario aguarda alguma resposta de um endpoint
//existem exemplos de como usá-la nas telas de login e cadastro

const LoadingOverlay = ({ loading }) => {
    return (
        loading && (
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#ff0000" />
            </View>
        )
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingOverlay;
