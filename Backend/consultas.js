const format = require('pg-format');
const { Pool } = require("pg");


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "joyas",
    port: 5432,
    allowExitOnIdle: true
});


// Función para Obtener Joyas
const obtenerJoyas = async ({ limits = 10, order_by = "id_ASC",
page = 1}) => {
const [campo, direccion] = order_by.split("_")
const offset = (page - 1) * limits
const formattedQuery = format('SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s', campo, direccion, limits, offset);
pool.query(formattedQuery);
const { rows: joyas } = await pool.query(formattedQuery)
return joyas
}

const obtenerJoyasPorFiltros = async ({ precio_min, precio_max, categoria, metal }) => {
    let filtros = []
    if (precio_min) filtros.push(`precio >= ${precio_min}`)
    if (precio_max) filtros.push(`precio <= ${precio_max}`)
    if (categoria) filtros.push(`categoria ILIKE '%${categoria}%'`)
    if (metal) filtros.push(`metal ILIKE '%${metal}%'`)
    let consulta = "SELECT * FROM inventario"
    if (filtros.length > 0) {
    filtros = filtros.join(" AND ")
    consulta += ` WHERE ${filtros}`
    }
    const { rows: joyas } = await pool.query(consulta)
    return joyas
    }



    // Exportamos las funciones
module.exports = {
obtenerJoyas,
obtenerJoyasPorFiltros

}