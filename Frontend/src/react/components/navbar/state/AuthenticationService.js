import * as authenticationActions from './AuthenticationActions'

function showDialog() {
    return dispatch => {
        dispatch(authenticationActions.getShowLoginDialogAction());
    };
}

function closeDialog() {
    return dispatch => {
        dispatch(authenticationActions.getCloseLoginDialogAction());
    };
}

function submitAuthentication(userID, password) {
    return dispatch => {
        dispatch(authenticationActions.authenticateUser(userID, password));
    };
}

function logoutAction() {
    return dispatch => {
        dispatch(authenticationActions.getLogoutAction());
    };
}

export {
    showDialog,
    closeDialog,
    submitAuthentication,
    logoutAction, 
}