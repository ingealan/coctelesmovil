import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        if (username === 'Alan' && password === '12345') {
            navigation.navigate('Carga');
        } else {
            alert('Credenciales Incorrectas. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                <View style={styles.header}>
                    <Text style={styles.titulo}>Sistema ITQ</Text>
                    <Text style={styles.subtitulo}>Aplicaciones Móviles</Text>
                </View>

                <View style={styles.imagenContainer}>
                    <Image
                        source={{ uri: 'https://itq.edu.ec/wp-content/uploads/2023/02/Recurso-26.png' }}
                        style={styles.imagen}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.seccion}>
                    <Text style={styles.seccionTitulo}>Ingreso de Datos</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nombre:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ejemplo: alan123"
                            placeholderTextColor="#999"
                            onChangeText={setUsername}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Contraseña:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ejemplo: password123"
                            placeholderTextColor="#999"
                            onChangeText={setPassword}
                        />
                    </View>
                </View>

                <View style={styles.seccion}>
                    <TouchableOpacity style={[styles.boton, styles.botonPrimario]}>
                        <Text style={styles.botonTexto} onPress={{ handleLogin }}>Acceder</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ height: 30 }} />

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
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#bbb',
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#333',
        fontSize: 16,
        color: '#fff',
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
    botonPrimario: {
        backgroundColor: '#2196f3',
    },
    botonSecundario: {
        backgroundColor: '#4caf50',
    },
    botonTerciario: {
        backgroundColor: '#ff9800',
    },
    botonRomanos: {
        backgroundColor: '#9c27b0',
    },
    botonComprimir: {
        backgroundColor: '#00bcd4',
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#2a2a2a',
        width: '90%',
        maxHeight: '75%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    modalHeader: {
        backgroundColor: '#2196f3',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalTitulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    modalScroll: {
        maxHeight: 400,
        padding: 20,
    },
    resultadoItem: {
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#4caf50',
    },
    modalTexto: {
        fontSize: 16,
        color: '#fff',
    },
    modalBoton: {
        backgroundColor: '#f44336',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        margin: 20,
        alignSelf: 'center',
        shadowColor: '#f44336',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 6,
    },
    modalBotonTexto: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});