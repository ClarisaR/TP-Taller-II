const express = require("express")
const session = require("express-session");
const authRouter = require("./routes/auth.routes");
const tasksRouter = require("./routes/tasks.routes")
const { auth } = require("./middlewares/auth.middleware");
const cors = require('cors')

// DataBase
const sequelize = require("./domain/public/database/db");
// Entidades
const { Users, Tasks } = require("./domain/entities")

const app = express()

//Middleware para activar CORS
app.use(cors({
  credentials: true,
  origin: 'http://localhost:4200'
}))

// Middleware para procesar JSON
app.use(express.json());


// Configuracion de sessiones
app.use(session({
    resave: false,
    saveUninitialized: false, 
    secret: 'shhhh, very secret'
}));

// Sincronizacion base de datos

sequelize.sync({force: false});


app.use("/auth", authRouter)
app.use("/tasks", auth, tasksRouter)

app.listen(3000, ()=>{console.log("Server running")})



