const express = require('express');
const router = express.Router();
const postController = require('../controller/postController.js');

router.post('/upload', postController.getUser, postController.uploadImage, postController.resizeImage, postController.updateDatabase);
//uploadController.getUser = using this middleware we are just getting the ID of currently logged in user and putting and ID in our request Object so that we acces it from currently running request response cycle

router.delete('/:postId', postController.deletePost);

module.exports = router;