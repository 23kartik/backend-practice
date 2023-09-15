const express=require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb=require("./config/dbConnection");
const dotenv=require("dotenv").config();
const app=express();


connectDb();

app.use(express.json());
const port =process.env.PORT||5000;


// creating get request endpoint 

// app.get("/api/contacts",(req,res)=>{
//     res.send("get all contacts");
// });

// creating get request endpoint with json response

// app.get("/api/contacts",(req,res)=>{
//     res.json({message:"get all contacts"});
// });

// creating get request endpoint with status code 

// app.get("/api/contacts",(req,res)=>{
//     res.status(201).send("get all contacts");
// });


app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));

app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});