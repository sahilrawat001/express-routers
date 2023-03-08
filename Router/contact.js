const express =require("express");
const { getdata, postData, getIdData, updateData, deleteData } = require("../controller/contactFunctions");
const contactData=require("../Database/contactdata.json");
 
 
const router=express();
 router.route("/").get( getdata(contactData) ).post(postData(contactData) );


router.route("/:id").get( getIdData(contactData) );
router.route("/:id").put( updateData(contactData) );
router.route("/:id").delete(deleteData(contactData));

module.exports=router; 