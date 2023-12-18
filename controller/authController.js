const User = require("./../model/userModel.js");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
  
    res.cookie('jwt', token, cookieOptions);
  
    // Remove password from output
    user.password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
    });
};

exports.signup = async (req, res, next) =>{
    const email = req.body.email;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({status: 'err',message:"error checking user"});
    }

    if(existingUser){
      return res.status(400).json({
        status: "UAE",
        message: "User already exists with the given email id"
      });
    }

    try {       
        //create new user
        // const Newpassword = req.body.password;
        // const hashedPassword = await bcrypt.hash(Newpassword, 10);

        const password = req.body.password;
        const {name, email} = req.body;
        const newUser = new User({
            name: name,
            email: email,
            password: password
        });
    
        //save user and respond
        const user = await newUser.save();
        // res.status(200).json(user);
        createSendToken(user, 200, res);
      } 
      catch (err) {
        res.status(500).json(err);
      }
};

exports.login = async (req, res, next) => {
    // const { email, password } = req.body;
    const email = req.body.email;
    const password = req.body.password;
  
    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(401).json({message: "Please provide username and password"});
    }

    // 2) Check if user exists 
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"error checking user"});
    }

    if(!existingUser){
        return res.status(404).json({
          status: "UDN",
          message: "User does not exists with the given email id"
        });
        // return res.status(404).json({message: "UDN"});
    }

    // 3) Check if password is correct
    // const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    const isPasswordCorrect = (password === existingUser.password)? true : false;
    if(!isPasswordCorrect){
      return res.status(400).json({message:"The password is incorrect"});
    }
  
    // 3) If everything ok, send token to client
    createSendToken(existingUser, 200, res);
};

exports.logout = async (req, res) =>{
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 300 + 1000),
    httpOnly: true
  })
  
  res.status(200).json({
    status: 'success',
    message: 'Logged Out Successfully'
  })
}

//checking if user is logged in or not
exports.isLoggedIn = async (req, res, next) =>{
  // if (req.cookies.jwt) 
  if (req.headers.cookie) 
  {
    try {
      const jwtToken = req.headers.cookie.split('=')[1];
      const decoded =  jwt.verify(jwtToken, process.env.JWT_SECRET);

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      // console.log(currentUser);
      // console.log(currentUser._id);
      if (!currentUser) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      // console.log(res.locals.user._id);
      return next();
    } 
    catch (err) {
      return next();
    }
  }
  next();
};