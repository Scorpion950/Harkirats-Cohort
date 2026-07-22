const express = require("express");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors());

app.post("/sum", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })

})

app.listen(3000);