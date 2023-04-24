const express = require("express");
const router = express.Router();

const authController = require("../controllers/AuthController");

router.post("/register", authController.registerUser);

module.exports = router;
