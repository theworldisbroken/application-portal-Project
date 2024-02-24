const UserService = require('../user/UserService')
const jwt = require('jsonwebtoken')
const config = require("config");
const atob = require("atob")

async function createToken(userData) {
    if (userData) {
        try {
            const user = await UserService.findUser(userData.userID);
            if (user) {
                const isMatch = await user.comparePassword(userData.password);
                if (isMatch) {
                    const issuedAt = new Date().getTime();
                    const expirationTime = config.session.timeout;
                    const expresAt = issuedAt + expirationTime * 1000;
                    const privateKey = config.session.tokenKey;
                    const token = jwt.sign(
                        { userID: user.userID, isAdministrator: user.isAdministrator },
                        privateKey,
                        { expiresIn: expresAt, algorithm: "HS256" }
                    );
                    return { token, user };
                }
            } else {
                return { user };
            }
        } catch (err) {
            return null;
        }
    }
}

async function createTokenFromHeader(userData) {
    if (userData) {
        // https://stackoverflow.com/questions/2820249/base64-encoding-and-decoding-in-client-side-javascript
        const baseDecode = atob(userData.split(" ")[1])
        const headerData = baseDecode.split(":")
        const userID = headerData[0]
        const password = headerData[1]
        try {
            const user = await UserService.findUser(userID);
            if (user) {
                const isMatch = await user.comparePassword(password);
                if (isMatch) {
                    const issuedAt = new Date().getTime();
                    const expirationTime = config.session.timeout;
                    const expresAt = issuedAt + expirationTime * 1000;
                    const privateKey = config.session.tokenKey;
                    const token = jwt.sign(
                        { userID: user.userID, isAdministrator: user.isAdministrator },
                        privateKey,
                        { expiresIn: expresAt, algorithm: "HS256" }
                    );
                    return { token, user };
                }
            } else {
                return { user };
            }
        } catch (err) {
            return null;
        }
    }
}

function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        var privateKey = config.session.tokenKey;
        const tokenInfo = jwt.decode(token)
        req.userID = tokenInfo.userID;
        req.isAdministrator = tokenInfo.isAdministrator;
        if (tokenInfo.isAdministrator == true) {
            jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
                if (err) {
                    res.status(401).json({ "Error": "Not Authorized" });
                    return;
                }
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Credentials", "*");
                res.header("Access-Control-Expose-Headers", "*");
                res.header("Authorization", req.headers.authorization);
                return next();
            });
        } else if (tokenInfo.userID == req.params.userID) {
            jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
                if (err) {
                    res.status(401).json({ "Error": "Not Authorized" });
                    return;
                }
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Credentials", "*");
                res.header("Access-Control-Expose-Headers", "*");
                res.header("Authorization", req.headers.authorization);
                return next();
            });
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Expose-Headers", "Authorization");
            res.status(401).json({ "Error": "Not Authorized" });
            return;
        }
    } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Expose-Headers", "Authorization");
        res.status(401).json({ "Error": "Not Authorized" });
        return;
    }
}

function isAuthenticatedVerify(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        var privateKey = config.session.tokenKey;
        const tokenInfo = jwt.decode(token)
        req.userID = tokenInfo.userID;
        req.isAdministrator = tokenInfo.isAdministrator;
        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            if (err) {
                res.status(401).json({ "Error": "Not Authorized" });
                return;
            }
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Credentials", "*");
            res.header("Access-Control-Expose-Headers", "*");
            res.header("Authorization", req.headers.authorization);
            return next();
        });
    } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Expose-Headers", "Authorization");
        res.status(401).json({ "Error": "Not Authorized" });
        return;
    }
}

async function isAuthenticatedNoHeader(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        const baseDecode = atob(req.headers.authorization.split(" ")[1])
        const headerData = baseDecode.split(":")
        const userID = headerData[0]
        const password = headerData[1]
        req.userID = userID
        try {
            const user = await UserService.findUser(userID);
            if (user) {
                const isMatch = await user.comparePassword(password);
                req.isAdministrator = user.isAdministrator
                if (isMatch) {
                    return next()
                } else {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.header("Access-Control-Expose-Headers", "Authorization");
                    res.status(401).json({ "Error": "Authetication ist fehlgeschlagen! Token kann nicht erstellt werden!" });
                }
            } else {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Expose-Headers", "Authorization");
                res.status(401).json({ "Error": "Authetication ist fehlgeschlagen! Token kann nicht erstellt werden!" });
            }
        } catch (err) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Expose-Headers", "Authorization");
            res.status(401).json({ "Error": "Authetication ist fehlgeschlagen! Token kann nicht erstellt werden!" });
        }
    } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-A11ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Expose-Headers", "Authorization");
        res.set('WWW-Authenticate', 'Basic realm="Restricted Area"');
        res.status(401).json({ "Error": "Not Authorized" });
        return;
    }
}

module.exports = {
    isAuthenticatedNoHeader,
    createToken,
    isAuthenticated,
    isAuthenticatedVerify,
    createTokenFromHeader
}