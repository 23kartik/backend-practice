const express=require("express");
const { postUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router=express.Router();

router.post("/register",postUser)
router.post("/login",loginUser)
router.get("/current",validateToken,currentUser)

module.exports=router;