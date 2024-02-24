const mongoose = require("mongoose")

const degreeCourseApplication = mongoose.Schema({
    applicantUserID: String,
    degreeCourseID: String,
    targetPeriodYear: Number,
    targetPeriodShortName: String
})

const DegreeCourseApplication = mongoose.model('DegreeCourseApplication', degreeCourseApplication);

module.exports = DegreeCourseApplication;