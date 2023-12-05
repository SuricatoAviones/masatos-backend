import Order from '../models/Order'

export const createOrder = async (req,res) =>{
    
    const {user, table,plates,date} = req.body
    try {
        const newOrder = new Order({
            user,
            table,
            plates,
            date
        });
        const orderSaved = await newOrder.save()
    
        res.status(201).json(orderSaved); 
    } catch (error) {
        console.log(error)
    }
    
}

export const getOrders =  async (req,res) =>{
    const orders = await Order.find();
    res.json(orders);
}


export const getOrderById = async (req,res) =>{
    const { orderId } = req.params;

  const order = await Order.findById(orderId);
  res.status(200).json(order);
}


export const updateOrderById = async (req,res) =>{
    const updatedOrder = await Product.findByIdAndUpdate(
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