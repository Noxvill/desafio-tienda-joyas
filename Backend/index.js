const express = require('express')
const app = express()
const HandleDatabaseLogs = require('./logMiddleware')
app.listen(3000, console.log('Server ON'))


// importamos la función de consultas
const { obtenerJoyas, obtenerJoyasPorFiltros } = require('./consultas')

// Función para ordenar datos con HATEOAS
const ordenarDatos = (data) => {
  
// sub función de sumar stock
const stockTotal = data.reduce((stock, joya) =>{

  // console.log(stock, medicamento)
  return stock += joya.stock

},0)

// Sub función para calcular total de joyas.
const totalJoyas = data.length
const results=data.map(joya => ({
nombre: joya.nombre,
link: `/api/joya/${joya.id}`}))

// devolvemos la info de medicamentos
return {totalJoyas, stockTotal, results }}

// Consulta para obtener joyas con limits
app.get('/joyas',HandleDatabaseLogs, async (req, res) => {

  try {
const {limits, order_by, page} = req.query
const joyas = await obtenerJoyas({limits, order_by, page})
// invocar función HATEOAS
const joyasHateoas=ordenarDatos(joyas)
res.json(joyasHateoas)

} catch (error) {
  console.error("Error obteniendo joyas:", error);
  res.status(500).json({ error: "Error obteniendo joyas" });
}
})

app.get('/joyas/filtros', HandleDatabaseLogs, async (req, res) => {

  try {
  const queryStrings = req.query
  const joyas = await obtenerJoyasPorFiltros(queryStrings)
  res.json(joyas)

} catch (error) {
  console.error("Error obteniendo joyas con filtros:", error);
  res.status(500).json({ error: "Error obteniendo joyas con filtros" });
}
  })