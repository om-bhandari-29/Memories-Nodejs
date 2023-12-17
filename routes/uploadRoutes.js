const express = require('express');
const router = express.Router();
const uploadController = require('./../controller/uploadController.js');

router.post('/', uploadController.getUser, uploadController.uploadImage, uploadController.resizeImage, uploadController.updateDatabase);
//uploadController.getUser = using this middleware we are just getting the ID of currently logged in user and putting and ID in our request Object so that we acces it from currently running request response cycle

module.exports = router;