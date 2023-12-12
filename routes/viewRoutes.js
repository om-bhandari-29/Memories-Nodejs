const express = require("express");
const router = express.Router();
const viewController = require("./../controller/viewController.js");
const authController = require('./../controller/authController.js');


router.use(authController.isLoggedIn); //this 'use' method should always be written before all other requests

router.get("/", viewController.index);
router.get("/login", viewController.login);
router.get("/signup", viewController.signup);

module.exports = router;