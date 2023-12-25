const express = require('express');
const server = express();
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crudgames",
});

const JWT_SECRET_KEY = "gfg_jwt_secret_key"
const TOKEN_HEADER_KEY = "gfg_token_header_key"

server.use(express.json());
server.use(cors());

server.post("/register", (req, res) => {
    const { name, cost, category } = req.body;

    let sql = "INSERT INTO games (name, cost, category) VALUES (?,?,?)"
    db.query(sql, [name, cost, category], (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            res.status(201).send();
        }
    })
});

server.get("/games", (req, res) => {
    let sql = "SELECT * FROM games";
    db.query(sql, (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }

    })
});

server.put("/edit", (req, res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;

    let sql = "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?";
    db.query(sql, [name, cost, category, id], (err,result) =>{
        if (err) {
            console.log(err);
        }else{

            res.send(result);
        }
    })
});

server.delete("/delete/:index", (req,res) =>{
    const { index } = req.params

    let sql = "DELETE FROM games WHERE idgames = ?"
    db.query(sql, [index], (err,result) =>{err ? console.log(err) : res.send(result)})
})


server.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token

    let jwtSecretKey = JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }

    const token = jwt.sign(data, jwtSecretKey, {
        expiresIn: '5h' // expires in 5 hours
    });

    res.send(token);
});

// Verification of JWT
server.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.

    let tokenHeaderKey = TOKEN_HEADER_KEY;
    let jwtSecretKey = JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);
        console.log(token)

        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});

server.listen(3001, () =>
    console.log("Running in the port 3001")
);