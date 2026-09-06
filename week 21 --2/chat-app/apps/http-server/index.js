import express from "express";
const app = express();
app.get("/signup", (req, res) => {
    res.send("Hello from signup");
});
app.get("/signin", (req, res) => {
    res.send("Hello from signin");
});
app.get("/chat", (req, res) => {
    res.send("Hello from chat");
});
//# sourceMappingURL=index.js.map