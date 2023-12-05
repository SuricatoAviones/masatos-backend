import  express from "express";
import morgan from "morgan";
import  dotenv  from 'dotenv';
import conectarDB from "./database";
import pkg from "../package.json"

import tableRoutes from './routes/tables.routes.js';
import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import platesRoutes from "./routes/plates.route.js";

const app = express ();
app.set('pkg',pkg);

app.use(morgan('dev'));
app.use(express.json())

app.get('/', (req,res)=>{
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

// Conectar la DB
dotenv.config();
conectarDB();

// Rutas de Usuario y Auth
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// Rutas
app.use('/api/tables',tableRoutes);
app.use('/api/orders',ordersRoutes);
app.use('/api/plates',platesRoutes);

export default app;