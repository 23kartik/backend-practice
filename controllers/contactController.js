const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");
//@dec Get all contacts 
//@route Get /api/contacts
//@access public

const getContact = asyncHandler(async (req,res)=>{
    const contacts=await Contact.find();

    res.status(200).json(contacts);
});

//@dec Post all contacts 
//@route Post /api/contacts
//@access public

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
    });
    res.status(201).json(contact);
});


//@dec Delete contact by id
//@route Delete /api/contacts/id
//@access public

const deleteContact = asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne(contact);
    res.status(200).json(contact);
});

//@dec Get contact by id 
//@route Get /api/contacts/id
//@access public

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
//@access public

const updateContact = asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact=await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
    );
    res.status(200).json(updatedContact);
});



module.exports={getContact,postContact,updateContact,getByContact,deleteContact};