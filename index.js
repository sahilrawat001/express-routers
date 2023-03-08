const express =require("express");
const app=express();
app.use(express.json());
const dotenv =require("dotenv").config();
const contact=require("./Router/contact")
 
const port= process.env.PORT  ||5000 ;

app.use("/contact" , contact );
app.use("/user" , require("./Router/user") );

app.listen( port ,( )=>{
    console.log(` port is running at ${port} `);
}  );