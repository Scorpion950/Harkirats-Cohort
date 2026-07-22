const express = require("express");
const jwt = require ("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "change-me";
const app = express();
app.use(express.json());

const users = [];

function logger(req,res,next){
    console.lofg(req.method+"request came");
    next();
}

app.use(logger);

//CORS, localhost:3000
app.get("/", function(req,res){
    res.sendFile(__dirname + "/../frontend of auth web/index.html");
    })

app.post("/signup", function(req,res){
    const username = req.body.username
    const password = req.body.password
    users.push({
        username,
        password
    })

    // we need to check if the user already exists in the users array, if it does we should return an error message

    res.json({
        message: "User created successfully"
    })

})

app.post("/signin", function(req,res){
    const username = req.body.username
    const password = req.body.password    

        let foundUser = null;
        for(let i=0;i<users.length;i++){

            if(users[i].username === username && users[i].password === password){
                foundUser = users[i];
                break;
            }
        }

        if(foundUser){
            const token = jwt.sign({ username }, JWT_SECRET);
            res.json({
                token: token
            });
        } else {
            res.status(401).json({
                message: "Invalid credentials"
            });
        }
})

function auth(req,res,next){        // middleware function to check if the user is authenticated
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData.username) {
        req.username = decodedData.username;
        next();
    } else {
        res.json({
            message: "Not logged in"
        });
}
}

app.get("/me", auth, function(req,res){
    
     
        let foundUser = null;
        
        for(let i=0;i<users.length;i++){
            if(users[i].username === req.username){
                foundUser = users[i];
            }
        }

            res.json({
                username: foundUser.username,
                password: foundUser.password
            })
        
})

app.get("/todos", auth, function(req,res){
})

app.listen(3000)