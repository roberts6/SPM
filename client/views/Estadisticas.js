import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

function Estadisticas({ jugador }) {
    const [accion, setAccion] = useState({
        Nueve: 0,
        NueveArquero: 0,
        NueveAfuera: 0,
        Seis: 0,
        SeisArquero: 0,
        SeisAfuera: 0,
        penal: 0,
        penalAfuera: 0,
        penalArquero: 0,
        pases: 0,
        paseErrado: 0,
        perdidas: 0,
        recuperaciones: 0,
        faltas: 0,
        amarilla: 0,
        dosMinutos: 0,
        roja: 0,
    });

    const [lanzamientosTotales, setLanzamientosTotales] = useState(0);
    const [porcentajeLanzamientos, setPorcentajeLanzamientos] = useState(0);
    const [penales, setPenales] = useState(0);
    const [porcentajePenal, setPorcentajePenal] = useState(0);
    const [porcentajePases, setPorcentajePases] = useState(0);
    const [recuperacion, setRecuperacion] = useState(0);

    useEffect(() => {
        const totalLanzamientos = accion.Nueve + accion.Seis + accion.NueveAfuera + accion.NueveArquero + accion.SeisAfuera + accion.SeisArquero; 
        setLanzamientosTotales(totalLanzamientos);

        const totalPenales = accion.penal + accion.penalArquero + accion.penalAfuera;
        setPenales(totalPenales);

        setRecuperacion(accion.recuperaciones);
        
        setPorcentajeLanzamientos(totalLanzamientos > 0 ? ((accion.Nueve + accion.Seis) / totalLanzamientos * 100).toFixed(2) : 0); 

        const penalesLanzados = accion.penal + accion.penalAfuera + accion.penalArquero;
        setPorcentajePenal(penalesLanzados > 0 
            ? ((accion.penal / penalesLanzados) * 100).toFixed(2) : 0);

        setPorcentajePases(accion.pases > 0 
            ? ((accion.pases / (accion.paseErrado + accion.pases)) * 100).toFixed(2) 
            : 0);
    }, [accion]);

    const handleSuma = (key) => {
        setAccion((prevState) => {
            if (prevState.roja === 1) {
                return prevState; // No permitir ninguna acción si 'roja' es igual a 1
            }
            
            if (key === 'dosMinutos' && prevState[key] >= 3) {
                return prevState;
            }
            
            // No permitir que 'roja' exceda 1
            if (key === 'roja' && prevState[key] === 1) {
                return prevState;
            }

            // No permitir que 'amarilla' exceda 1
            if (key === 'amarilla' && prevState[key] === 1) {
                return prevState;
            }

            let nuevosValores = { ...prevState, [key]: prevState[key] + 1 };

            // Actualiza pases y perdidas si la acción es paseErrado
            if (key === 'paseErrado') {
                nuevosValores.pases = prevState.pases + 1;
                nuevosValores.perdidas = prevState.perdidas + 1;
            }

            // Verifica si se alcanza el límite de dos minutos y actualiza a roja al llegar a 3
            if (key === 'dosMinutos' && nuevosValores.dosMinutos === 3) {
                nuevosValores.roja = 1;
            }

            return nuevosValores;
        });
    };
    
    const handleResta = (key) => {
        setAccion((prevState) => {
            let nuevosValores = { ...prevState, [key]: prevState[key] > 0 ? prevState[key] - 1 : 0 };

            // Actualiza pases y perdidas si la acción es paseErrado
            if (key === 'paseErrado') {
                nuevosValores.pases = prevState.pases > 0 ? prevState.pases - 1 : 0; 
                nuevosValores.perdidas = prevState.perdidas > 0 ? prevState.perdidas - 1 : 0;
            }

            if (key === 'dosMinutos' && prevState[key] >= 3) {
                    nuevosValores.roja = prevState.pases > 0 ? prevState.pases - 1 : 0;
                }

            return nuevosValores;
        });
    };

    const nameMap = {
        Nueve: 'Nueve',
        NueveArquero: 'Nueve Arquero',
        NueveAfuera: 'Nueve Afuera',
        Seis: 'Seis',
        SeisArquero: 'Seis Arquero',
        SeisAfuera: 'Seis Afuera',
        penal: 'Penal',
        penalAfuera: 'Penal Afuera',
        penalArquero: 'Penal Arquero',
        pases: 'Pases',
        paseErrado: 'Pase Errado',
        perdidas: 'Pérdidas',
        recuperaciones: 'Recuperaciones',
        faltas: 'Faltas',
        amarilla: 'Amarilla',
        dosMinutos: 'Dos Minutos',
        roja: 'Roja'
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Estadísticas 📈 {jugador && jugador.nombre}</Text>
                <View style={styles.resumen}>
                    <View style={styles.statRow}>
                        <Text style={styles.statText}>Lanzamientos: {lanzamientosTotales} - Gol: ({porcentajeLanzamientos}%)</Text>
                    </View>
                    <View style={styles.statRow}>
                        <Text style={styles.statText}>Penales: {penales} - Gol: ({porcentajePenal}%)</Text>
                    </View>
                    <View style={styles.statRow}>
                        <Text style={styles.statText}>Pases: {accion.pases} - Correctos: ({porcentajePases}%)</Text>
                    </View>
                </View>
                
                {Object.keys(accion).map((key) => (
                    <View 
                        style={(key === 'dosMinutos' || key === 'amarilla' || key === 'roja' || key === 'faltas') 
                            ? styles.backGroundSanciones 
                            : (key.includes('Nueve') || key === 'NueveAfuera' || key === 'NueveArquero') ? styles.backGroundNueve :
                              (key.includes('Seis') || key === 'SeisAfuera' || key === 'SeisArquero') ? styles.backGroundSeis : (key === 'penal' || key === 'penalAfuera' || key === 'penalArquero') 
                            ? styles.backGroundPenal 
                            : (key === 'perdidas' || key === 'recuperaciones') 
                            ? styles.backGroundErrores 
                            : styles.backGroundPases} 
                        key={key}>
                        <View style={styles.statRow}>
                            <View style={styles.buttonContainer}>
                                <Button title="➖" onPress={() => handleResta(key)} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.statText}>{nameMap[key]}: {accion[key]}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button 
                                    title={(key === "roja") ? "🟥" 
                                        : (key === "amarilla" ? "🟨" 
                                        : (key === "dosMinutos") ? '✌️' :
                                        (key === "faltas") ? '👊' 
                                        : (key === 'SeisArquero' || 
                                        key === 'SeisAfuera' 
                                        || key === 'NueveArquero' 
                                        || key === 'NueveAfuera' 
                                        || key === 'penalArquero' 
                                        || key === 'penalAfuera' 
                                        || key === 'paseErrado' 
                                        || key === 'perdidas') ? '🚫' 
                                        : '⚽️')} 
                                    onPress={() => handleSuma(key)} />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding:10,
        alignContent: 'center'
    },
    statText: {
        flex: 1,
        fontSize: 15,
        textAlign: 'center',
    },
    textContainer:{
        marginHorizontal: 3,
        padding:5
    },
    buttonContainer: {
        width: 40,
    },
    resumen:{
        color: 'black', 
        backgroundColor: '#D5DBDB',
        padding: 10,
        width:'95%',
        marginBottom:15,
    },
    backGroundSanciones:{
        backgroundColor: '#D2B4DE',
        width: '95%',
        alignItems: 'center',
    },
    backGroundNueve:{
        backgroundColor: '#D5F5E3',
        width: '95%',
        alignItems: 'center',
    },
    backGroundSeis:{
        backgroundColor: '#A9DFBF',
        width: '95%',
        alignItems: 'center',
    },
    backGroundPenal:{
        backgroundColor: '#17A589',
        width: '95%',
        alignItems: 'center',
    },
    backGroundPases:{
        backgroundColor: '#2E86C1',
        width: '95%',
        alignItems: 'center',
    },
    backGroundErrores:{
        backgroundColor: '#A9CCE3',
        width: '95%',
        alignItems: 'center',
    },
    section: {
        marginTop: 20,
        marginBottom: 10,
        width: '95%',
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 5,
        textAlign: 'center',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

export default Estadisticas;
