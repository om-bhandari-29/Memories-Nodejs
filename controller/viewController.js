const Posts = require('./../model/imageModel.js');
const uploadController = require('./../controller/uploadController.js');

exports.index = async(req, res) => {
    let post;
    if(req.query.searchPost){
        // post = await Posts.find({imageName: req.query.searchPost});
        post = await Posts.find({imageName: { $regex: req.query.searchPost, $options: 'i'}})
        //regex and options is used for case insensitive query
    }
    else{
        post = await Posts.find();
    }

    res.status(200).render('index', {
        title: 'Home', 
        allPosts: post
    });
}

exports.login = async (req, res, next)=>{
    res.status(200).render('login', {
        title: 'Login'
    });
};

exports.signup = async(req, res, next)=>{
    res.status(200).render('signup', {
        title: 'Sign Up'
    });
};

exports.myUploads = async(req, res, next)=>{
    const currentUser =  req.currentUserId;
    // console.log(currentUser);
    const post = await Posts.find({uploadedByUserId:currentUser._id});

    res.status(200).render('myUploads', {
        title: 'My Uploads',
        posts: post
    });
};