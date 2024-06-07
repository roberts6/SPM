export const FetchData = async (setJugadores) => {
    try {
        const response = await fetch('http://192.168.86.29:8083/jugadores/full'); 
        console.log('Response:', response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('datos del fetch con todos los jugadores:', data);
        setJugadores(data);
    } catch (error) {
        console.error('FetchData Error:', error);
    }
};



