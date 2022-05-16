const Product = require('../models/product.model');
const multer = require("multer");

// Add product

const addProduct = async (req, res) => {
    if (req.body) {
console.log(req.file.originalname)
        const product = new Product({
            title:req.body.title,
            description:req.body.description,
            image:req.file.originalname,
            prices:{
                small:req.body.small,
                medium:req.body.medium,
                large:req.body.large,
                regular:req.body.regular
            },
            status:req.body.status
        });
        try {
            const newProduct = await product.save();
            res.status(201).json(newProduct);
            console.log(newProduct)
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    }
}


// Get all the prodcuts as list
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

// update products details

const updateProductsDetails = async (req, res) => {
  console.log('Im Here')
    if (req.params.id) {
        const product = await Product.findById(req.params.id);
        console.log(req.body)

        if(req.file!=null){
            product.image=req.file.originalname;
        }
        if (req.body.title != null) {
            product.title = req.body.title;
            console.log(product.title)
        }
        if (req.body.description != null) {
            product.description = req.body.description;
        }
        if (req.body.status != null) {
            product.status = req.body.status;
        }
        if (req.body.small != null) {
            product.prices.small = req.body.small;
        }
        if (req.body.medium != null) {
            product.prices.medium = req.body.medium;
            console.log('sddsd')
        }
        if (req.body.large != null) {
            product.prices.large = req.body.large;
        }
        if (req.body.large != null) {
            product.prices.regular = req.body.regular;
        }
        try {
            const updatedProduct = await product.save();
            console.log((updatedProduct))
            res.status(200).json(updatedProduct);

        } catch (err) {
            res.status(400).json({message: err.message})
        }
    }
}

//Remvoe the porduct
const removeProduct = async (req, res) => {
    if (req.params.id) {
        const product = await Product.findById(req.params.id);
        try {

            const removedProduct = await product.remove();
            res.status(200).json(removedProduct);

        } catch (err) {
            res.status(400).json({message: err.message})
        }

    }

}

const FilterByCategory=async(req,res)=>{
  if(req.params.status){
      try{
       const products=await Product.find({status:req.params.status});
       res.status(200).json(products);
      }catch(err){
          res.status(500).json({message: err.message})
      }

  }
}


module.exports = {
    addProduct,
    getProducts,
    updateProductsDetails,
    removeProduct,
    FilterByCategory
}
