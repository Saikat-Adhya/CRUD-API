const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model')
const app = express()

// for converting to json
app.use(express.json()); 
//for accepting like form format
app.use(express.urlencoded({extended:false}));

app.get('/', function (req, res) {
  res.send('The owner of the server is Dodo AKa Saikat Adhya ok')
});

//This is use to get the products.
app.get('/api/products', async(req, res)=>{
    try {
        const product=await Product.find({});
        res.status(200).json(product) //Getting all the product list.
    } catch (error) {
        req.status(500).json({message: error.message})
        
    }
});
app.get('/api/product/:id', async(req, res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findById(id);
        res.status(200).json(product) //Getting the product list using[ID].
    } catch (error) {
        req.status(500).json({message: error.message})
        
    }
});
// This is use create the product.
app.post('/api/products', async(req, res)=>{
    try {
        const product=await Product.create(req.body);
        res.status(200).json(product) //Listing the product.
    } catch (error) {
        req.status(500).json({message: error.message})
        
    }
})
// This is use to update the product
app.put('/api/product/:id', async(req, res)=>{
    try {
        const {id} = req.params;

        const product=await Product.findByIdAndUpdate(id,req.body);

        if (!product) {
            return res.status(404).json({message: "Oops!! Product not found"})
            
        } else {
            const updateProduct = await Product.findById(id);
            res.status(200).json(updateProduct);
        }
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// Delete a Product
app.delete('/api/product/:id', async (req, res)=>{
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({message: "Oops!! Product not found"})
            
        } else {
            
            res.status(200).json({message: "Product deleted successfully !"});
        }
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }

})

app.listen(3000,() =>{
    console.log("Server is running in the port number at :-3000");
});

mongoose.connect("mongodb+srv://admin:admin@backend.54ijgxf.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Backend")
.then(() =>{
    console.log("Connected to the database!");
})
.catch(()=>{
    console.log("Opps!! Connection Failed.");
})