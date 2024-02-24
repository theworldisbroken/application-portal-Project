import * as UserActions from './UserActions'

function getUsers(token) {
    return dispatch => {
        dispatch(UserActions.getAllUsers(token));
    };
}

function deleteUser(token, userID) {
    return dispatch => {
        dispatch(UserActions.deleteUser(token,userID));
    };
}

function addUser(token, userInfo) {
    return dispatch => {
        dispatch(UserActions.addUser(token,userInfo));
    };
}

function editUser(token, userInfo, userID) {
    return dispatch => {
        dispatch(UserActions.editeUser(token,userInfo, userID));
    };
}

export {
    getUsers,
    addUser,
    deleteUser,
    editUser
}