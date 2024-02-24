import * as authenticationActions from './AuthenticationActions'

const initialState = {
    user: null,
    pending: false,
    showLoginDialog: false,
    error: false
}

function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case authenticationActions.SHOW_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: true,
                error: false
            }
        case authenticationActions.CLOSE_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: false,
                error: false
            }
        case authenticationActions.AUTHENTICATION_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            }
        case authenticationActions.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                showLoginDialog: false,
                pending: false,
                user: action.user,
                accessToken: action.accessToken,
                isAdministrator: action.isAdministrator
            }
        case authenticationActions.AUTHENTICATION_ERROR:
            return {
                ...state,
                pending: false,
                error: true
            }
        case authenticationActions.LOGOUT:
            return {
                ...state,
                user: null,
                accessToken: null,
            }
        default:
            return state
    }
}

export default authenticationReducer;