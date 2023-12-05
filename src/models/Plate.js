import mongoose from "mongoose";


const plateSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,

    },
    disponibility:{
        type: Boolean,
        default: true,
        required: true,

    }
});

// Exportar Deporte y el Modelo a la DB
const Plate = mongoose.model('Plate', plateSchema);
export default Plate;