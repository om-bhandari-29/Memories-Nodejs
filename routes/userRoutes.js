const router = require("express").Router();
const userController = require("./../controller/userController.js");
const uploadController = require('./../controller/uploadController.js');

router.get("/myUploads", uploadController.getUser, userController.myUploads);


module.exports = router;