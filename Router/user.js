const express =require("express");
const { getdata, postData, getIdData, updateData, deleteData } = require("../controller/contactFunctions");
const userData=require("../Database/userdata.json");
 
 
const router=express();
 router.route("/").get( getdata(userData) ).post(postData(userData) );


router.route("/:id").get( getIdData(userData) ).put( updateData(userData) );
router.route("/:id").delete(deleteData(userData));
 

module.exports=router;