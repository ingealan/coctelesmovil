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
    Animated,
    Alert,
    Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default function Home() {

    const [cocteles, setCocteles] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        (async () => {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            const mediaPermission = await MediaLibrary.requestPermissionsAsync();
            const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (
                cameraPermission.status !== 'granted' ||
                mediaPermission.status !== 'granted' ||
                libraryPermission.status !== 'granted'
            ) {
                Alert.alert('Permisos requeridos', 'Se necesitan permisos para usar la cámara y guardar fotos.');
            }
        })();
    }, []);

    const fetchCocteles = async () => {
        try {
            const response = await fetch(
                'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
            );
            const data = await response.json();
            setCocteles(data.results);
        } catch (error) {
            alert('Error', 'No se pudo cargar los cocteles');
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchCocteles();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await fetchCocteles();
        } catch (error) {
            Alert.alert('Error', 'No se pudo recargar');
        } finally {
            setRefreshing(false);
        }
    };

    const renderCocteles = ({ item }) => (
        <View style={styles.coctelesCard}>
            <Text style={styles.coctelesTitle}>{item.strDrink}</Text>
            <Text style={styles.coctelesTitle}>{item.strCategory}</Text>
        </View>
    );

    // Abrir galería
    const openImagePickerAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };
    // Tomar foto y guardar en galería
    const openCameraAsync = async () => {
        const result = await ImagePicker.launchCameraAsync({
            quality: 1,
            saveToPhotos: true,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            if (Platform.OS !== 'web') {
                await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);
            }
            Alert.alert('¡Foto guardada!', 'La foto se ha guardado en tu galería.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                <View style={styles.header}>
                    <Text style={styles.titulo}>Sistema Cocteles</Text>
                </View>

                <Animated.Image
                    source={selectedImage ? { uri: selectedImage } : { uri: 'https://picsum.photos/200/200' }}
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: 10,
                        transform: selectedImage ? [{ rotate: animatedRotation }] : [],
                        marginBottom: 20,
                    }}
                />
                <View style={styles.imagenContainer}>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmn191KPqCC5LdgEusc4O67PyiFGO5pFb45Q&s' }}
                        style={styles.imagen}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.seccion}>
                    <TouchableOpacity style={[styles.button, styles.botonAPI]} onPress={openImagePickerAsync}>
                        <Text style={styles.buttonText}>Abrir Galería</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.botonAPI]} onPress={openCameraAsync}>
                        <Text style={styles.buttonText}>Tomar Foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.boton, styles.botonAPI]}>
                        <Text style={styles.botonTexto} onPress={cargarAPI}>Cargar desde API</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.seccion}>
                    <FlatList
                        data={cocteles}
                        renderItem={renderCocteles}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                </View>
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
    listContent: {
        padding: 15,
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