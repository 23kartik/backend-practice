const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");
//@dec Get all contacts 
//@route Get /api/contacts
//@access private

const getContact = asyncHandler(async (req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});

    res.status(200).json(contacts);
});

//@dec Post all contacts 
//@route Post /api/contacts
//@access private

const postContact = asyncHandler(async (req,res)=>{

    const {name,email,phone}=req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,
    });
    res.status(201).json(contact);
});


//@dec Delete contact by id
//@route Delete /api/contacts/id
//@access private

const deleteContact = asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new MongoExpiredSessionError("User don't have permission to update other user contact");
      }
    await Contact.deleteOne(contact);
    res.status(200).json(contact);
});

//@dec Get contact by id 
//@route Get /api/contacts/id
//@access private

const getByContact = asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@dec Update contact by id 
//@route Put /api/contacts/id
//@access private

const updateContact = asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

  if(contact.user_id.toString()!==req.user.id){
    res.status(403);
    throw new MongoExpiredSessionError("User don't have permission to update other user contact");
  }


    const updatedContact=await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
    );
    res.status(200).json(updatedContact);
});



module.exports={getContact,postContact,updateContact,getByContact,deleteContact};