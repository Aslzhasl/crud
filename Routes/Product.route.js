const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');


//get list of all
 router.get('/', async(req,res,next)=>{
try{
const results = await Product.find({price:699},{__v:0});// filter query here
res.send(results);
} catch (error){
   console.log(error.message);
}   
 });


//creating product
 router.post('/',async (req,res,next)=>{
try{
   const product = new Product(req.body);
   const result =await product.save()
   res.send(result)
}catch(error){
console.log(error.message);
}



   /*  const product = new Product({
      name : req.body.name,
      price : req.body.price
   });

   product.save()
   .then(result=>{
      console.log(result);
      res.send(result);
   })
   .catch(err=>{
      console.log(err.message);
   });*/

 });



// get by id
 router.get('/:id',async (req,res,next)=>{
const id = req.params.id
try{

const product = await Product.findOne({_id:id});
res.send(product);
}catch(error){
   console.log(error.message);
}
});


 //Update 
 router.patch('/:id',(req,res,next)=>{
    res.send('updatting a single product');

 });

 // delete 
 router.delete('/:id',async (req,res,next)=>{
   const id =req.params.id;
   try{
      const result = await Product.findByIdAndDelete(id) ;
      console.log(result);
      res.send(result);
   }catch(error){

   console.log(error.message);
   }


   
 });


 module.exports = router;