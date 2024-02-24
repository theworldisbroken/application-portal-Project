const mongoose = require('mongoose')

const pictureSchema = mongoose.Schema({
    filename: String,
    path: String,
    contentType: String,
    userID: String
})

const Picture = mongoose.model('Picture', pictureSchema)

module.exports = Picture;