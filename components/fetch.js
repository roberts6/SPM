export const FetchData = async (setJugadores) => {
    try {
        const response = await fetch('http://localhost:8083/jugadores/full'); 
        console.log('Response:', response);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('datos del fetch con todos los jugadores:', data);
        setJugadores(data);
    } catch (error) {
        console.error('FetchData Error:', error);
    }
};



