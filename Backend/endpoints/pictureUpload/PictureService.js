const Picture = require('./PictureModel')

async function createPicture(picPath, picData, userID) {
    const picture = new Picture({
        filename: picData.filename,
        path: picPath,
        contentType: picData.mimetype,
        userID: userID
    });
    return await picture.save();
}

module.exports = { createPicture }