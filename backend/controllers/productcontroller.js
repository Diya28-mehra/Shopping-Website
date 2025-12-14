
import Product from '../models/productModel.js';
import {v2 as cloudinary} from 'cloudinary';
//function to add product
const addproduct = async(req,res) => {
    try{
        const {name,description,category,subcategory,new_price,old_price,size,bestseller} = req.body;
        
        const images = [
            req.files.image1 && req.files.image1[0],
            req.files.image2 && req.files.image2[0],
            req.files.image3 && req.files.image3[0],
            req.files.image4 && req.files.image4[0]
        ].filter(Boolean);

        let imagesUrl = await Promise.all(
            images.map(async (item) =>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )
        
        const sizeArray = JSON.parse(size);
        
        const lastProduct = await Product.findOne().sort({ id: -1 });
        const productId = lastProduct ? lastProduct.id + 1 : 1;
        
        const productData = {
            id: productId,
            name,
            description,
            category,
            subcategory,
            image: imagesUrl,
            new_price: Number(new_price),
            old_price: Number(old_price),
            size: sizeArray,
            bestseller: bestseller === 'true'
        };

        const product = new Product(productData);
        await product.save();
        
        res.status(200).json({success: true, message: "Product Added"});
    }
    catch(e){
        console.log(e);
        res.status(200).json({success:false, message:e.message});
    }
}


//function for list products
const listproducts = async(req,res) => {
    try{
        const products = await Product.find({});
        console.log(products);
        res.json({success:true, products});
    }
    catch(e){
        res.json({success:false, message:e.message});
    }
}


//function for delete products
const removeproduct = async(req,res) => {
    try{
        await Product.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Product Deleted"})
    }
    catch(e){
        res.json({success:false, message:e.message});
    }
}


//function for list single product
const listproduct = async(req,res) => {
    try{
        const {productid} = req.body;
        const product = await Product.findById(productid);
        res.json({success:true, product});
    }
    catch(e){
        res.json({success:false, message:e.message});
    }
}


export {addproduct,listproduct,listproducts,removeproduct};
