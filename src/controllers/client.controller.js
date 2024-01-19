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
    const clients = await Client.find()
    res.json(clients);
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
  res.status(200).json();
}



