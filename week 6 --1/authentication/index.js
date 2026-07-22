const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = process.env.JWT_SECRET || "change-me";

app.use(express.json());

const users = [];

/*
[
  {
    username: "user1",
    password: "password1"
  }
]
*/

// Generates a random 32-character token.. this is just a random token which gets generated on our pc -- (solution) - now we need to add a decrypted JWT token for the browser to understand our token and to genrate it

/*  function generateToken() {
    const options = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];

    let token = "";

    for (let i = 0; i < 32; i++) {
        token += options[Math.floor(Math.random() * options.length)];
    }

    return token;
}  */

// Signup Route
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    });

    res.json({
        message: "User signed up successfully"
    });
});

// Signin Route
app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const token = jwt.sign({
            username: user.username
        }, JWT_SECRET);

        user.token = token;
        res.send({
            token
        })
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
});


app.get("/me", (req, res) => {
    const token = req.headers.authorization;
    const userDetails = jwt.verify(token, JWT_SECRET);  // This is where we are verifying the token and getting the user details from it

    const username =  userDetails.username;
    const user = users.find(user => user.username === username);

    if (user) {
        res.send({
            username: user.username
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})

app.listen(3000)