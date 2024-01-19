import Order from '../models/Order'

export const createOrder = async (req,res) =>{
    
    const {user, table,plates,client,date,payment_method} = req.body
    try {
        const newOrder = new Order({
            user,
            table,
            plates,
            client,
            payment_method,
            date
        });
        const orderSaved = await newOrder.save()
    
        res.status(201).json(orderSaved); 
    } catch (error) {
        console.log(error)
    }
    
}

export const getOrders =  async (req,res) =>{
    const orders = await Order.find({})
      .populate("user")
      .populate("table")
      .populate("plates")
      .populate("client")
    res.json(orders);
}


export const getOrderById = async (req,res) =>{
    const { orderId } = req.params;

  const order = await Order.findById(orderId)
    .populate("user")
    .populate("table")
    .populate("plates")
    .populate("client")
  res.status(200).json(order);
}


export const updateOrderById = async (req,res) =>{
    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.orderId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedOrder);
}


export const deleteOrderById = async (req,res) =>{
    const { orderId } = req.params;

  await Order.findByIdAndDelete(orderId);

  // code 200 is ok too
  res.status(200).json();
}



export const getOrdersByUserId = async (req, res) => {
  const userId = req.params.userId; // Obtenemos el ID del usuario de los parámetros de la solicitud
  
  try {
    const orders = await Order.find({ user: userId }); // Buscamos todas las órdenes que pertenecen al usuario dado
    
    res.status(200).json(orders); // Respondemos con las órdenes encontradas
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersByClientId = async (req,res) =>{
  const clientId = req.params.clientId; // Obtenemos el ID del usuario de los parámetros de la solicitud
  
  try {
    const orders = await Order.find({ user: clientId }); // Buscamos todas las órdenes que pertenecen al usuario dado
    
    res.status(200).json(orders); // Respondemos con las órdenes encontradas
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
