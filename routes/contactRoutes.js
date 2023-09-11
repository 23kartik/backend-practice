const express=require("express");
const router=express.Router();

const {getContact,postContact,getByContact,deleteContact,updateContact}=require("../controllers/contactController")

router.route("/").get(getContact).post(postContact);

router.route("/:id").get(getByContact).put(updateContact).delete(deleteContact);



module.exports=router;