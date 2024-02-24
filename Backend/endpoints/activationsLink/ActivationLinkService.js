const nodemailer = require('nodemailer');
const config = require('config')
const TestUserModel = require('../activationTestUser/TestUserModel')

//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function randomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

async function sendActivationslink(receiver, link) {
    const transporter = await nodemailer.createTransport({
        service: process.env.NODEMAILER_SERVICE || 'hotmail',
        auth: {
            user: process.env.NODEMAILER_USER || config.nodemailer.user,
            pass: process.env.NODEMAILER_PASS ||config.nodemailer.pass
        }
    });

    const mailInfos = {
        from: process.env.NODEMAILER_USER || config.nodemailer.user,
        to: receiver,
        subject: 'Activation Link!',
        html: `<b>Klicken Sie auf diesen Link für die Aktivierung:</b> <br> <a href="${link}">${link}</a>`
    };

    await transporter.sendMail(mailInfos, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

async function findUser(linkEnding) {
    return await TestUserModel.findOne({ activationLinkEnding: linkEnding });
}

async function updateVerifiedUser(linkEnding) {
    const user = await findUser(linkEnding)
    if (user) {
        user.activationLinkEnding = null
        user.isVerified = true
        return await user.save();
    }
}

module.exports = {
    randomString,
    sendActivationslink,
    findUser,
    updateVerifiedUser
}