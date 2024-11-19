const userService = require("../services/authService");

const login = async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const usuarioEncontrado = await userService.getUser(username, password);

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


const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Nombre de usuario y contraseña son obligatorios' });
        }

        const newUser = await userService.createUser({ username, password });

        res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al crear un usuario' });
    }
}


module.exports = {
    login,
    logout,
    isAuthenticated,
    register
}
