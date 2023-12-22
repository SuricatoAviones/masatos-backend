import Plate from '../models/Plate'
import multer from 'multer';





export const createPlate = async (req,res) =>{
  // Configuración de Multer
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname+'/../uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const {name,description,price,disponibility} = req.body;
  const newPlate = new Plate({
    name,
    description,
    price,
    disponibility          
  });
  // Comprueba si faltan datos
  console.log(name, description)
  if (!name || !description || !price || !disponibility) {
    return res.status(400).send({
      error: 'Faltan datos.',
    });
  }
  // Subir la imagen
  const upload = multer({ storage }).single('img');
  await upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err);
    }
    newPlate.img = req.file.filename;
        
    const plateSaved = await newPlate.save()
    
    res.status(201).json(plateSaved)
    
  });  
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