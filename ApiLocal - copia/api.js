//ASIGNACION DEL FRAMEWORK 
//DEPENDENCIA EXPRESS
const express = require('express')
//IMPORTACION DE DEPENDECIA CUSTOM
const user = require('./user.controller')
//EJECUCION DE EXPRESS
const app= express()
//PUERO QUE VA A USAR EXPRESS
const port = 3000
//TOMA TODAS LA PETICIONES EN FORMATO JSON
//LAS TRANSFORMA EN JS Y LAS ASIGNA A BODY 
app.use(express.json())
//va a buscar el metodo 
//CAMBIA LOS ENDPOINTS POR LA PRIMERA /USUARIOS
app.get('/usuarios',user.list)
//PUT 
app.post('/usuarios',user.create)
//PUT
app.put('/usuarios/:id', user.update)
//PATCH
app.patch('/usuarios/:id',user.update)
//DELETE
app.delete('/usuarios/:id',user.destroy)
//GET (UN UNICO ELEMENTO )
app.get('/usuarios/:id',user.get)
//MIDDLEWARE DE EXPRESS
//BUSCA TODOS LOS ARCHIVOS DE UNA CARPETA
app.use(express.static('app'))
//CARGAR PLANTILLA HTML
//FUNCION QUE VA A LA RAIZ 
//GET
app.get('/', (req,res)=>{
    //__dirname
    //MUESTRA EN QUE CARPETA SE ESTA EJECUTANDO api.js
    //ENVIAR UN ARCHIVO HTML
    res.sendFile(`${__dirname}/index.html`)
})
//PAGINAS QUE NO HAN SIDO DEFINIDAS
app.get ('*',user.pageNoDefined)
app.listen(port,() =>{
    console.log('Arrancando aplicacion')
})