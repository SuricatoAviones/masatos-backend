import  express from "express";
import morgan from "morgan";
import  dotenv  from 'dotenv';
import conectarDB from "./database";
import pkg from "../package.json"
import cors from "cors";
import tableRoutes from './routes/tables.routes.js';
import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import platesRoutes from "./routes/plates.route.js";
import clientsRoutes from "./routes/client.route.js";
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

// Habilitar Cors
const opcionesCors = {
    origin: [process.env.FRONTEND_URL,process.env.EMULATOR_URL]
}
app.use( cors(opcionesCors) );

// Rutas de Usuario y Auth
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// Rutas
app.use('/api/tables',tableRoutes);
app.use('/api/orders',ordersRoutes);
app.use('/api/plates',platesRoutes);
app.use('/api/clients',clientsRoutes);

export default app;