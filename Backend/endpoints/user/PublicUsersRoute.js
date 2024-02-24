const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()
const UserService = require('./UserService')


router.use(bodyParser.json())

router.get('/', async (req, res) => {
  try {
    if (req) {
      const users = await UserService.getUsers();
      const resultUsers = users.map(function (item) {
        return {
          "userID": item.userID, "firstName": item.firstName, "lastName": item.lastName,
          "password": item.password, "isAdministrator": item.isAdministrator
        }
      })
      res.status(200).json(Object.values(resultUsers));
    }
  } catch (err) {
  }
});

router.get('/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const user = await UserService.findUser(userID)
    if (user) {
      res.status(200).json({
        "userID": user.userID, "firstName": user.firstName, "lastName": user.lastName,
        "password": user.password, "isAdministrator": user.isAdministrator
      });
    } else {
      res.status(404).json({ "Error": "User mit dem userID " + userID + " wurde nicht gefunden!" })
    }
  } catch {
  }
});

router.post('/', async (req, res) => {
  const userID = req.body.userID;
  try {
    if (req) {
      const user = await UserService.createUser(req.body);
      res.status(201).json({
        "userID": user.userID, "firstName": user.firstName, "lastName": user.lastName,
        "password": user.password, "isAdministrator": user.isAdministrator
      });
    }
  } catch (err) {
    if (userID) {
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

router.put('/:userID', async (req, res) => {
  try {
    if (req) {
      const userID = req.params.userID
      const user = await UserService.updateUser(userID, req.body)
      if (user) {
        res.status(200).json({
          "userID": user.userID, "firstName": user.firstName, "lastName": user.lastName,
          "password": user.password, "isAdministrator": user.isAdministrator
        });
      } else {
        res.status(404).json({ "Error": "User mit dem userID " + userID + " wurde nicht gefunden!" })
      }
    }
  } catch (err) {
  }
});

router.delete('/:userID', async (req, res) => {
  try {
    if (req) {
      const userID = req.params.userID
      const deletedUser = await UserService.deleteUser(userID)
      if (deletedUser) {
        res.status(204).json()
      } else {
        res.status(404).json({ "Error": "User mit dem userID " + userID + " nicht gefunden!" })
      }
    }
  } catch (err) {
  }
});

module.exports = router;