-- busca hombres y mujeres de una categoría en X club
SELECT
    'Total mayores' AS Categoria,
    COUNT(*) AS Total
FROM
    jugador
WHERE
    club = "Terralagos"
    AND categoria = 'mayor'
UNION ALL
SELECT
    'Masculinos' AS Categoria,
    COUNT(*) AS Total
FROM
    jugador
WHERE
    club = "Terralagos"
    AND categoria = 'mayor'
    AND habilitado = 1
    AND genero = 'Masculino'
UNION ALL
SELECT
    'Femeninos' AS Categoria,
    COUNT(*) AS Total
FROM
    jugador
WHERE
    club = "Terralagos"
    AND categoria = 'mayor'
    AND habilitado = 1
    AND genero = 'Femenino';


select * from jugador
where club like "%independiente%" and categoria = "cadete" and genero = "femenino" and habilitado = 1;