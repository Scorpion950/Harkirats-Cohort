
import express from "express";

const app = express();


app.get("/signup", (req, res) =>{
    res.send("Hello from signup");
})

app.get("/signin", (req, res) =>{
    res.send("Hello from signin");
})

app.get("/chat", (req, res) =>{
    res.send("Hello from chat");
})

const port = Number(process.env.PORT) || 3001;

app.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`);
});