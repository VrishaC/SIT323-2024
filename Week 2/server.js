// Importing the module "Express" and creating an instance for its application
var express = require("express")
var app = express()

//Setting the port number and making the application listen to a specific port
var port = process.env.port || 3000;
app.listen(port,()=>{
console.log("App listening to: "+port)
})