-- esta CTE (Common Table Expression) asigna la cantidad de equipos de 14 o >= a 5 que puede armar un club por categoría y género

WITH TotalPlayers AS (
    SELECT
        club,
        categoria,
        genero,
        COUNT(*) AS total_jugadores
    FROM 
        jugador
    WHERE
        habilitado = 1
    GROUP BY 
        club, 
        categoria, 
        genero
)

SELECT
    club,
    categoria,
    genero,
    total_jugadores,
    FLOOR(total_jugadores / 14) AS equipos_de_14,
    CASE
        WHEN total_jugadores % 14 >= 5 THEN 1
        ELSE 0
    END AS equipo_extra,
    GREATEST(total_jugadores - (FLOOR(total_jugadores / 14) * 14 + CASE WHEN total_jugadores % 14 >= 5 THEN 14 ELSE 0 END), 0) AS jugadores_sin_equipo
FROM TotalPlayers
WHERE total_jugadores >= 5
ORDER BY club, FIELD(categoria, 'mini', 'infantil', 'menor', 'cadete', 'juvenil', 'junior', 'mayor'), genero;
