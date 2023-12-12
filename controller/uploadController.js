const multer = require('multer');
const Posts = require('./../model/imageModel.js');
const jwt = require('jsonwebtoken');
const User = require('./../model/userModel.js');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
exports.uploadImage = upload.single('image');

exports.updateDatabase = async (req, res) => {
    try {
        const loggedInUser = req.currentUserId;
        // console.log("Logged In User : "+loggedInUserId);

        const image = new Posts({
          name: req.body.originalName,
          image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
          },
          imageName: req.body.imageName,
          imageDescription: req.body.imageDescription,
          uploadedBy: loggedInUser.name,
          uploadedByUserId: loggedInUser._id
        });
    
        // Save the uploaded image data to MongoDB
        await image.save();
    
        // res.redirect(`/`);
        res.status(200).json({
          status: 'success',
          message: 'Image Uploaded Successfully'
        })
      } 
      catch (error) {
        console.log('Error uploading image:', error);
        res.status(500).send('Internal Server Error');
      }
}

exports.getUser = async (req, res, next) => {
    const jwtToken = req.headers.cookie.split('=')[1];
    const decoded =  jwt.verify(jwtToken, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    req.currentUserId = currentUser;
    // console.log("Current user Id is : "+currentUser._id)
    // console.log(currentUser);

    next();
}