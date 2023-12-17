const User = require("./../model/userModel.js");
const Posts = require('./../model/imageModel.js');

exports.myUploads = async (req, res, next) =>{
    try{
        const currentUser =  req.currentUserId;
        console.log(currentUser);
        const post = await Posts.find({uploadedByUserId:currentUser._id});

        res.status(200).json({
            status: 'success',
            message: 'Image Uploaded Successfully'
        });
    }
    catch(error){
        res.status(500).json({
            status: error
        });
    }
};

