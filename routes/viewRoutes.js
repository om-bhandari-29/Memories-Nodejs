const express = require("express");
const router = express.Router();
const viewController = require("./../controller/viewController.js");
const authController = require('./../controller/authController.js');
const postController = require('../controller/postController.js');


router.use(authController.isLoggedIn); //this 'use' method should always be written before all other requests, so that the value that we have saved in this use route can be used in all other routes that appears after this use route

router.get("/", viewController.index);
router.get("/myUploads", postController.getUser, viewController.myUploads);
router.get("/login", viewController.login);
router.get("/signup", viewController.signup);
router.get("/:id", viewController.getPost);

module.exports = router;