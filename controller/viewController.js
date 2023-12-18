const Posts = require('./../model/imageModel.js');

exports.index = async(req, res) => {
    let post;
    try{
        if(req.query.searchPost){
            post = await Posts.find({imageName: { $regex: req.query.searchPost, $options: 'i'}});
            // post = await Posts.find({imageName: { $regex: req.query.searchPost, $options: 'i'}}).sort({_id: -1});
            //regex and options is used for case insensitive query
        }
        else{
            post = await Posts.find();
            // post = await Posts.find().sort({_id: -1});
        }

        res.status(200).render('index', {
            title: 'Home', 
            allPosts: post
        });
    }
    catch(err){
        res.status(400).json({
            status: "Error Occured",
            message: "Error at viewController.js, index function"
        })
    }
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

exports.myUploads = async(req, res)=>{
    try{
        const currentUser =  req.currentUserId;
        // console.log(currentUser);
        const post = await Posts.find({uploadedByUserId:currentUser._id});

        res.status(200).render('myUploads', {
            title: 'My Uploads',
            posts: post
        });
    }
    catch(err){
        res.status(400).json({
            status: "Error Occured",
            message: "Error at viewController.js, myUploads function"
        })
    }
};

exports.getPost = async(req, res) => {
    try{
        // console.log(req.params.id);
        const post = await Posts.findById(req.params.id);
        // console.log(post);

        res.status(200).render('postDetails', {
            title: 'My Uploads',
            post: post
        });
    }
    catch(err){
        res.status(400).json({
            status: "Error Occured",
            message: "Error at viewController.js, getPost function"
        })
    }
}