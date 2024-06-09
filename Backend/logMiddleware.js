const HandleDatabaseLogs = (req, res, next) =>{

    const time = new Date()
    const url= req.url
    const queries = req.query
    const params = req.params

    console.log(

    `Hola, el día ${time}, se ejecutó una consulta al servidor.\n
    Los datos son: \n
    URL: ${url}\n
    Queries: ${Object.entries(queries)}\n
    Params: ${Object.entries(params)}\n   
    `
    )

    next();
}

module.exports = HandleDatabaseLogs