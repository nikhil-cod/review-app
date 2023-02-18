const express = require('express');
const userRouter = require("./routes/user");
require("./db/index");
const app = express();
app.use(express.json());

app.use("/api/user",userRouter);
// We are Refactoring our code in MVC Pattern (Modal View Controller)

app.listen(8000,()=>{
    console.log("Listening on 8000");
})


//Concept od Middleware 
    // app.get(
    // "/about",
    // (req,res,next)=>{
    //     next();
    // },
    // (req,res)=>{
    // res.send("This is third parameter")
    // }
    // )

    //Here there are three parameters to the app.get()  so in 2nd parameter there is next() , that means it tells to do next and 
    // run the 3rd parameter function