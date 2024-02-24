const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './uploads/' })
const AuthenticationService = require('../authentication/AuthenticationService')
const PictureService = require("./PictureService")
const path = require('path')
const UserService = require('../user/UserService')

let authorizationHeader;

router.get('/', AuthenticationService.isAuthenticatedNoHeader, async (req, res) => {
    authorizationHeader = req.headers.authorization
    res.sendFile(path.join(__dirname + "/upload.html"))
})

router.post('/upload', upload.single('picture'), async (req, res) => {
    try {
        const img = req.file;
        const headerBase64 = authorizationHeader.split(' ')[1]
        const userID = Buffer.from(headerBase64, 'base64').toString().split(':')[0];
        const imgFormat = img.originalname.split('.').pop();
        if (imgFormat === "jpeg" || imgFormat === "jpg" || imgFormat === "png" || imgFormat === "jfif") {
            const picture = await PictureService.createPicture(img.path, img, userID)
            if (picture) {
                await UserService.updateAvatar(userID, picture.id)
                res.status(200).json({ "Success": 'Bild erfolgreich hochgeladen!' });
            }
        } else {
            res.status(400).json({ "Error": 'Bitte Laden Sie Bilder mit den Folgenden Formaten hoch: Jpeg, Jpg, png, jfif' });
        }
    } catch (error) {
    }
});

module.exports = router;