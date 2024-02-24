const express = require("express")
const router = express.Router()

const UserService = require('./TestUserService')
const AuthenticationService = require('../authentication/AuthenticationService')

const AktivierungService = require('../activationsLink/ActivationLinkService')

router.get('/', AuthenticationService.isAuthenticated, async (req, res) => {
  try {
    if (req) {
      const users = await UserService.getUsers();
      const resultUsers = users.map(function (item) {
        return {
          "userID": item.userID,
          "firstName": item.firstName,
          "lastName": item.lastName,
          "email": item.email,
          "activationLinkEnding": item.activationLinkEnding,
          "isVerified": item.isVerified,
          "isAdministrator": item.isAdministrator
        }
      })
      res.status(200).json(Object.values(resultUsers));
    }
  } catch (err) {
  }
});

router.get('/:userID', AuthenticationService.isAuthenticated, async (req, res) => {
  if ((req.isAdministrator === false && req.userID === req.params.userID) || req.isAdministrator === true) {
    try {
      const userID = req.params.userID;
      const user = await UserService.findUser(userID)
      if (user) {
        res.status(200).json({
          "userID": user.userID, "firstName": user.firstName, "lastName": user.lastName, "email": user.email,
          "isAdministrator": user.isAdministrator
        });
      } else {
        res.status(404).json({ "Error": "User mit dem userID " + userID + " wurde nicht gefunden!" })
      }
    } catch {
    }
  } else {
    res.status(401).json({ "Error": "Nicht Authorized" })
  }
});

router.post('/', async (req, res) => {
  const userID = req.body.userID;
  try {
    if (req) {
      const linkEnding = AktivierungService.randomString()
      const user = await UserService.createUser(req.body, linkEnding);
      if (user) {
        const activationLink = "https://localhost/api/activation/" + linkEnding;
        await AktivierungService.sendActivationslink(req.body.email, activationLink)
        res.status(201).json({
          "userID": user.userID, "firstName": user.firstName, "lastName": user.lastName, "email": user.email,
          "isAdministrator": user.isAdministrator, "Success": "Ein Aktivierungslink wurde zu " + user.email + " geschickt!"
        });
      }
    }
  } catch (err) {
    if (userID && req.body.email) {
      if (err.message === "No Email") {
        res.status(400).json({ "Error": "Ein Account mit der Email existiert schon!" })
      } else if (err.message === "No UserID") {
        res.status(400).json({ "Error": "UserID existiert schon!" })
      }
    }
    else if (userID) {
      if (!req.body.email) {
        res.status(400).json({ "Error": "email fehlt!" })
      }
      if (!req.body.password) {
        res.status(400).json({ "Error": "password fehlt!" })
      } else {
        res.status(400).json({ "Error": "userID existiert schon, bitte benutzen Sie einen anderen userID!" })
      }
    } else {
      res.status(400).json({ "Error": "userID fehlt!" })
    }
  }
});

router.put('/:userID', AuthenticationService.isAuthenticated, async (req, res) => {
  if (req) {
    if (req.isAdministrator === false && req.userID === req.params.userID) {
      try {
        const userID = req.params.userID
        const user = await UserService.updateSelfUser(userID, req.body)
        console.log(user)
        if (user) {
          res.status(200).json({
            "userID": user.userID, "firstName": user.firstName, "lastName": user.lastName, "email": user.email,
            "isAdministrator": user.isAdministrator
          });
        }
      } catch (err) {
        res.status(401).json({ "Error": "UserID oder isAdministrator dürfen nicht aktualisiert werden!" })
      }
    } else {
      try {
        if (req.isAdministrator === true) {
          const userID = req.params.userID
          const user = await UserService.updateUser(userID, req.body)
          if (user) {
            res.status(200).json({
              "userID": user.userID,
              "firstName": user.firstName,
              "lastName": user.lastName,
              "email": user.email,
              "activationLinkEnding": user.activationLinkEnding,
              "isVerified": user.isVerified,
              "isAdministrator": user.isAdministrator
            });
          } else {
            res.status(404).json({ "Error": "User mit dem userID " + userID + " wurde nicht gefunden!" })
          }
        } else {
          res.status(401).json({ "Error": "Nicht Authorized!" })
        }
      } catch (err) {
        res.status(401).json({ "Error": "Nicht Authorized" })
      }
    }
  }
});

router.delete('/:userID', AuthenticationService.isAuthenticated, async (req, res) => {
  try {
    if (req) {
      if (req.isAdministrator === true) {
        const userID = req.params.userID
        const deletedUser = await UserService.deleteUser(userID)
        if (deletedUser) {
          res.status(204).json()
        } else {
          res.status(404).json({ "Error": "User mit dem userID " + userID + " nicht gefunden!" })
        }
      } else {
        res.status(401).json({ "Error": "Nur Administrator darf User löschen!" })
      }
    }
  } catch (err) {
  }
});

module.exports = router;