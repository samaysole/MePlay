const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "meplay"
});

//connect to the database

connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});

app.get("/",function(req,res){
  res.sendFile(__dirname + "/Login.html");
})

//app.get("/",function(req,res){
  //  res.sendFile(__dirname + "/SignUP.html");
//})

//authenticating with the database for the login system
app.post("/",encoder,function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    connection.query("select * from user_info where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if (results.length > 0){
            res.redirect("/Hompage");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

//when login is success
app.get("/Homepage",function(req,res){
    res.sendFile(__dirname + "/Homepage.html")
})

//set app port
app.listen(5000);