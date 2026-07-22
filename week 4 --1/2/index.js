const express = require('express');

const app = express();

app.get("/",function(req,res){
    res.send("Hello World");    
})


app.post("/third",function(req,res){
    res.send("Hello World from POST route");    
})

app.get("/second",function(req,res){
    res.send("Hello World from 2nd route also HI");    
})
app.listen(3000);