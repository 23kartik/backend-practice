const express=require("express");
const { postUser, loginUser, currentUser } = require("../controllers/userController");
const router=express.Router();

router.post("/register",postUser)
router.post("/login",loginUser)
router.post("/current",currentUser)

module.exports=router;