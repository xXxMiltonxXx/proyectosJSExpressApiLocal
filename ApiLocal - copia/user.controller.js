//importar modelo 
const Users = require('./User')

const User = {
    //los metodos que tendra para el usuario 
    list: async (req, res) => {
        //
        const usuarios = await Users.buscarTodosUsuarios()
        //ENVIA ESTADO OK 
        //ENVIA CHANCHITO FELIZ
        res.status(200).send(usuarios)
    },
    create: async (req, res) => {
        //
        // console.log(req.body)
        const user = await Users.agregarUsuario(req.body.usuario, req.body.contrasena)
        //ENVIA EL ESTADO OK, CREADO
        //ENVIA CREANDO CANCHITOF
        res.status(201).send(user)
    },
    update: async (req, res) => {
        //se trae el id de req.params
        const { id } = req.params
        //
        const user = await Users.updateUserId(id, req.body.usuario, req.body.contrasena)
        //tiene una ruta variable 
        //setea el status 
        //envia ok y no content
        res.sendStatus(204)
    },
    destroy: async (req, res) => {
        //se trae el id De req.params
        const { id } = req.params
        //
        const user = await Users.deleteUserId(id)
        //tiene una ruta variable 
        //setea el status 
        //envia ok y no content
        res.sendStatus(204)
    },
    get: async (req, res) => {
        //trae el id de req.params
        const { id } = req.params
        //lo busca con el emtodo que fue definido en User
        //si lo encuentra lo guarda en la constante user
        const user = await Users.buscarUsuarioId(id)
        //envia el estatus de correcto y el usuario
        res.status(200).send(user)
    },
    pageNoDefined: (req, res) => {
        //toma motas las peticiones get
        //que no han sido definidas 
        //y devuelve un error custom
        res.status(404).send('esta pagina no existe')
    }


}

module.exports = User