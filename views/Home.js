import React from 'react';
import { View, Button } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View>
      <Button title="Jugadores" onPress={() => navigation.navigate('Jugadores')} />
      <Button title="Crear Jugador" onPress={() => navigation.navigate('CrearJugador')} />
    </View>
)}