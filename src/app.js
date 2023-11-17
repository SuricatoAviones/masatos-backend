import  express from "express";
import morgan from "morgan";
import  dotenv  from 'dotenv';
import conectarDB from "./database";
import tableRoutes from './routes/tables.routes';
const app = express ();

app.use(morgan('dev'));
app.use(express.json())

// Conectar la DB
dotenv.config();
conectarDB();


app.use('/tables',tableRoutes);

export default app;