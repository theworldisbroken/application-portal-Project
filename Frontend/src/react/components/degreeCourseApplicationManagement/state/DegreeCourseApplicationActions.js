export const DEGREECOURSEAPPLICATION_PENDING = 'DEGREECOURSEAPPLICATION_PENDING'
export const DEGREECOURSEAPPLICATIONS_SUCCESS = 'DEGREECOURSEAPPLICATIONS_SUCCESS'
export const DEGREECOURSEAPPLICATION_ERROR = 'DEGREECOURSEAPPLICATION_ERROR'
export const DEGREECOURSEAPPLICATION_ADD_SUCCESS = 'DEGREECOURSEAPPLICATION_ADD_SUCCESS'
export const DEGREECOURSEAPPLICATION_ADD_ERROR = 'DEGREECOURSEAPPLICATION_ADD_ERROR'
export const DEGREECOURSEAPPLICATION_EDIT_SUCCESS = 'DEGREECOURSEAPPLICATION_EDIT_SUCCESS'
export const DEGREECOURSEAPPLICATION_EDIT_ERROR = 'DEGREECOURSEAPPLICATION_EDIT_ERROR'
export const DEGREECOURSEAPPLICATION_DELETE_SUCCESS = 'DEGREECOURSEAPPLICATION_DELETE_SUCCESS'
export const DEGREECOURSEAPPLICATION_DELETE_ERROR = 'DEGREECOURSEAPPLICATION_DELETE_ERROR'
export const DEGREECOURSEBYID_SUCCESS = 'DEGREECOURSEBYID_SUCCESS'

export const SHOW_DEGREECOURSEAPPLICATION_DELETE_DIALOG = 'SHOW_DEGREECOURSEAPPLICATION_DELETE_DIALOG';
export const HIDE_DEGREECOURSEAPPLICATION_DELETE_DIALOG = 'HIDE_DEGREECOURSEAPPLICATION_DELETE_DIALOG';
export const SHOW_EDIT_DEGREECOURSEAPPLICATION = 'SHOW_EDIT_DEGREECOURSEAPPLICATION';
export const HIDE_EDIT_DEGREECOURSEAPPLICATION = 'HIDE_EDIT_DEGREECOURSEAPPLICATION';

export function getDegreeCourseApplicationsPending() {
    return {
        type: DEGREECOURSEAPPLICATION_PENDING,
    }
}
export function getDegreeCourseApplicationsSuccess(data) {
    return {
        type: DEGREECOURSEAPPLICATIONS_SUCCESS,
        degreeCourseApplications: data.degreeCourseApplications
    }
}
export function getDegreeCourseApplicationsError(error) {
    return {
        type: DEGREECOURSEAPPLICATION_ERROR,
        error: error
    }
}
export function getDegreeCourseApplicationsAddSuccess() {
    return {
        type: DEGREECOURSEAPPLICATION_ADD_SUCCESS
    }
}
export function getDegreeCourseApplicationsAddError(error) {
    return {
        type: DEGREECOURSEAPPLICATION_ADD_ERROR,
        error: error
    }
}
export function getDegreeCourseApplicationsEditSuccess() {
    return {
        type: DEGREECOURSEAPPLICATION_EDIT_SUCCESS
    }
}
export function getDegreeCourseApplicationsEditError(error) {
    return {
        type: DEGREECOURSEAPPLICATION_EDIT_ERROR,
        error: error
    }
}
export function getDegreeCourseApplicationsDeleteSuccess() {
    return {
        type: DEGREECOURSEAPPLICATION_DELETE_SUCCESS
    }
}
export function getDegreeCourseApplicationsDeleteError(error) {
    return {
        type: DEGREECOURSEAPPLICATION_DELETE_ERROR,
        error: error
    }
}


export function getAllDegreeCourseApplications(token) {
    return (dispatch) => {
        dispatch(getDegreeCourseApplicationsPending())
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        };
        return fetch(process.env.REACT_APP_REST + '/degreeCourseApplications', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.text();
            })
            .then((text) => {
                const data = text && JSON.parse(text);
                let degreeCourseApplicationsArray = {
                    degreeCourseApplications: data
                }
                dispatch(getDegreeCourseApplicationsSuccess(degreeCourseApplicationsArray));
            })
            .catch((err) => {
                dispatch(getDegreeCourseApplicationsError(err));
            });
    };
};

export function getAllPersonalDegreeCourseApplications(token) {
    return (dispatch) => {
        dispatch(getDegreeCourseApplicationsPending())
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        };

        return fetch(process.env.REACT_APP_REST + '/degreeCourseApplications/myApplications', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.text();
            })
            .then((text) => {
                const data = text && JSON.parse(text);
                let degreeCourseApplicationsArray = {
                    degreeCourseApplications: data
                }
                dispatch(getDegreeCourseApplicationsSuccess(degreeCourseApplicationsArray));
            })
            .catch((err) => {
                dispatch(getDegreeCourseApplicationsError(err));
            });
    };
};

export function deleteDegreeCourseApplication(token, degreeCourseApplicationeID) {
    return (dispatch) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        };
        return fetch(process.env.REACT_APP_REST + '/degreeCourseApplications/' + degreeCourseApplicationeID, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.text();
            })
            .then(() => {
                dispatch(getDegreeCourseApplicationsDeleteSuccess());
            })
            .catch((err) => {
                dispatch(getDegreeCourseApplicationsDeleteError(err));
            });
    };
};

export function editDegreeCourseApplication(token, degreeCourseApplicationeInfo, degreeCourseApplicationeID) {
    return (dispatch) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(degreeCourseApplicationeInfo)
        };
        return fetch(process.env.REACT_APP_REST + '/degreeCourseApplications/' + degreeCourseApplicationeID, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.text();
            })
            .then(() => {
                dispatch(getDegreeCourseApplicationsEditSuccess());
            })
            .catch((err) => {
                dispatch(getDegreeCourseApplicationsEditError(err));
            });
    };
};