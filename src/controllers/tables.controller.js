import Table from '../models/Table'

export const createTable = async (req,res) =>{
    
    const {name, description,number} = req.body
    try {
        const newTable = new Table({
            name,
            description,
            number
        });
    
        const tableSaved = await newTable.save()
    
        res.status(201).json(tableSaved); 
    } catch (error) {
        console.log(error)
    }
    
}

export const getTables =  async (req,res) =>{
    
    if(!req.query){
      const tables = await Table.find();
      res.json(tables);
    }else{
      const data = req.query;
      const tables = await Table.find(data);
      res.json(tables);
    }
}


export const getTableById = async (req,res) =>{
    const { tableId } = req.params;

  const table = await Table.findById(tableId);
  res.status(200).json(table);
}


export const updateTableById = async (req,res) =>{
    const updatedTable = await Table.findByIdAndUpdate(
        req.params.tableId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedTable);
}


export const deleteTableById = async (req,res) =>{
  
  const { tableId } = req.params;

  await Table.findByIdAndDelete(tableId);

  // code 200 is ok too
  res.status(200).json(tableId);
}
