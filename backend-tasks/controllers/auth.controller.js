const usuarios = [
    { id: 1, username: 'clarisa', password: '123' },
    { id: 2, username: 'rama', password: '123' }
]

const login = (req, res)=>{
    const username = req.body.username
    const password = req.body.password
    const usuarioEncontrado = usuarios.find((usuario)=>{
       return usuario.username === username && usuario.password === password
    })
    if(!usuarioEncontrado){
        res.status(401).json({message: "Usuario o contraseña incorrecto."}).end()
        return;
    }
    req.session.regenerate((error)=>{
        if(error){
            res.status(500).json({message: "Hubo un error al iniciar sesion"})
        }
        req.session.user = usuarioEncontrado.username
        req.session.userId = usuarioEncontrado.id
        req.session.save(()=>{
            res.status(200).json({
                id: usuarioEncontrado.id,
                username: usuarioEncontrado.username
            }).end()
        })
    })
}

// Endpoint para verificar si el usuario está autenticado
const isAuthenticated = (req, res) => {
    if (req.session.userId) {
      return res.status(200).json({ authenticated: true });
    }
    return res.status(200).json({ authenticated: false });
}

// authController.js
const logout = (req, res) => {
    console.log("Intentando cerrar sesión para el usuario:", req.session.userId);  
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({ message: "Error al cerrar sesión." }).end();
        }
        console.log("Sesión cerrada correctamente.");
        res.clearCookie('connect.sid');  // Elimina la cookie de sesión
        res.status(200).end();  // Responde con un 200 OK
    });
}


module.exports = {
    login,
    logout,
    isAuthenticated
}
