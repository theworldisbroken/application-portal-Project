const express = require('express')
const database = require("./database/db")
const bodyParser = require('body-parser')
const https = require('https');
const fs = require('fs');

const UserService = require('./endpoints/user/UserService')

const publicUsersRoute = require('./endpoints/user/PublicUsersRoute')
const userRoute = require("./endpoints/user/UserRoute")
const authenticationRoute = require('./endpoints/authentication/AuthenticationRoute')
const degreeCourseRoute = require('./endpoints/degreeCourse/DegreeCourseRoute')
const degreeCourseApplicationRoute = require('./endpoints/degreeCourseApplication/DegreeCourseApplicationRoute')
const pictureUploadRoute = require('./endpoints/pictureUpload/PictureRoute')
const pictureShowRoute = require('./endpoints/pictureShow/pictureShowRoute')
const testUserRoute = require('./endpoints/activationTestUser/TestUserRoute')
const activationRoute = require('./endpoints/activationsLink/ActivationLinkRoute')
const cors = require('cors')

const key = fs.readFileSync('./certificates/keytmp.pem');
const cert = fs.readFileSync('./certificates/cert.pem');

const app = express()

app.use("*", cors())

const server = https.createServer({key: key, cert: cert, passphrase: "1234"}, app);

app.use(bodyParser.json())

app.use('/api/publicUsers', publicUsersRoute)
app.use('/api/users', userRoute)
app.use('/api/authenticate', authenticationRoute)
app.use('/api/degreecourses', degreeCourseRoute)
app.use('/api/degreeCourseApplications', degreeCourseApplicationRoute)
app.use('/api/pictureUpload', pictureUploadRoute)
app.use('/api/pictures', pictureShowRoute)
app.use('/api/testusers', testUserRoute)
app.use('/api/activation', activationRoute)

database.initDb(function (err, db) {
  if (db) {
    UserService.createAdmin();
    console.log("Datenbank Anbindung erfolgreich")
  } else {
    console.log("Anbindung nicht erfolgreich ")
  }
})

app.use(function (req, res){
  res.status(404).json({"Error": "Der Url existiert nicht!"})
})

app.use(function (err, req, res, next){
  res.status(500).json({"Error": "Server wurde durchgebrochen"})
})

const port = 443

server.listen(port, () => {
  console.log(`App listening at localhost:${port}`)
})
app.listen(80, () => {
  console.log(`App listening at localhost:${port}`)
})