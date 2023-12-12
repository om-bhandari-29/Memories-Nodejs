const Posts = require('./../model/imageModel.js');

exports.index = async(req, res, next)=>{
    const post = await Posts.find();

    res.status(200).render('index', {
        title: 'Home', 
        allPosts: post
    });
};

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