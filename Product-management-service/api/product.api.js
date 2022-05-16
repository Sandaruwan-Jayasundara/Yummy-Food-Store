const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const multer=require('multer');

const FileStorage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, '../Frontend/public/Profile');
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})

const upload=multer({storage:FileStorage});

// Add  product
router.post('/add',upload.single('file'),controller.addProduct);


// Get all products
router.get('/', controller.getProducts);


// Update products details
router.patch('/edit/:id',upload.single('file'), controller.updateProductsDetails);


// Remove a products
router.delete('/remove/:id', controller.removeProduct);


//Filter by products
router.get('/filter/:status',controller.FilterByCategory);

module.exports = router;
