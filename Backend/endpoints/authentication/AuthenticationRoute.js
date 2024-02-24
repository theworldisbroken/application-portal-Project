const express = require('express')
const router = express.Router();

const authenticationService = require('./AuthenticationService')

router.get('/', async function (req, res) {
    const authorization = req.headers.authorization
    if (authorization) {
        try {
            const { token, user } = await authenticationService.createTokenFromHeader(authorization);
            if (user) {
                if (token) {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.header("Access-Control-Allow-Credentials", "*");
                    res.header("Access-Control-Expose-Headers", "*");
                    res.header("Authorization", "Bearer " + token);
                    res.status(200).json({ "Success": "Token wude erfolgreich erstellt!" });
                }
            } else {
                res.status(401).json({ "Error": "Authentication ist fehlgeschlagen! Token kann nicht erstellt werden!" });
            }
        } catch (err) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Expose-Headers", "Authorization");
            res.status(401).json({ "Error": "Authetication ist fehlgeschlagen! Token kann nicht erstellt werden!" });
        }
    }
});

router.post('/', async (req, res) => {
    try {
        const { token, user } = await authenticationService.createToken(req.body);
        if (user) {
            if (token) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Credentials", "*");
                res.header("Access-Control-Expose-Headers", "*");
                res.header("Authorization", "Bearer " + token);
                res.status(200).json({ "Success": "Token wude erfolgreich erstellt!" });
            }
        } else {
            res.status(401).json({ "Error": "Authentication ist fehlgeschlagen! Token kann nicht erstellt werden!" });
        }
    } catch (err) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Expose-Headers", "Authorization");
        res.status(401).json({ "Error": "Authentication ist fehlgeschlagen! Token kann nicht erstellt werden!" });
    }
});

module.exports = router;