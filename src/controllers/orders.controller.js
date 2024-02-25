import Order from '../models/Order'

export const createOrder = async (req,res) =>{
    
    const {user, table,plates,client,date,payment_method,status} = req.body
    try {
        const newOrder = new Order({
            user,
            table,
            plates,
            client,
            payment_method,
            date,
            status
        });
        const orderSaved = await newOrder.save().then(t =>
          Order.findById(newOrder._id).populate("user")
          .populate("table")
          .populate("plates._id")
          .populate("client")); ;
        
    
        res.status(201).json(orderSaved)
          
    } catch (error) {
        console.log(error)
    }
    
}

export const getOrders =  async (req,res) =>{
    
  try { 
    
    if(req.query.user || req.query.table || req.query.plates || req.query.client){
      const data = req.query;
      const orders = await Order.find(data)
        .populate("user")
        .populate("table")
        .populate("plates._id")
        .populate("client");
      res.json(orders);
    }else{
      const orders = await Order.find()
        .populate("user")
        .populate("table")
        .populate("plates._id")
        .populate("client")
      res.json(orders);
    }
    
       
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
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
/*   const { id } = req.params;
  const order = await Order.findById(id)
    .populate("user")
    .populate("table")
    .populate("plates")
    .populate("client");
  if (!order) {
    return res.status(404).json({ msg: "No Encontrado" });
  }

  // Actualizar Order
  order.user = req.body.user || order.user;
  order.table = req.body.table || order.table;
  order.plates = req.body.plates || order.plates;
  order.client = req.body.client || order.client;
  order.date = req.body.date || order.date;
  order.payment_method = req.body.payment_method || order.payment_method;
  
  try {
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder)    
  } catch (error) {
    console.log(error)
  }
   */

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      req.body,
      {
        new: true,
      }
    ).populate("user")
    .populate("table")
    .populate("plates._id")
    .populate("client");
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
}


export const deleteOrderById = async (req,res) =>{
    const { orderId } = req.params;

  await Order.findByIdAndDelete(orderId);

  // code 200 is ok too
  res.status(200).json(orderId);
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

export const filterOrderByDate = async (req,res) =>{
  

  try {
    const startDate = req.query.startDate
    const endDate = req.query.endDate


      // Convertir las fechas a objetos Date
    const startDateDate = new Date(startDate);
    const endDateDate = new Date(endDate);

    // Validar que las fechas sean válidas
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Las fechas son obligatorias.' });
    }

    // Filtrar las ordenes en el rango de fecha
    const orders = await Order.find({
      date: {
        $gte: startDateDate,
        $lte: endDateDate
      },
    })
    .populate("user")
    .populate("table")
    .populate("plates._id")
    .populate("client");

    // Enviar la respuesta
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
