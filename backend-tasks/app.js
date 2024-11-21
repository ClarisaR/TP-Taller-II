const express = require("express")
const session = require("express-session");
const authRouter = require("./routes/auth.routes");
const tasksRouter = require("./routes/tasks.routes")
const { auth } = require("./middlewares/auth.middleware");
const cors = require('cors')

const sequelize = require("./domain/public/database/db");
const { Users, Tasks } = require("./domain/entities");

const app = express();


app.use(cors({
  credentials: true,
  origin: 'http://localhost:4200'
}))

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: false, 
    secret: 'shhhh, very secret'
}));

sequelize.sync({force: false});

app.use("/auth", authRouter);

app.use("/tasks", auth, tasksRouter);

app.listen(3000, ()=>{console.log("Server running")});



