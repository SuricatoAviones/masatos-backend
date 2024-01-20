import { Router } from "express";
import * as platesController from "../controllers/plates.controller";
import { authJwt } from "../middlewares";
import multer from 'multer';
import Plate from '../models/Plate'

const router = Router();

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './../backend/src/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  console.log(__dirname)
  const upload = multer({ storage })
// Rutas de Mesas
router.post('/', upload.single('img'), async(req,res)=>{
    try {
        const {name,description,price,disponibility} = req.body;
        const img = req.file.path;
        
        const newPlate = new Plate({
          name,
          description,
          price,
          disponibility,
          img: img        
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
})

router.get('/', platesController.getPlates)
router.get('/:plateId', platesController.getPlateById)
router.put('/:plateId', platesController.updatePlateById)
router.delete('/:plateId', platesController.deletePlateById)


export default router;