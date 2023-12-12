const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 30
    },
    tags:[String],
    likes:{
        type: [String],
        default: []
    },
    description:{
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Post", postSchema);