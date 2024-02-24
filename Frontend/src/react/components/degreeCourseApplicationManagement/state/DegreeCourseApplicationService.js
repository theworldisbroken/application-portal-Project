import * as DegreeCourseApplication from './DegreeCourseApplicationActions'

function getAllDegreeCourseApplications(token) {
    return dispatch => {
        dispatch(DegreeCourseApplication.getAllDegreeCourseApplications(token));
    };
}

function getAllPersonalDegreeCourseApplications(token) {
    return dispatch => {
        dispatch(DegreeCourseApplication.getAllPersonalDegreeCourseApplications(token));
    };
}

function deleteDegreeCourseApplication(token, degreeCourseID) {
    return dispatch => {
        dispatch(DegreeCourseApplication.deleteDegreeCourseApplication(token, degreeCourseID));
    };
}

function editDegreeCourseApplication(token, degreeCourseInfo, degreeCourseID) {
    return dispatch => {
        dispatch(DegreeCourseApplication.editDegreeCourseApplication(token, degreeCourseInfo, degreeCourseID));
    };
}

export {
    getAllDegreeCourseApplications,
    deleteDegreeCourseApplication,
    editDegreeCourseApplication,
    getAllPersonalDegreeCourseApplications
}