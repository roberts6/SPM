import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    borderBottomWidth: 200, // Cambia esto según la altura del degradado que desees
    borderBottomColor: 'rgba(28, 28, 28, 0.4)', // Cambia los valores de color y opacidad según sea necesario
    borderTopWidth: 200, // Cambia esto según la altura del degradado que desees
    borderTopColor: 'rgba(66, 134, 244, 0.4)', // Cambia los valores de color y opacidad según sea necesario
  },
});

export default GradientBackground;