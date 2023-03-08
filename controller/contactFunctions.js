const fs=require("fs")
const { userSchema, contactSchema, userUpdate, contactUpdate } = require("../Joi/validation");


//push updated data in file
function fspush(file, data) {
     if (file == "u") {
         fs.writeFileSync("./Database/userdata.json", JSON.stringify(data), "utf-8" );
    }
     else {
         fs.writeFileSync("./Database/contactdata.json", JSON.stringify(data), "utf-8" );   
    }


}
// check if the path is contact or user
let checkUrl = (path)  => {
    let check;
    if (path.includes("user")) {
        check= 1;
    }
    else {
        check= 2;
    }
    return check;
}


//post a new data functiom inside postData main function
function postNewData(postedData, data, res) {

    let userData  = data.find((i) => i.id == postedData.id);
     if (userData) {
         res.status(400).send(" already present data");
       
    }
     else {
         data.push(postedData);
         let postType = postedData.type;
         console.log(data);
         fspush( postType ,data)
         res.send(data);
    }

     
}

let getdata = (data) => (req, res) => {
      res.send(data);
}


let getIdData = (data) => (req, res) => {
    let resultData = data.find((i) => i.id == req.params.id);
    console.log(resultData);
    res.send(resultData);
}
  

let postData = (data) => (req, res) => {
    if (checkUrl(req.originalUrl) == 2) {
        
         const result = contactSchema.validate(req.body);
        if (result.error) {
             console.log(result.error);
 
            res.status(400).send(" Can't sign up due to validation contactschema");
        }
        else {
            postNewData(req.body,data,res); 
            
           
        }
    }
    else {
        const result = userSchema.validate(req.body);
 
        if (result.error) {
             console.log(result.error);
            res.status(400).send(" Can't sign up due to validation userschema");
        }
        else {
            postNewData(req.body,data,res);
              
        }


    }

}

let updateData = (data) => (req, res) => {
    let resultData = data.find((i) => i.id == req.params.id);
    let restData = data.filter((i) => i.id != req.params.id);
     if (!resultData) {
        res.status(404).send("can't update");
    }
    else {

        //contact 
         if (checkUrl(req.originalUrl) == 2) {
             const result = contactUpdate.validate( {contact:req.body.contact,state:req.body.state,mail:req.body.mail   }  );

             if (result.error) {
                 console.log(result.error);
                 res.status(400).send(" Can't update due to validation contactschema");
             }
             else {
                 
                 if (req.body.contact) {        
                     resultData.contact = req.body.contact;
                 }
                 if (req.body.mail) {
                     
                     resultData.mail = req.body.mail;
                 }
                 if (req.body.state) {
                     
                     restData.state = req.body.state;
                 }
                 
             }
             restData.push(resultData);
             let checkType = resultData.type;
               fspush(checkType, restData);
             res.status(202).send("updated data successfully");
             
        }

        //user
         else {
             const result = userUpdate.validate({ name: req.body.name, age: req.body.age, gender: req.body.gender });
             if (result.error) {
                 console.log(result.error);
                 res.status(400).send(" Can't update due to validation contactschema");
             }
             else {
                 
                 if (req.body.name) {
                     resultData.name = req.body.name;
                 }
                 if (req.body.age) {
                     resultData.age = req.body.age;
                 }
                 if (req.body.gender) {
                     resultData.gender = req.body.gender;
                 }
                 
                 restData.push(resultData);
                 let checkType = resultData.type;
                 fspush(checkType, restData);
                 res.status(202).send("updated data successfully");
                }
        }

    }


}
let deleteData = (data) => (req, res) => {
    let restData  = data.filter((i) => i.id != req.id);
    console.log(restData,"++++");
    if (checkUrl(req.originalUrl) == 2) {
        let file="c";
        fspush(file, restData);
    }
    else {
        let file = "u";
        fspush(file, restData);
    }
    res.status(202).send("deleted successfully")
    

} 
module.exports = { getdata, postData, getIdData, updateData ,deleteData}