const express =require('express');
const app =express();
const {User}=require('./model/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const cors=require('cors');
const morgan=require('morgan');
// connecting to database
mongoose.connect('mongodb://127.0.0.1:27017/shopifyEcom')
.then(()=>{
    console.log('Connected to database');
    
}).catch((err)=>{
    console.log('database is not connected',err);
    
})

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//task 1-> create one register route
app.post('/register',async(req,res)=>{
    try{

        const {name,email,password}=req.body;
        //checking if field missing
        if(!name || !email || !password     ){
            return res.status(400).json({message:'some fields are missing'})
        }

        // check if user already exist

        const isUserAlreadyExists=await User.findOne({email});
    if(isUserAlreadyExists){
        return res.status(400).json({message:'Use already exists'})

    }else{

        //hashing the password 
        const salt =await bcrypt.genSaltSync(password,salt);

        // jwttoken 

        const token=jwt.sign({email},'supersecrete',{expiresIn:'365d'});

        // creating new user
        await User.create({
            name,
            email,
            password:hashedpassword,
            token,
            role:'user'
        })

    }
        }catch(error){
            console.log(error);
            

    }

})
// task 2-> create login route
app.post('/login',async(req,res)=>{
    const {email,password=req.body;

        //check if any field is missing

        if(!email||!password){
            return res.status(400).json({message:'some fields are missing'})
        }

        // user exists or not

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'user does not exists'})
        }  
        
        // compare the entered password with the hashed password
        const isPasswordMatched=await bcrypt.compareSync(password,user.passwor)
        if(!isPasswordMatched){
            return res.status(400).json({message:'Password is incorrect'})
        }

        // successfully loged in

        return res.status(200).json({
            message:'user logged in successfully',
            id:user._id,
            name:user.name,
            email:user.email,
            token:user.token,
            role:user.role
        
        })
            }
})


const port =8080;
app.listen(port,()=>{
    console.log(`server is connected to port ${port}`);
    
})