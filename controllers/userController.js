const asyncHandler=require("express-async-handler");
const User=require("../models/userModel");
const bcrypt=require("bcrypt");

//@dec Register a Users 
//@route Post /api/Users/regiser
//@access public

const postUser = asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailabale=await User.findOne({email});
    if(userAvailabale){
        res.status(400);
        throw new Error("User already exists");
    }
    //Hash password
    const hashedPassword=await bcrypt.hash(password,10);
    console.log(hashedPassword);
    const user=await User.create({
        username,
        email,
        password:hashedPassword,
    }
    )
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }
    else{
        res.status(400);
        throw new Error("User data is not valid")
    }
    res.json({mesaage:"Register the user"})
});

//@dec Login a Users 
//@route Post /api/Users/login
//@access public

const loginUser = asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    res.json({mesaage:"login user"})

});
//@dec Current user info 
//@route Post /api/Users/current
//@access public

const currentUser = asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    res.json({mesaage:"Current user"})

});

module.exports={postUser,loginUser,currentUser}