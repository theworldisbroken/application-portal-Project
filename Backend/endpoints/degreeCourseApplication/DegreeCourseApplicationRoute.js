const express = require('express')
const router = express.Router()

const DegreeCourseApplicationService = require('./DegreeCourseApplicationService')
const DegreeCourseService = require("../degreeCourse/DegreeCourseService")
const AuthenticationService = require('../authentication/AuthenticationService')

router.get('/', AuthenticationService.isAuthenticatedVerify, async (req, res) => {
    try {
        if (req) {
            if (req.query.applicantUserID) {
                if (req.isAdministrator) {
                    const applications = await DegreeCourseApplicationService.findApplicationByuserID(req.query.applicantUserID)
                    const applicationsData = applications.map(function (item) {
                        return {
                            "id": item.id,
                            "applicantUserID": item.applicantUserID,
                            "degreeCourseID": item.degreeCourseID,
                            "targetPeriodYear": item.targetPeriodYear,
                            "targetPeriodShortName": item.targetPeriodShortName,
                        }
                    })
                    res.status(200).json(Object.values(applicationsData))
                } else {
                    res.status(401).json({ "Error": "Not Authorized" });
                }
            } else if (req.query.degreeCourseID) {
                if (req.isAdministrator) {
                    const applications = await DegreeCourseApplicationService.findApplicationBydegreeCourseID(req.query.degreeCourseID)
                    const applicationsData = applications.map(function (item) {
                        return {
                            "id": item.id,
                            "applicantUserID": item.applicantUserID,
                            "degreeCourseID": item.degreeCourseID,
                            "targetPeriodYear": item.targetPeriodYear,
                            "targetPeriodShortName": item.targetPeriodShortName,
                        }
                    })
                    res.status(200).json(Object.values(applicationsData))
                } else {
                    res.status(401).json({ "Error": "Not Authorized" });
                }
            } else {
                if (req.isAdministrator) {
                    const applications = await DegreeCourseApplicationService.getAllApplications()
                    const applicationsData = applications.map(function (item) {
                        return {
                            "id": item.id,
                            "applicantUserID": item.applicantUserID,
                            "degreeCourseID": item.degreeCourseID,
                            "targetPeriodYear": item.targetPeriodYear,
                            "targetPeriodShortName": item.targetPeriodShortName,
                        }
                    })
                    res.status(200).json(Object.values(applicationsData))
                } else {
                    res.status(401).json({ "Error": "Not Authorized" });
                }
            }
        }
    } catch (err) {
    }
})

router.get('/myApplications', AuthenticationService.isAuthenticatedVerify, async (req, res) => {
    try {
        if (req) {
            const applications = await DegreeCourseApplicationService.findApplicationByuserID(req.userID)
            if (applications) {
                const applicationsData = applications.map(function (item) {
                    return {
                        "id": item.id,
                        "applicantUserID": item.applicantUserID,
                        "degreeCourseID": item.degreeCourseID,
                        "targetPeriodYear": item.targetPeriodYear,
                        "targetPeriodShortName": item.targetPeriodShortName,
                    }
                })
                res.status(200).json(Object.values(applicationsData))
            }
        }
    } catch (err) {
    }
})

router.get('/:applicationID', AuthenticationService.isAuthenticatedVerify, async (req, res) => {
    try {
        if (req) {
            if (req.isAdministrator) {
                const applicationID = req.params.applicationID
                const application = await DegreeCourseApplicationService.findApplicationByID(applicationID)
                if (application) {
                    res.status(200).json({
                        "id": application.id,
                        "applicantUserID": application.applicantUserID,
                        "degreeCourseID": application.degreeCourseID,
                        "targetPeriodYear": application.targetPeriodYear,
                        "targetPeriodShortName": application.targetPeriodShortName,
                    })
                } else {
                    res.status(404).json({ "Error": "Application mit dem applicantUserID " + applicationID + " wurde nicht gefunden!" })
                }
            } else {
                const applicationID = req.params.applicationID
                const application = await DegreeCourseApplicationService.findApplicationByID(applicationID)
                if (application) {
                    if (application.applicantUserID === req.userID) {
                        res.status(200).json({
                            "id": application.id,
                            "applicantUserID": application.applicantUserID,
                            "degreeCourseID": application.degreeCourseID,
                            "targetPeriodYear": application.targetPeriodYear,
                            "targetPeriodShortName": application.targetPeriodShortName,
                        })
                    } else {
                        res.status(401).json({ "Error": "Not Authorized" });
                    }
                } else {
                    res.status(404).json({ "Error": "Application mit dem applicantUserID " + applicationID + " wurde nicht gefunden!" })
                }
            }
        }
    } catch (err) {
    }
})


