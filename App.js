import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './views/Home.js';
import Jugadores from './views/Jugadores.js';
import DetalleJugador from './views/DetalleJugador.js';
import CrearJugador from './views/CrearJugador.js';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Agregar Jugador" component={CrearJugador} />
        <Stack.Screen name="Jugadores" component={Jugadores} />
        <Stack.Screen name="DetalleJugador" component={DetalleJugador} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

