import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import React ,{ Dimensions, ImageBackground, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function Opening() {
    const navigation = useNavigation();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Login');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            <ImageBackground style={styles.backgroundImage} source={require('../../assets/opening_background.png')}>
                <Animatable.Image animation="flipInY" source={require('../../assets/splitfood_logo.png')} style={styles.openingLogo} />
            </ImageBackground>
        </SafeAreaView>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        height: height * 1,
        width: width * 1,
    },

    openingLogo: {
        width: width * 0.80,
        marginTop: height * 0.20,
        resizeMode: 'contain',
        alignSelf: 'center',
    }
})