router.post('/', AuthenticationService.isAuthenticatedVerify, async (req, res) => {
    try {
        if (req) {
            if (req.isAdministrator === false) {
                const application = await DegreeCourseApplicationService.createApplication({
                    "applicantUserID": req.userID,
                    "degreeCourseID": req.body.degreeCourseID,
                    "targetPeriodYear": req.body.targetPeriodYear,
                    "targetPeriodShortName": req.body.targetPeriodShortName
                })
                res.status(200).json({
                    "id": application.id,
                    "applicantUserID": application.applicantUserID,
                    "degreeCourseID": application.degreeCourseID,
                    "targetPeriodYear": application.targetPeriodYear,
                    "targetPeriodShortName": application.targetPeriodShortName,
                })
            } else {
                if (req.body.degreeCourseID) {
                    const application = await DegreeCourseApplicationService.createApplication(req.body)
                    res.status(200).json({
                        "id": application.id,
                        "applicantUserID": application.applicantUserID,
                        "degreeCourseID": application.degreeCourseID,
                        "targetPeriodYear": application.targetPeriodYear,
                        "targetPeriodShortName": application.targetPeriodShortName,
                    })
                } else {
                    const application = await DegreeCourseApplicationService.createApplication({
                        "applicantUserID": req.userID,
                        "degreeCourseID": req.body.degreeCourseID,
                        "targetPeriodYear": req.body.targetPeriodYear,
                        "targetPeriodShortName": req.body.targetPeriodShortName
                    })
                    res.status(200).json({
                        "id": application.id,
                        "applicantUserID": application.applicantUserID,
                        "degreeCourseID": application.degreeCourseID,
                        "targetPeriodYear": application.targetPeriodYear,
                        "targetPeriodShortName": application.targetPeriodShortName,
                    })
                }
            }
        }
    } catch (err) {
        if (err.message === "Bewerbung") {
            res.status(400).json({ "Error": "Sie haben sich schon für diesen Studiengang beworben!" });
        } else if (err.message === "Cast to ObjectId failed for value \"" + req.body.degreeCourseID + "\" (type string) at path \"_id\" for model \"DegreeCourse\"") {
            res.status(404).json({ "Error": "DegreeCourseID existiert nicht!" });
        }
    }
})

router.put('/:applicationID', AuthenticationService.isAuthenticatedVerify, async (req, res) => {
    try {
        if (req) {
            if (req.isAdministrator) {
                const applicationID = req.params.applicationID
                const application = await DegreeCourseApplicationService.updateApplication(applicationID, req.body)
                if (application) {
                    res.status(200).json({
                        "id": application.id,
                        "applicantUserID": application.applicantUserID,
                        "degreeCourseID": application.degreeCourseID,
                        "targetPeriodYear": application.targetPeriodYear,
                        "targetPeriodShortName": application.targetPeriodShortName,
                    })
                } else {
                    res.status(404).json({ "Error": "Application mit dem Application " + applicationID + " wurde nicht gefunden!" })
                }
            } else {
                const applicationID = req.params.applicationID
                const degreeCourse = await DegreeCourseApplicationService.findApplicationByID(applicationID)
                if (degreeCourse && degreeCourse.applicantUserID === req.userID) {
                    const application = await DegreeCourseApplicationService.updateApplication(applicationID, req.body)
                    if (application) {
                        res.status(200).json({
                            "id": application.id,
                            "applicantUserID": application.applicantUserID,
                            "degreeCourseID": application.degreeCourseID,
                            "targetPeriodYear": application.targetPeriodYear,
                            "targetPeriodShortName": application.targetPeriodShortName,
                        })
                    } else {
                        res.status(404).json({ "Error": "Application mit dem Application " + applicationID + " wurde nicht gefunden!" })
                    }
                } else {
                    res.status(401).json({ "Error": "Not Authorized" });
                }
            }
        }
    } catch (err) {
    }
});

router.delete('/:applicationID', AuthenticationService.isAuthenticatedVerify, async (req, res) => {
    try {
        if (req) {
            if (req.isAdministrator) {
                const applicationID = req.params.applicationID
                const degreeCourse = await DegreeCourseApplicationService.deleteApplication(applicationID)
                if (degreeCourse) {
                    res.status(204).json()
                } else {
                    res.status(404).json({ "Error": "ApplicationID mit dem ApplicationID " + applicationID + " nicht gefunden!" })
                }
            } else {
                const applicationID = req.params.applicationID
                const degreeCourse = await DegreeCourseApplicationService.findApplicationByID(applicationID)
                if (degreeCourse) {
                    if (degreeCourse.applicantUserID === req.userID) {
                        const degreeCourseDelete = await DegreeCourseApplicationService.deleteApplication(applicationID)
                        if (degreeCourseDelete) {
                            res.status(204).json()
                        } else {
                            res.status(404).json({ "Error": "ApplicationID mit dem ApplicationID " + applicationID + " nicht gefunden!" })
                        }
                    } else {
                        res.status(401).json({ "Error": "Not Authorized" });
                    }
                } else {
                    res.status(404).json({ "Error": "Kein DegreeCourseApplication mit der ApplicationID " + req.params.applicationID + " gefunden!" });
                }
            }
        }
    } catch (err) {
    }
});

module.exports = router;