import React from 'react';
import { View, Text } from 'react-native';

const DetalleJugador = ({ route }) => { // es el objeto que envía handlePlayerPress en Jugadores.js
    const { jugador } = route.params; // { route } es el objeto completo y route.params contiene todos los parámetros que fueron pasados cuando se hizo la llamada a navigation.navigate en Jugadores.js

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 18 }}>Detalles del Jugador</Text>
            <Text>Nombre: {jugador.nombre} {jugador.apellido}</Text>
            <Text>Club: {jugador.club}</Text>
            <Text>Categoría: {jugador.categoria}</Text>
            <Text>Edad: {jugador.edad}</Text>
            <Text>Género: {jugador.genero}</Text>
            <Text><Text>Habilitado: </Text><Text style={{ fontWeight: 'bold' }}>{jugador.habilitado === 1 ? "Sí" : "No"}</Text></Text>
            <Text>Email: {jugador.email}</Text>
            <Text>Teléfono: {jugador.telefono}</Text>
            <Text>Dirección: {jugador.direccion}</Text>
            <Text>Obra Social: {jugador.prestador_servicio_emergencia}</Text>
        </View>
    );
};

export default DetalleJugador;
