const express = require('express');
const app = express();

app.get('/',(req,res)=>{
res.send("Hello, You are on 8000");
});

app.get('/about',(req,res)=>{
    res.send("Hello, You are on ABOUT 8000");
    });
app.listen(8000,()=>{
    console.log("Listening on 8000");
})