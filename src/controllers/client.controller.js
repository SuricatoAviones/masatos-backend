import Client from '../models/Client'

export const createClient = async (req,res) =>{
    
    const {name, cedula,phone,address} = req.body
    try {
        const newClient = new Client({
            name,
            cedula,
            phone,
            address
        });
        const clientSaved = await newClient.save()
    
        res.status(201).json(clientSaved); 
    } catch (error) {
        console.log(error)
    }
    
}

export const getClients =  async (req,res) =>{
    
    if(!req.query){
      const clients = await Client.find()
      res.json(clients);
    }else{
      const data = req.query;
      const clients = await Client.find(data);
      res.json(clients);
    }
}


export const getClientById = async (req,res) =>{
    const { clientId } = req.params;

  const client = await Client.findById(clientId)
  res.status(200).json(client);
}


export const updateClientById = async (req,res) =>{
    const updatedClient = await Client.findByIdAndUpdate(
        req.params.orderId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedClient);
}


export const deleteClientById = async (req,res) =>{
    const { clientId } = req.params;

  await Client.findByIdAndDelete(clientId);

  // code 200 is ok too
  res.status(200).json(clientId);
}

export const filterClientByDate = async (req,res) =>{
  

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
    const clients = await Client.find({
      date: {
        $gte: startDateDate,
        $lte: endDateDate
      },
    })

    // Enviar la respuesta
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



