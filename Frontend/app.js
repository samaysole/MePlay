const express = require("express");
const path = require("path")
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const db = require("./routes/db-config");
const app = express();
const PORT = process.env.PORT
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const encoder = bodyParser.urlencoded({ extended: false });
app.use(express.static("/"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());
app.use("/assets",express.static("assets"));
app.use("/Images",express.static("Images"));
app.set('view engine', 'html');
app.set("views", "/");
app.use(express.json())

//connect to the database
db.connect((err)=>{
    if (err) throw err;
    console.log("The database is now connected");
})


app.get("/",function(req,res){
  res.sendFile(__dirname + "/Login.html");
})

// app.get("/",function(req,res){
//    res.sendFile(__dirname + "/SignUP.html");
// })

//authenticating with the database for the login system
app.post("/",encoder,function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    db.query("select * from user_info where username = ? and userPass = ?",[username,password],function(error,results,fields){
      console.log(results)  
      if (results.length == 0 || results.length < 0){
        res.status(401).sendFile(__dirname + '/Login.html',{ 
          message: 'Wrong password or email'
        })
        }
        if (results.length > 0){
            res.redirect("/Homepage");
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

// Define Routes
app.use('/', require('./routes/pages'));
app.use("/api" , require("./controllers/auth"));
//app.use('/auth', require('./routes/auth'));

//set app port
app.listen(PORT);