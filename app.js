const express =require('express');
const mongoose= require('mongoose');
const app = express();
//for parse body
app.use(express.json());
//for parsing url body
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/Restapi',).then(()=>{
console.log('Mongodb connected ...')
});


//for parsing json body
app.all('/test',(req,res)=>{
console.log(req.body);
res.send(req.body);
})


const ProductRoute =require('./Routes/Product.route');
app.use('/products',ProductRoute);
//eror
app.use((req,res,next)=>{
const err =new Error("Not Found");
err.status=404
next(err)
});

// Error handler
app.use((err,req,res,next)=>{
res.status(err.status || 500);
res.send({
    error:{
        status:err.status || 500,
        message:err.message
    }
});
});
app.listen(3000, ()=>{
    console.log('Server started  on 3000');
});
