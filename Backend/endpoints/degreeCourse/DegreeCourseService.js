const DegreeCourse = require("./DegreeCourseModel")

async function getAllDegreeCourses() {
    return await DegreeCourse.find();
}

async function findDegreeCourseByID(courseID) {
    if (courseID) {
        return await DegreeCourse.findOne({ _id: courseID }).exec();
    }
}

async function findDegreeCoursesByShortName(courseName) {
    if (courseName) {
        return await DegreeCourse.find({ universityShortName: courseName }).exec()
    }
}

async function createDegreeCourse(bodyData) {
    if (bodyData) {
        const degreecourse = new DegreeCourse(bodyData);
        return await degreecourse.save()
    }
}

async function updateDegreeCourse(courseID, bodyData) {
    if (courseID) {
        const body = Object.keys(bodyData);
        const course = await findDegreeCourseByID(courseID)
        if (course) {
            for (let i of body) {
                course[i] = bodyData[i]
            }
            return await course.save()
        }
    }
}

async function deleteDegreeCourse(courseID) {
    if (courseID) {
        return await DegreeCourse.findOneAndDelete({ _id: courseID });
    }
}

module.exports = {
    getAllDegreeCourses,
    findDegreeCourseByID,
    findDegreeCoursesByShortName,
    createDegreeCourse,
    updateDegreeCourse,
    deleteDegreeCourse
}