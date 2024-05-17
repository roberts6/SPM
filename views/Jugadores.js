import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { FetchData } from '../components/fetch.js';

const Jugadores = () => {
    const [jugadores, setJugadores] = useState([]);

    useEffect(() => {
        const fetchDataFromServer = async () => {
            FetchData(setJugadores);
        };

        fetchDataFromServer();
    }, []);

    return (
        <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>Lista de Jugadores</Text>
            <FlatList
                data={jugadores}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', padding: 10 }}>
                        <Text>Club: {item.club}</Text>
                        <Text style={{ fontSize: 16, color: 'black' }}>{item.nombre} - {item.apellido}</Text>
                        <Text>Edad: {item.edad}</Text>
                        <Text>Género: {item.genero}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default Jugadores;

