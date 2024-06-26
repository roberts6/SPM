import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './client/views/Home.js';
import Jugadores from './client/views/Jugadores.js';
import DetalleJugador from './client/views/DetalleJugador.js';
import CrearJugador from './client/views/CrearJugador.js';
import Estadisticas from './client/views/Estadisticas.js';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Agregar Jugador" component={CrearJugador} />
        <Stack.Screen name="Jugadores" component={Jugadores} />
        <Stack.Screen name="Información Jugador" component={DetalleJugador} />
        <Stack.Screen name="Estadísticas" component={Estadisticas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

