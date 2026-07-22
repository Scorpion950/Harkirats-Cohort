const express = require('express');
const app = express();

const users = [{
    name: "yash",
    kidneys: [{
        healthy: false
    }]
}];

app.use(express.json());

app.get("/", function(req,res){
    const yashkidneys = users[0].kidneys;
    const numberOfKidneys = yashkidneys.length;
    let numberOfHealthyKidneys = 0;

    for(let i = 0; i < numberOfKidneys; i++){
        if(yashkidneys[i].healthy){
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }

    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

    res.json({
        yashkidneys,
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})
//post logic to add a kidney to the user
app.post("/",function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done"
    })
})
//put logic to make all kidneys healthy
app.put("/",function(req,res){
    for(let i=0; i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({})
})
//delete logic to remove all unhealthy kidneys
app.delete("/",function(req,res){
    const newKidneys =[];
    for(let i=0; i<users[0].kidneys.length;i++){
    if(users[0].kidneys[i].healthy){
    newKidneys.push(users[0].kidneys[i]);
}
    }
    users[0].kidneys = newKidneys;
    res.json({})
})

app.listen(3000);