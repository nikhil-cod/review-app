const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/review-app").then(()=>{  //Open Mongodb compass for it that Uri
    console.log("Connected to db");
}).catch(()=>{
    console.log("Error")
})