import * as DegreeCourseActions from './DegreeCourseActions'

function getAllDegreeCourses(token) {
    return dispatch => {
        dispatch(DegreeCourseActions.getAllDegreeCourses(token));
    };
}

function deleteDegreeCourse(token, degreeCourseID) {
    return dispatch => {
        dispatch(DegreeCourseActions.deleteDegreeCourse(token, degreeCourseID));
    };
}

function addDegreeCourse(token, degreeCourseInfo) {
    return dispatch => {
        dispatch(DegreeCourseActions.addDegreeCourse(token, degreeCourseInfo));
    };
}

function editDegreeCourse(token, degreeCourseInfo, degreeCourseID) {
    return dispatch => {
        dispatch(DegreeCourseActions.editeDegreeCourse(token, degreeCourseInfo, degreeCourseID));
    };
}

function addDegreeCourseApplication(token, degreeCourseInfo) {
    return dispatch => {
        dispatch(DegreeCourseActions.addDegreeCourseApplication(token, degreeCourseInfo));
    };
}

export {
    getAllDegreeCourses,
    addDegreeCourse,
    deleteDegreeCourse,
    editDegreeCourse,
    addDegreeCourseApplication
}