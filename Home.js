import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Modal,
    ActivityIndicator,
    Alert,
    Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Home() {

    const [cocteles, setCocteles] = cocteles.useState([]);
    const [refreshing, setRefreshing] = refreshing.useState(false)
    const [loading, setLoading] = loading.useState(false);

    const cargarAPI = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
            const data = await res.json();
            setCocteles(data.results);
        } catch (error) {
            Alert.alert('Error', 'No se cargó');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarAPI();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                <View style={styles.header}>
                    <Text style={styles.titulo}>Sistema Cocteles</Text>
                </View>

                <View style={styles.imagenContainer}>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmn191KPqCC5LdgEusc4O67PyiFGO5pFb45Q&s' }}
                        style={styles.imagen}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.seccion}>
                    <TouchableOpacity style={[styles.boton, styles.botonAPI]}>
                        <Text style={styles.botonTexto} onPress={cargarAPI}>Cargar desde API</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.seccion}>
                    <Text style={styles.seccionTitulo}>Resultados</Text>
                    <View style={styles.itemCard} source={map=cocteles} >
                        <Text style={styles.itemTitulo} >{cocteles.strDrink}</Text>
                        <Text style={styles.itemDescripcion}>{cocteles.strCategory}</Text>
                    </View>
                </View>

                <View/>

            </ScrollView>

        </SafeAreaView>
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
    subtitulo: {
        fontSize: 16,
        color: '#e3f2fd',
        textAlign: 'center',
    },
    imagenContainer: {
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    imagen: {
        width: '100%',
        height: 120,
        borderRadius: 15,
        backgroundColor: '#fff',
        padding: 10,
    },
    seccion: {
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: 'rgba(42, 42, 42, 0.9)',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    seccionTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#2196f3',
        paddingBottom: 8,
    },
    boton: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    botonAPI: {
        backgroundColor: '#e91e63',
    },
    botonTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    botonesAcciones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    botonAccion: {
        flex: 1,
        backgroundColor: '#673ab7',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    botonLimpiar: {
        backgroundColor: '#f44336',
    },
    botonAccionTexto: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    itemCard: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#2196f3',
    },
    itemTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    itemDescripcion: {
        fontSize: 14,
        color: '#bbb',
        lineHeight: 20,
    },
    componenteInfo: {
        marginHorizontal: 20,
        backgroundColor: '#1565c0',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
    },
    componenteTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    componenteTexto: {
        fontSize: 16,
        color: '#e3f2fd',
    },
});