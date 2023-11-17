import Table from '../models/Table'

export const createTable = async (req,res) =>{
    
    const {name, description,number} = req.body

    const newTable = new Table({
        name,
        description,
        number
    });

    const tableSaved = await newTable.save()

    res.status(201).json(tableSaved);
}

export const getTables =  async (req,res) =>{
    const tables = await Tables.find();
    res.json(tables);
}
export const getTableById = (req,res) =>{
    
}
export const updateTableById = (req,res) =>{
    
}
export const deleteTableById = (req,res) =>{
    
}