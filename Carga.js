import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Carga() {

    const [progress, setProgress] = progress.useState[0];

    useEffect(() => {
        setInterval(() => {
            for (let i = 0; i = 1; i = i + 0.1)
                progress = setProgress(i)
        }, 2000);
        return () => Navigator.navigation('./Home');
    }, []);

    return (
        <ImageBackground style={styles.imagenback}
            source={{ uri: 'https://hosteleriauno.es/blog/wp-content/uploads/2022/06/mejores-cocteles-verano-1024x683.jpg' }}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar style="light" />

                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                    <View style={styles.header}>
                        <Text style={styles.titulo}>Cargando aplicación</Text>
                        <ActivityIndicator source={progress}></ActivityIndicator>
                    </View>

                </ScrollView>

            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#2196f3',
        padding: 25,
        paddingTop: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
    },
    imagenback: {
        width: '100%',
        height: 120,
        borderRadius: 15,
        backgroundColor: '#fff',
        padding: 10,
    },


});