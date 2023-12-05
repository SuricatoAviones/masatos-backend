import Plate from '../models/Plate'

export const createPlate = async (req,res) =>{
    
    const {name, description,price,disponibility} = req.body
    try {
        const newPlate = new Plate({
            name,
            description,
            price,
            disponibility
        });
        const plateSaved = await newPlate.save()
    
        res.status(201).json(plateSaved); 
    } catch (error) {
        console.log(error)
    }
    
}

export const getPlates =  async (req,res) =>{
    const plates = await Plate.find();
    res.json(plates);
}


export const getPlateById = async (req,res) =>{
    const { plateId } = req.params;

  const plate = await Plate.findById(plateId);
  res.status(200).json(plate);
}


export const updatePlateById = async (req,res) =>{
    const updatedPlate = await Plate.findByIdAndUpdate(
        req.params.plateId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedPlate);
}


export const deletePlateById = async (req,res) =>{
    const { plateId } = req.params;

  await Plate.findByIdAndDelete(plateId);

  // code 200 is ok too
  res.status(200).json();
}