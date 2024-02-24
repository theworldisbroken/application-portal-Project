const mongoose = require('mongoose')


const degreeCourseShema = new mongoose.Schema({
    name: String,
    shortName: String,
    universityName: String,
    universityShortName: String,
    departmentName: String,
    departmentShortName: String
});

const DegreeCourse = mongoose.model("DegreeCourse", degreeCourseShema);

module.exports = DegreeCourse;