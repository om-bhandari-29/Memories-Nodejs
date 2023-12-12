const router = require("express").Router();
const userController = require("./../controller/userController.js");

router.post("/update", userController.updateUser);


module.exports = router;