const express = require("express");
const db = require("./routes/db-config");
const app = express();
const PORT = process.env.PORT
const bodyParser = require("body-parser");
const cookie= require("cookie-parser");

const encoder = bodyParser.urlencoded({ extended: false });
app.use(express.static("/"));

app.use(express.json());
app.use(cookie());
app.use("/assets",express.static("assets"));
app.use("/js", express.static(__dirname + "./assets/js"))
app.use("/Images",express.static("Images"));
app.set('view engine', 'html');


//connect to the database
db.connect((err)=>{
    if (err) throw err;
    console.log("Database is now connected");
})


app.get("/",function(req,res){
  res.sendFile(__dirname + "/Login.html");
})
// authentication database for signup page
app.post("/signup",encoder,function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  var firstN = req.body.firstN;
  var lastN = req.body.lastN;
  db.query('INSERT INTO user_info SET ? ', {username:username , userPass:password, f_name: firstN, l_name:lastN},function(error,results,fields){
  console.log(results)
    if (error) {
      console.log(error);
     } else {
      res.redirect("/Login");
    }
  });
})
// //authenticating with the database for the login system
app.post("/login",encoder,function(req,res){
    var username = req.body.username;
    var password = req.body.password;
   db.query("select * from user_info where username = ? and userPass = ?",[username,password],function(error,results,fields){
      console.log(results)  
      if (results.length == 0 || results.length < 0){
        res.status(401).sendFile(__dirname + '/Login.html', {
            message: 'Email or Password is incorrect'
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