const express = require("express");
const router = express.Router();
// const path = require('path');
// const authController = require("../controllers/auth");

router.get('/login',(req, res) => {
    res.sendFile("Login.html" , { root: './'});
});
router.get("/signup",function(req,res){
    res.sendFile("SignUP.html" , { root: './'});
});
router.get('/homepage',(req, res) => {
    if (req.user) {
        res.sendFile("Homepage.html", { root: './' })
    } else {
        res.sendFile("Login.html", { root: './' });
    }
})
module.exports = router;