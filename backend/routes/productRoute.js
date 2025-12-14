import express from 'express'
import { addproduct,removeproduct,listproduct,listproducts } from '../controllers/productcontroller.js'
import authadmin from '../middleware/adminauth.js';
import upload from '../middleware/multer.js';
const productRouter = express.Router();

productRouter.post('/add',authadmin,upload.fields([{name:"image1",maxcount:1},{name:'image2',maxcount:1},{name:'image3',maxcount:1},{name:'image4',maxcount:1}]),addproduct)
productRouter.get('/list',listproduct)
productRouter.post('/remove',authadmin, removeproduct)
productRouter.get('/listall', listproducts)

export default productRouter
