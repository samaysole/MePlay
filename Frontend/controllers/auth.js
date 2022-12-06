const express = require("express");
const router = express.Router();
const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const db = require("../routes/db-config");

router.post("/signup", signup)
// router.post("/login", login)
// router.get("/logout", logout)

module.exports = router;