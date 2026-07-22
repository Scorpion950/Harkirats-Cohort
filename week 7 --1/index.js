const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "change-me";
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/todo-app");

const app = express();
app.use(express.json());


app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email: email,
        password: "123123",
        name: "yash"
    });
    
    res.json({
        message: "You are signed up"
    })
});



app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
        password: password,
    });

    console.log("response", response);

    if (response) {
        const token = jsonwebtoken.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.post("/todo", auth, function(req, res) {

    const userId = req.userId;

    res.json({
        userId: userId
    })

});


app.get("/todos", auth, function(req, res) {

    const userId = req.userId;

    res.json({
        userId: userId
    })

});

function auth(req, res, next) {
    const token = req.headers.authorization;

    const response = jsonwebtoken.verify(token, JWT_SECRET);

    if (response) {
        req.userId = response.id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET
}

app.listen(3000);