const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    name: String,
    image: {
        data: Buffer,
        contentType: String
    },
    imageName: String,
    imageDescription: String,
    uploadedBy: String,
    uploadedByUserId: mongoose.Schema.ObjectId
});

module.exports = mongoose.model("Posts", imageSchema);