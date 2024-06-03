const express = require("express");
const cors = require('cors');
const db = require('./config/database')


const app = express();
app.use(cors());
app.use(express.json());

app.post('/signup', (req, res)=>{
    const sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login', (req, res)=>{
    const sql = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";
    
    db.query(sql, [req.body.email, req.body.password], (err, data)=>{
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    })
})

app.listen(8000, ()=>{
    console.log("Server is listening at port 8000");
})
