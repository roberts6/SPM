import React from 'react';
import { View, Text } from 'react-native';

const DetalleJugador = ({ route }) => {
    const { jugador } = route.params;

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 18 }}>Detalles del Jugador</Text>
            <Text>Nombre: {jugador.nombre} {jugador.apellido}</Text>
            <Text>Club: {jugador.club}</Text>
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
