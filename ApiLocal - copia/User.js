const UserModule = (function () {
    //array que contiene los objetos usuarios
    const usuarios = [];

    //metodo para guardar 
    function agregarUsuario(usuario, contrasena) {
        //esta variable guarda el tamaño del array
        //que sera usado como id 
        let id = usuarios.length+1
        //objetos que se encientran dentro del array 
        const bdUsuarios = {
            //propiedades del objeto 
            id: id.toString(),
            usuario: usuario,
            contrasena: contrasena,
        }
        //guarda los datos 
        usuarios.push({ ...bdUsuarios });
        //muestra el dato guardado en es momento 
        let a = usuarios.length - 1
        //los muestra en consola
        const objUs=usuarios[a]
        return objUs.id
    }
    //funcion de buscar en el array por el usuario y contraseña
    function buscarUsuario(usuario, contrasena) {
        return usuarios.find(function (bdUsuarios) {
            return bdUsuarios.usuario === usuario && bdUsuarios.contrasena === contrasena;
        });
    }
    //buscar por id
    //buscar en el array, en el objeto la propiedad id
    //el id del objeto el id del parametro deben coincidir
    //devuelve el objeto 
    function buscarUsuarioId(id) {
        return usuarios.find(function (bdUsuarios) {
            return bdUsuarios.id === id;
        });
    }

    //enviar id
    //esta funcion busca el el usuario y contraseña que coincidan 
    // si los encuentra devuelve el indice de donde esta el objeto
    function enviarId(usuario, contrasena) {
        return userIndex = usuarios.findIndex(function (bdUsuarios) {
            return bdUsuarios.usuario === usuario && bdUsuarios.contrasena === contrasena;
        });
    };
    //buscarTodos
    //devuelve todos lo elementos del arreglo 
    function getAllUsers() {
        return usuarios
    }
    //actualizar por id
    //busca el usuario por el id 
    //luego si lo encuentra entonces 
    //cambia las propiedades de usuario y constrasena
    //por nuevo Usuario y nuevaContrasena 
    function updateUserId(id,nuevoUsuario, nuevaContrasena) {
        var user = usuarios.find(function (bdUsuarios) {
            return bdUsuarios.id === id;
        });

        if (user) {
            user.usuario = nuevoUsuario;
            user.contrasena = nuevaContrasena;
            return true;
        }

        return false;
    }
    //actualizar
    //esta funcion busca por el usuario y la contraseña en los objeto del array
    //si los encuentra entonces reeempla la contraseña
    //por la nuevaContrsena 
    function updateUser(usuario, nuevaContrasena) {
        var user = usuarios.find(function (bdUsuarios) {
            return bdUsuarios.usuario === usuario;
        });

        if (user) {
            user.contrasena = nuevaContrasena;
            return true;
        }

        return false;
    }
    //eliminar por id
    //busca el usuario en el arreglo 
    //si encuentra el id en el arreglo entonces
    //borra el objeto que se encuentra en ese indice de arreglo
    function deleteUserId(id) {
        var user = usuarios.find(function (bdUsuarios) {
            return bdUsuarios.id === id;
        });

        if (user) {
            usuarios.splice(id-1, 1);
            return true;
        }

        return false;
    }

    //eliminar
    //busca el usuario por la propiedad de usuario
    //si lo encuentra en el arreglo entonces devuelve el indice
    //entonces se realiza la eliminacion del elemento
    function deleteUser(usuario) {
        var userIndex = usuarios.findIndex(function (bdUsuarios) {
            return bdUsuarios.usuario === usuario;
        });

        if (userIndex !== -1) {
            usuarios.splice(userIndex, 1);
            return true;
        }

        return false;
    }

    //retorna los metodos públicos 
    return {
        agregarUsuario: agregarUsuario,
        enviarId: enviarId,
        buscarUsuarioId:buscarUsuarioId,
        buscarUsuario: buscarUsuario,
        buscarTodosUsuarios: getAllUsers,
        updateUserId:updateUserId,
        actualizarUsuario: updateUser,
        deleteUserId:deleteUserId,
        eliminarUsuario: deleteUser
    };

})();
//se exporta el modulo 
module.exports = UserModule;