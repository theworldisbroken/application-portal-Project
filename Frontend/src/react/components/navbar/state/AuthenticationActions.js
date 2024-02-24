import jwtDecode from 'jwt-decode'

export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG';
export const CLOSE_LOGIN_DIALOG = 'CLOSE_LOGIN_DIALOG';
export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS'
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'
export const LOGOUT = 'LOGOUT'

export function getShowLoginDialogAction() {
    return {
        type: SHOW_LOGIN_DIALOG
    }
}

export function getCloseLoginDialogAction() {
    return {
        type: CLOSE_LOGIN_DIALOG
    }
}

export function getAuthenticationPendingAction() {
    return {
        type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticationSuccessSAction(userSession) {
    return {
        type: AUTHENTICATION_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken,
        isAdministrator: userSession.isAdministrator
    }
}

export function getAuthenticationErrorgAction(error) {
    return {
        type: AUTHENTICATION_ERROR,
        error: error
    }
}

export function authenticateUser(userID, password) {
    return dispatch => {
        dispatch(getAuthenticationPendingAction());
        login(userID, password)
            .then(
                userSession => {
                    const action = getAuthenticationSuccessSAction(userSession);
                    dispatch(action);
                },
                err => {
                    dispatch(getAuthenticationErrorgAction(err))
                }
            ).catch(err => {
                dispatch(getAuthenticationErrorgAction(err))
            })
    }
}

function login(userID, password) {
    const credentials = btoa(userID + ':' + password);
    const requestOptions = {
        method: 'GET',
        headers: { Authorization: 'Basic ' + credentials }
    };
    return fetch(process.env.REACT_APP_REST + '/authenticate', requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession
        });
}

function handleResponse(response) {
    const authorizationHeader = response.headers.get('Authorization');

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        let token
        if (authorizationHeader) {
            token = authorizationHeader.split(" ")[1];
        }
        if (!response.ok) {
            if (response.status === 401) {
                getLogoutAction();
            }
            const error = { data } || response.statusText;
            return Promise.reject(error)
        } else {
            const decodedToken = jwtDecode(token);
            let userSession = {
                user: data,
                accessToken: token,
                isAdministrator: decodedToken.isAdministrator
            }
            return userSession
        }
    });
}

export function getLogoutAction() {
    return {
        type: LOGOUT
    }
}