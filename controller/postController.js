const multer = require('multer');
const Posts = require('../model/imageModel.js');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel.js');
const sharp = require('sharp');


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    req.imageError = "only Image"
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadImage = upload.single('image');

exports.updateDatabase = async (req, res) => {
    try {
        if(req.imageError === "only Image"){
          throw new Error("Only image")
        }

        const loggedInUser = req.currentUserId;
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
        var err = "";
        if(error.message === 'Only image')
          err = error.message;

        res.status(500).json({
          status: err
        });
      }
}


//getUser function will find the current user Id using jwt token, and after finding it will keep that user in current running reqest object, of currently running request response cycle
exports.getUser = async (req, res, next) => {
    const jwtToken = req.headers.cookie.split('=')[1];
    const decoded =  jwt.verify(jwtToken, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    req.currentUserId = currentUser;
    // console.log("Current user Id is : "+currentUser._id)
    // console.log(currentUser);

    next();
}

exports.resizeImage = async (req, res, next) => {
  try{
      if(req.imageError === "only Image"){
        throw new Error("Only image")
      }

      const bufferedImage = req.file.buffer;
      await sharp(bufferedImage).resize(280, 175, {
        fit: "contain",
        background: {
          r: 217,
          b: 216,
          g: 215
        }
      }).toBuffer().then(image => {
        req.file.buffer = image;
      })
  }
  catch(error){
      var err = "";
      if(error.message === 'Only image')
        err = error.message;

      return res.status(500).json({
        status: err
      });
  }

  next();
}