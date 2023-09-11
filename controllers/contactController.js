//@dec Get all contacts 
//@route Get /api/contacts
//@access public

const getContact = (req,res)=>{
    res.status(200).json({message:"Get all contacts"});
}

//@dec Post all contacts 
//@route Post /api/contacts
//@access public

const postContact = (req,res)=>{

    const {name,email}=req.body;
    if(!name||!email){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    res.status(201).json({message:"Create contacts"});
}


//@dec Delete contact by id
//@route Delete /api/contacts/id
//@access public

const deleteContact = (req,res)=>{
    res.status(200).json({message:`Delete contact for ${req.params.id}`});
}

//@dec Get contact by id 
//@route Get /api/contacts/id
//@access public

const getByContact = (req,res)=>{
    res.status(200).json({message:`Get contact for ${req.params.id}`});
}

//@dec Update contact by id 
//@route Put /api/contacts/id
//@access public

const updateContact = (req,res)=>{
    res.status(200).json({message:`Update contact for ${req.params.id}`});
}



module.exports={getContact,postContact,updateContact,getByContact,deleteContact};