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
        _id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plate",
        },
        quantity:{
            type: Number,
        }
        }],
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
    date:{
        type: Date,
        required: true,
        default: Date.now(),
    },
    payment_method:{
        type: String,
    }
});

// Exportar Deporte y el Modelo a la DB
const Order = mongoose.model('Order', orderSchema);
export default Order;