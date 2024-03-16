//Importing the Express module and creating an instance
const express= require("express");
    const app= express();
    //Creating a function for the addition of 2 numbers
    const addTwoNumber= (n1,n2) => {
        return n1+n2;
    }
    //Handle the requests for getting the 2 numbers for adddition
    app.get("/addTwoNumber", (req,res)=>{
        const n1= parseInt(req.query.n1);
        const n2=parseInt(req.query.n2);
        const result = addTwoNumber(n1,n2); // Adding the 2 numbers using the function created above
        res.json({statuscocde:200, data: result }); 
    });

    //Handling get requests and the HTML content for the web
    app.get("/", (req, res) => {
        const n1 = "<html><body><H1>HELLO!<br> Welcome to SIT323: Cloud Native Application... </H1> <br> Deakin University, <br> Burwood Campus</body></html>";
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(n1));     
    })

    //Display the result of the addition
    console.log (addTwoNumber(19,12));

    //Set up of the listening port and the message to be displayed
    const port=3040;
    app.listen(port,()=> {
        console.log("hello i'm listening to port "+port);
    })