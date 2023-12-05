import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    table:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
    },
    plates:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plate",
    }],
    date:{
        type: Date,
        required: true,
        default: Date.now(),
    }
});

// Exportar Deporte y el Modelo a la DB
const Order = mongoose.model('Order', orderSchema);
export default Order;