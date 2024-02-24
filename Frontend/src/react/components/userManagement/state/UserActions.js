export const USERS_PENDING = 'USERS_PENDING'
export const USERS_SUCCESS = 'USERS_SUCCESS'
export const USERS_ERROR = 'USERS_ERROR'
export const USERS_ADD_SUCCESS = 'USERS_ADD_SUCCESS'
export const USERS_ADD_ERROR = 'USERS_ADD_ERROR'
export const USERS_EDIT_SUCCESS = 'USERS_EDIT_SUCCESS'
export const USERS_EDIT_ERROR = 'USERS_EDIT_ERROR'
export const USERS_DELETE_SUCCESS = 'USERS_DELETE_SUCCESS'
export const USERS_DELETE_ERROR = 'USERS_DELETE_ERROR'

export const SHOW_ADD_USER = 'SHOW_ADD_USER';
export const HIDE_ADD_USER = 'HIDE_ADD_USER';
export const SHOW_DELETE_DIALOG = 'SHOW_DELETE_DIALOG';
export const HIDE_DELETE_DIALOG = 'HIDE_DELETE_DIALOG';
export const SHOW_EDIT_USER = 'SHOW_EDIT_USER';
export const HIDE_EDIT_USER = 'HIDE_EDIT_USER';

export function getUserPending() {
    return {
        type: USERS_PENDING
    }
}

export function getUserSuccess(data) {
    return {
        type: USERS_SUCCESS,
        users: data.users
    }
}
export function getUserError(error) {
    return {
        type: USERS_ERROR,
        error: error
    }
}
export function getUserAddSuccess() {
    return {
        type: USERS_ADD_SUCCESS
    }
}
export function getUserAddError(error) {
    return {
        type: USERS_ADD_ERROR,
        error: error
    }
}
export function getUserEditSuccess() {
    return {
        type: USERS_EDIT_SUCCESS
    }
}
export function getUserEditError(error) {
    return {
        type: USERS_EDIT_ERROR,
        error: error
    }
}
export function getUserDeleteSuccess() {
    return {
        type: USERS_DELETE_SUCCESS
    }
}
export function getUserDeleteError(error) {
    return {
        type: USERS_DELETE_ERROR,
        error: error
    }
}

export function getAllUsers(token) {
    return (dispatch) => {
        dispatch(getUserPending())
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        };
        return fetch(process.env.REACT_APP_REST + '/users', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.text();
            })
            .then((text) => {
                const data = text && JSON.parse(text);
                let userArray = {
                    users: data
                }
                dispatch(getUserSuccess(userArray));
            })
            .catch((err) => {
                dispatch(getUserError(err));
            });
    };
};


export function addUser(token, userInfo) {
    return (dispatch) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        };
        return fetch(process.env.REACT_APP_REST + '/users', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.text();
            })
            .then(() => {
                dispatch(getUserAddSuccess());
            })
            .catch((err) => {
                dispatch(getUserAddError(err));
            });
    };
};


export function deleteUser(token, userID) {
    return (dispatch) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        };
        return fetch(process.env.REACT_APP_REST + '/users/' + userID, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.text();
            })
            .then(() => {
                dispatch(getUserDeleteSuccess());
            })
            .catch((err) => {
                dispatch(getUserDeleteError(err));
            });
    };
};

export function editeUser(token, userInfo, userID) {
    return (dispatch) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        };
        return fetch(process.env.REACT_APP_REST + '/users/' + userID , requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.text();
            })
            .then(() => {
                dispatch(getUserEditSuccess());
            })
            .catch((err) => {
                dispatch(getUserEditSuccess(err));
            });
    };
};
