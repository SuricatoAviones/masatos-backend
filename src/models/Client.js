import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    cedula:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    }
});

// Exportar Deporte y el Modelo a la DB
const Client = mongoose.model('Client', clientSchema);
export default Client;