export const DEGREECOURSE_PENDING = 'DEGREECOURSE_PENDING'
export const DEGREECOURSES_SUCCESS = 'DEGREECOURSES_SUCCESS'
export const DEGREECOURSE_ERROR = 'DEGREECOURSE_ERROR'
export const DEGREECOURSE_ADD_SUCCESS = 'DEGREECOURSE_ADD_SUCCESS'
export const DEGREECOURSE_ADD_ERROR = 'DEGREECOURSE_ADD_ERROR'
export const DEGREECOURSE_EDIT_SUCCESS = 'DEGREECOURSE_EDIT_SUCCESS'
export const DEGREECOURSE_EDIT_ERROR = 'DEGREECOURSE_EDIT_ERROR'
export const DEGREECOURSE_DELETE_SUCCESS = 'DEGREECOURSE_DELETE_SUCCESS'
export const DEGREECOURSE_DELETE_ERROR = 'DEGREECOURSE_DELETE_ERROR'
export const DEGREECOURSEAPPLICATION_ADD_SUCCESS = 'DEGREECOURSEAPPLICATION_ADD_SUCCESS'
export const DEGREECOURSEAPPLICATION_ADD_ERROR  = 'DEGREECOURSEAPPLICATION_ADD_ERROR'

export const SHOW_ADD_DEGREECOURSE = 'SHOW_ADD_DEGREECOURSE';
export const HIDE_ADD_DEGREECOURSE = 'HIDE_ADD_DEGREECOURSE';
export const SHOW_DEGREECOURSE_DELETE_DIALOG = 'SHOW_DEGREECOURSE_DELETE_DIALOG';
export const HIDE_DEGREECOURSE_DELETE_DIALOG = 'HIDE_DEGREECOURSE_DELETE_DIALOG';
export const SHOW_EDIT_DEGREECOURSE = 'SHOW_EDIT_DEGREECOURSE';
export const HIDE_EDIT_DEGREECOURSE = 'HIDE_EDIT_DEGREECOURSE';
export const SHOW_ADD_DEGREECOURSEAPPLICATION = 'SHOW_ADD_DEGREECOURSEAPPLICATION';
export const HIDE_ADD_DEGREECOURSEAPPLICATION = 'HIDE_ADD_DEGREECOURSEAPPLICATION';

export function getDegreeCoursePending() {
    return {
        type: DEGREECOURSE_PENDING
    }
}

export function getDegreeCourseSuccess(data) {
    return {
        type: DEGREECOURSES_SUCCESS,
        degreeCourses: data.degreeCourses
    }
}
export function getDegreeCourseError(error) {
    return {
        type: DEGREECOURSE_ERROR,
        error: error
    }
}
export function getDegreeCourseAddSuccess() {
    return {
        type: DEGREECOURSE_ADD_SUCCESS
    }
}
export function getDegreeCourseAddError(error) {
    return {
        type: DEGREECOURSE_ADD_ERROR,
        error: error
    }
}
export function getDegreeCourseEditSuccess() {
    return {
        type: DEGREECOURSE_EDIT_SUCCESS
    }
}
export function getDegreeCourseEditError(error) {
    return {
        type: DEGREECOURSE_EDIT_ERROR,
        error: error
    }
}
export function getDegreeCourseDeleteSuccess() {
    return {
        type: DEGREECOURSE_DELETE_SUCCESS
    }
}
export function getDegreeCourseDeleteError(error) {
    return {
        type: DEGREECOURSE_DELETE_ERROR,
        error: error
    }
}
export function getDegreeCourseApplicationAddSuccess() {
    return {
        type: DEGREECOURSEAPPLICATION_ADD_SUCCESS
    }
}
export function getDegreeCourseApplicationAddError(error) {
    return {
        type: DEGREECOURSEAPPLICATION_ADD_ERROR,
        error: error
    }
}

export function getAllDegreeCourses(token) {
    return (dispatch) => {
        dispatch(getDegreeCoursePending())
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        };

        return fetch(process.env.REACT_APP_REST + '/degreecourses', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.text();
            })
            .then((text) => {
                const data = text && JSON.parse(text);
                let degreeCourseArray = {
                    degreeCourses: data
                }
                dispatch(getDegreeCourseSuccess(degreeCourseArray));
            })
            .catch((err) => {
                dispatch(getDegreeCourseError(err));
            });
    };
};

export function addDegreeCourse(token, degreeCourseInfo) {
    return (dispatch) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(degreeCourseInfo)
        };
        return fetch(process.env.REACT_APP_REST + '/degreeCourses', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.text();
            })
            .then(() => {
                dispatch(getDegreeCourseAddSuccess());
            })
            .catch((err) => {
                dispatch(getDegreeCourseAddError(err));
            });
    };
};

export function deleteDegreeCourse(token, degreeCourseID) {
    return (dispatch) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        };
        return fetch(process.env.REACT_APP_REST + '/degreeCourses/' + degreeCourseID, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.text();
            })
            .then(() => {
                dispatch(getDegreeCourseDeleteSuccess());
            })
            .catch((err) => {
                dispatch(getDegreeCourseDeleteError(err));
            });
    };
};

export function editeDegreeCourse(token, degreeCourseInfo, degreeCourseID) {
    return (dispatch) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(degreeCourseInfo)
        };
        return fetch(process.env.REACT_APP_REST + '/degreeCourses/' + degreeCourseID, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.text();
            })
            .then(() => {
                dispatch(getDegreeCourseEditSuccess());
            })
            .catch((err) => {
                dispatch(getDegreeCourseEditSuccess(err));
            });
    };
};


export function addDegreeCourseApplication(token, degreeCourseApplicationInfo) {
    return (dispatch) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(degreeCourseApplicationInfo)
        };
        return fetch(process.env.REACT_APP_REST + '/degreeCourseApplications', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.text();
            })
            .then(() => {
                dispatch(getDegreeCourseApplicationAddSuccess());
            })
            .catch((err) => {
                dispatch(getDegreeCourseApplicationAddError(err));
            });
    };
};