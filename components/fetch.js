export const FetchData = async (setJugadores) => {
    try {
        const response = await fetch(`https://192.168.86.28:8081/jugadores/full`);
        if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos');
        }
        const data = await response.json();
        
        setJugadores(data);
    } catch (error) {
        console.error(error);
    }
};

