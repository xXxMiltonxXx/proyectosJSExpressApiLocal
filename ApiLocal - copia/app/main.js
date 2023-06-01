//primera funcion
const loadInitialTemplate = () => {
    //constante que se llamara template
    const template = `
    <h1>Usuarios</h1>
    <form id="user-form">
        <div>
            <label>Usuario</label>
            <input name="usuario" />
        </div>
        <div>
            <label>Contrasena</label>
            <input name="contrasena"/>
        </div>
        <button type="submit">Enviar</button>
    </form>
    <ul id="user-list"></ul>
    `
    //en un const se guarda el body 
    //se lo busca por el TagName en l;a posicion 0
    const body = document.getElementsByTagName('body')[0]
    //a este body se le añade la plantilla
    body.innerHTML = template
}
//obtener usuarios 
const getUsers = async () => {
    //peticion fetch al endpoint de user
    const response = await fetch('/usuarios')
    //devuelve un objeto JS las respuestas
    const users = await response.json()
    //creacion de la plantilla de usuarios 
    //recibe como parametro un usario
    const template = user => `
    <li>
        ${user.usuario} ${user.contrasena} <button data-id="${user.id}">Eliminar</button><button data-id="${user.id} Upd">Actualizar</button>
    </li>
    `
    //buscar el listado por el id 
    const userList = document.getElementById('user-list')
    //reemplazar su innerHTML
    //map para iterar los usuarios 
    //join('') transforma en un gran string 
    userList.innerHTML = users.map(user => template(user)).join('')

    //ELIMINAR
    //se usa un foreach por que no va a retornar nada 
    users.forEach(user => {
        //busca el boton con el metodo querySelector
        //propiedad custon [nombrePropiedad="${}"]
        //busca el data id que tenga el id del usuario
        const userNode = document.querySelector(`[data-id="${user.id}"]`)
        //al comportamiento onclick se le cambia el comportamiento
        //para eliminar a los usuarios  
        userNode.onclick = async e => {
            //llamda al endpoint de user
            //envia el id 
            //solo elimina un unico usuario
            await fetch(`/usuarios/${user.id}`, {
                method: 'DELETE',
            })
            //eliminar el elemento de la lista 
            //elimina el elemento li
            userNode.parentNode.remove()
            alert('eliminado con exito')
        }
    })
    //ACTUALIZAR
    //se usa un foreach por que no va a retornar nada 
    users.map(user => {
        //busca el boton con el metodo querySelector
        //propiedad custon [nombrePropiedad="${}"]
        //busca el data id que tenga el id del usuario
        const userNode = document.querySelector(`[data-id="${user.id} Upd"]`)
        //al comportamiento onclick se le cambia el comportamiento
        //para eliminar a los usuarios  
        userNode.onclick = async e => {
            const userForm = document.getElementById('user-form')
            const inpUsuario = document.querySelector('input[name="usuario"]')
            const inpContrasena = document.querySelector('input[name="contrasena"]')
            inpUsuario.value = user.usuario
            inpContrasena.value = user.contrasena
            userForm.onsubmit = async (e) => {
                //se evita que se refresque la plagina
                e.preventDefault()
                const formData = new FormData(userForm)
                const data = Object.fromEntries(formData.entries())
                //llamda al endpoint de user
                //envia el id 
                //solo elimina un unico usuario
                await fetch(`/usuarios/${user.id}`, {
                    method: 'PUT',
                    //se convierte en archivo JSON
                    body: JSON.stringify(data),
                    //se envia una cabecera
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                //el formulario se limpie
                userForm.reset()
                getUsers()
                alert('actualizado con exito')
            }


        }

    })
}

//funcion addFormListener
const addFormListener = () => {
    //referencia del formulario que esta en template
    const userForm = document.getElementById('user-form')
    //se crea la accion que va a ejecutar en el onsubmit
    userForm.onsubmit = async (e) => {
        //se evita que se refresque la plagina
        e.preventDefault()
        //devuelve los datos del formulario
        const formData = new FormData(userForm)
        //un iterador los transforma en un JSON
        const data = Object.fromEntries(formData.entries())
        //toca enviar a la api los datos 
        await fetch('/usuarios', {
            //metodo a usar 
            method: 'POST',
            //se convierte en archivo JSON
            body: JSON.stringify(data),
            //se envia una cabecera
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //el formulario se limpie
        userForm.reset()
        //funcion parwa obtener los usuarios
        getUsers()
    }
}

// ejecutar despues de que cargue toda la pantilla 
window.onload = () => {
    //primera funcion (en template)
    loadInitialTemplate()
    addFormListener()
    getUsers()
}