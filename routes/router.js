const express=require("express");
const signup = require("../controller/SignUp");
const logIn = require("../controller/LogIn");
const router=express.Router();

router.post("/singup",signup);

router.post("/login",logIn);

module.exports = router;
