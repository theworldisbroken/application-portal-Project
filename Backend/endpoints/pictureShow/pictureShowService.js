const pictureUploadModel = require('../pictureUpload/PictureModel')

async function getAllPictures() {
    return await pictureUploadModel.find();
}

async function pictureFindByID(id) {
    return await pictureUploadModel.findOne({ _id: id })
}

async function pictureFindByuserID(id) {
    return await pictureUploadModel.findOne({ userID: userID })
}

module.exports = {
    getAllPictures,
    pictureFindByID,
    pictureFindByuserID
}