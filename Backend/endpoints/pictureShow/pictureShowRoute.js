const express = require('express')
const router = express.Router()

const AuthenticationService = require('../authentication/AuthenticationService')
const pictureShowService = require('./pictureShowService')

router.get('/', AuthenticationService.isAuthenticatedNoHeader, async (req, res) => {
    try {
        if (req) {
            if (req.isAdministrator) {
                const pics = await pictureShowService.getAllPictures();
                res.status(200).json(Object.values(pics));
            } else {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Expose-Headers", "Authorization");
                res.status(401).json({ "Error": "Not Authorized!" });
            }
        }
    } catch (err) {
    }
});

router.get('/:id', AuthenticationService.isAuthenticatedNoHeader, async (req, res) => {
    if (req) {
        if (req.isAdministrator) {
            try {
                const picture = await pictureShowService.pictureFindByID(req.params.id)
                if (picture) {
                    res.contentType(picture.contentType);
                    res.sendFile(picture.path, { root: "./" });
                } else {
                    res.status(404).json({ "Error": "Kein Bild mit dieser ID gefunden!" })
                }
            } catch (err) {
            }
        } else {
            try {
                const picture = await pictureShowService.pictureFindByID(req.params.id)
                if (picture) {
                    if (req.userID === picture.userID) {
                        res.contentType(picture.contentType);
                        res.sendFile(picture.path, { root: "./" });
                    } else {
                        res.status(401).json({ "Error": "Not Authorized" });
                    }
                } else {
                    res.status(404).json({ "Error": "Kein Bild mit dieser ID gefunden!" })
                }
            } catch (err) {
            }
        }
    }
})

module.exports = router;