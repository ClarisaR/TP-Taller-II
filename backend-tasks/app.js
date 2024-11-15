const express = require("express")
const session = require("express-session");
const authRouter = require("./routes/auth.routes");
const tasksRouter = require("./routes/tasks.routes")
const { auth } = require("./middlewares/auth.middleware");
const cors = require('cors')

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


app.use("/auth", authRouter)
app.use("/tasks", auth, tasksRouter)

app.listen(3000, ()=>{console.log("Server running")})



