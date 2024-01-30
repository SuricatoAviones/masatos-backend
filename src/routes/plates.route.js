import { Router, response } from "express";
import * as platesController from "../controllers/plates.controller";
import { authJwt } from "../middlewares";
import multer from 'multer';
import B2 from "backblaze-b2";
import Plate from '../models/Plate'


const router = Router();
const upload = multer({ storage :multer.memoryStorage() });

// Rutas de Platos
router.post('/', upload.any() , async(req,res)=>{

  try {
    // Variables a Tomar
    const {name,description,price,disponibility} = req.body;
    console.log(req.files)
    // Config B2 
    const b2 = new B2({
      applicationKeyId: process.env.KEY_ID,
      applicationKey: process.env.APP_KEY,       
    });

    const authResponse = await b2.authorize();
    

    const {downloadUrl} = authResponse.data;

    // b2 Upload File
    const response = await b2.getUploadUrl({bucketId: process.env.BUCKET_ID});

    const { authorizationToken , uploadUrl } = response.data;
    const params ={
      uploadUrl,
      uploadAuthToken: authorizationToken,
      filename: `${req.files[0].originalname}`,
      data: req.files[0].buffer
    }
    

    const fileInfo = await b2.uploadFile(params);
    const url = `${downloadUrl}/file/${process.env.BUCKET_NAME}/${fileInfo.data.fileName}`
 

    // Crear datos
    const newPlate = new Plate({
      name,
      description,
      price,
      disponibility,
      img: url    
    });

    // Por si tiene datos faltantes
    if (!name || !description || !price || !disponibility) {
      return res.status(400).send({
        error: 'Faltan datos.',
      });
    }
   
    // Enviar datos al json y guardarlos
    const plateSaved = await newPlate.save()               
    res.status(201).json(plateSaved)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
}, authJwt.verifyToken)
router.get('/', authJwt.verifyToken,platesController.getPlates)
router.get('/:plateId', authJwt.verifyToken,platesController.getPlateById)
router.put('/:plateId', authJwt.verifyToken,platesController.updatePlateById)
router.delete('/:plateId', authJwt.verifyToken,platesController.deletePlateById)


export default router;