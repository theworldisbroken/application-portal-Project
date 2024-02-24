const DegreeCourseApplication = require("./DegreeCourseApplicationModel")
const DegreeCourseService = require("../degreeCourse/DegreeCourseService")

async function getAllApplications() {
    return await DegreeCourseApplication.find();
}

async function findApplicationByID(applicationID) {
    if (applicationID) {
        return await DegreeCourseApplication.findOne({ _id: applicationID }).exec();
    }
}

async function findApplicationByuserID(userID) {
    if (userID) {
        return await DegreeCourseApplication.find({ applicantUserID: userID }).exec();
    }
}

async function findApplicationBydegreeCourseID(degreeCourseID) {
    if (degreeCourseID) {
        return await DegreeCourseApplication.find({ degreeCourseID: degreeCourseID }).exec();
    }
}

async function findExistingApplication(bodyData) {
    return await DegreeCourseApplication.findOne({ applicantUserID: bodyData.applicantUserID, degreeCourseID: bodyData.degreeCourseID, targetPeriodYear: bodyData.targetPeriodYear, targetPeriodShortName: bodyData.targetPeriodShortName })
}

async function createApplication(bodyData) {
    if (bodyData) {
        const course = await DegreeCourseService.findDegreeCourseByID(bodyData.degreeCourseID);
        if (course) {
            const existingApplication = await findExistingApplication(bodyData);
            if (!existingApplication) {
                const application = new DegreeCourseApplication(bodyData);
                return await application.save();
            } else {
                throw new Error("Bewerbung");
            }
        }
    }
}

async function updateApplication(applicationID, bodyData) {
    if (applicationID) {
        const body = Object.keys(bodyData);
        const application = await findApplicationByID(applicationID)
        if (application) {
            for (let i of body) {
                application[i] = bodyData[i]
            }
            return await application.save()
        }
    }
}

async function deleteApplication(applicationID) {
    if (applicationID) {
        return await DegreeCourseApplication.findOneAndDelete({ _id: applicationID });
    }
}

module.exports = {
    getAllApplications,
    findApplicationByID,
    findApplicationByuserID,
    findApplicationBydegreeCourseID,
    findExistingApplication,
    createApplication,
    updateApplication,
    deleteApplication
}