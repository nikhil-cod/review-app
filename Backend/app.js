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