const express = require('express')
const router = express.Router()

const DegreeCourseService = require('./DegreeCourseService')
const DegreeCourseApplicationService = require('../degreeCourseApplication/DegreeCourseApplicationService')
const AuthenticationService = require('../authentication/AuthenticationService')


router.get('/', async (req, res) => {
    try {
        if (req) {
            const universityShortName = req.query.universityShortName
            if (universityShortName) {
                const courses = await DegreeCourseService.findDegreeCoursesByShortName(universityShortName)
                const coursesData = courses.map(function (item) {
                    return {
                        "id": item.id,
                        "name": item.name,
                        "shortName": item.shortName,
                        "universityName": item.universityName,
                        "universityShortName": item.universityShortName,
                        "departmentName": item.departmentName,
                        "departmentShortName": item.departmentShortName
                    }
                })
                res.status(200).json(Object.values(coursesData))
            } else {
                const courses = await DegreeCourseService.getAllDegreeCourses()
                const coursesData = courses.map(function (item) {
                    return {
                        "id": item.id,
                        "name": item.name,
                        "shortName": item.shortName,
                        "universityName": item.universityName,
                        "universityShortName": item.universityShortName,
                        "departmentName": item.departmentName,
                        "departmentShortName": item.departmentShortName
                    }
                })
                res.status(200).json(Object.values(coursesData))
            }
        }
    } catch (err) {
    }
})

router.get('/:degreeCourseID/degreeCourseApplications', AuthenticationService.isAuthenticatedVerify, async (req, res) => {
    try {
        if (req) {
            if (req.isAdministrator) {
                const id = req.params.degreeCourseID
                const applications = await DegreeCourseApplicationService.findApplicationBydegreeCourseID(id)
                if (id) {
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
                } else {
                    res.status(404).json({ "Error": "DegreeCourse mit dem ID " + id + " wurde nicht gefunden!" })
                }
            } else {
                res.status(401).json({ "Error": "Not Authorized" });
            }
        }
    } catch (err) {
    }
})

router.get('/:degreeCourseID', async (req, res) => {
    try {
        if (req) {
            const id = req.params.degreeCourseID
            const course = await DegreeCourseService.findDegreeCourseByID(id)
            if (course) {
                res.status(200).json({
                    "id": course.id,
                    "name": course.name,
                    "shortName": course.shortName,
                    "universityName": course.universityName,
                    "universityShortName": course.universityShortName,
                    "departmentName": course.departmentName,
                    "departmentShortName": course.departmentShortName
                })
            } else {
                res.status(404).json({ "Error": "DegreeCourse mit dem ID " + id + " wurde nicht gefunden!" })
            }
        }
    } catch (err) {
    }
})

router.post('/', AuthenticationService.isAuthenticated, async (req, res) => {
    try {
        if (req) {
            const course = await DegreeCourseService.createDegreeCourse(req.body)
            res.status(200).json({
                "id": course.id,
                "name": course.name,
                "shortName": course.shortName,
                "universityName": course.universityName,
                "universityShortName": course.universityShortName,
                "departmentName": course.departmentName,
                "departmentShortName": course.departmentShortName
            })
        }
    } catch (err) {
    }
})

router.put('/:degreeCourseID', AuthenticationService.isAuthenticated, async (req, res) => {
    try {
        if (req) {
            const degreeCourseID = req.params.degreeCourseID
            const course = await DegreeCourseService.updateDegreeCourse(degreeCourseID, req.body)
            if (course) {
                res.status(200).json({
                    "id": course.id,
                    "name": course.name,
                    "shortName": course.shortName,
                    "universityName": course.universityName,
                    "universityShortName": course.universityShortName,
                    "departmentName": course.departmentName,
                    "departmentShortName": course.departmentShortName
                })
            } else {
                res.status(404).json({ "Error": "DegreeCourse mit dem DegreeCourseID " + course + " wurde nicht gefunden!" })
            }
        }
    } catch (err) {
    }
});

router.delete('/:degreeCourseID', AuthenticationService.isAuthenticated, async (req, res) => {
    try {
        if (req) {
            const degreeCourseID = req.params.degreeCourseID
            const degreeCourse = await DegreeCourseService.deleteDegreeCourse(degreeCourseID)
            if (degreeCourse) {
                res.status(204).json()
            } else {
                res.status(404).json({ "Error": "DegreeCourse mit dem DegreeCourseID " + degreeCourseID + " nicht gefunden!" })
            }
        }
    } catch (err) {
    }
});

module.exports = router;