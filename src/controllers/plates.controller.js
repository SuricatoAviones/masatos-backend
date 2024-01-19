import Plate from '../models/Plate'
/* import multer from 'multer';

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname+'/../uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage })



export const createPlate = async (req,res) =>{
  try {
    const {name,description,price,disponibility} = req.body;
    const imagePath = req.file.path; // Obtener la ruta de la imagen subida
    const newPlate = new Plate({
      name,
      description,
      price,
      disponibility,
      img: imagePath          
    });
    
    if (!name || !description || !price || !disponibility) {
      return res.status(400).send({
        error: 'Faltan datos.',
      });
    }

    const plateSaved = await newPlate.save()
    
    res.status(201).json(plateSaved)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
  
} */

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