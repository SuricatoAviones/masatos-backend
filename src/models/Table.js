import mongoose from "mongoose";


const tableSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    number:{
        type: Number,
    },
    disponibility:{
        type: Boolean,
        default: true
    }
});

// Exportar Deporte y el Modelo a la DB
const Table = mongoose.model('Table', tableSchema);
export default Table;