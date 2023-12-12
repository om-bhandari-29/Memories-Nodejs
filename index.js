const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

//user defined
// const userRoute = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const viewRoutes = require("./routes/viewRoutes.js");
const uploadController = require('./controller/uploadController.js');

dotenv.config();
app.use(express.urlencoded({extended: false}));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug'); //to tell express which template engine we are going to use
app.set('views', path.join(__dirname, 'views')); //this line is to tells that, where our view is stored

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log("App running on port 5000");
    // console.log(__dirname);
});

const db = process.env.MONGODB_URL;
mongoose.connect(db, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
}).then(()=>console.log("Database connected successfully")).catch((err)=>console.log(err));


//middleware
app.use(express.json()); //to parse json from body (body parser) and to tell node js that we are using data in json format
app.use(helmet());
app.use(morgan("common"));  //to display request details (like type of request i.e. get, post, put, etc), time taken to process that request, etc to the console

//userdefined
// app.use("/api/users", userRoute);
app.use("/api/auth", authRoutes);
app.use("/", viewRoutes);
app.use("/upload",uploadController.getUser, uploadController.uploadImage, uploadController.updateDatabase);
//uploadController.getUser = using this middleware we are just getting the ID of currently logged in user and putting and ID in our request Object so that we acces it from currently running request response cycle
