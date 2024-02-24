import * as UserActions from './UserActions'

const initialState = {
    users: [],
    success_Edit: false,
    showDeleteDialog: false,
    showEditUser: false,
    showAddUser: false
}

function UserReducer(state = initialState, action) {
    switch (action.type) {
        case UserActions.USERS_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            }
        case UserActions.USERS_SUCCESS:
            return {
                ...state,
                pending: false,
                users: action.users,
                error: false
            }
        case UserActions.USERS_ERROR:
            return {
                ...state,
                users: [],
                pending: false,
                error: true
            }
        case UserActions.USERS_ADD_SUCCESS:
            return {
                ...state,
                pending: false,
                showAddUser: false,
                error: false
            }
        case UserActions.USERS_ADD_ERROR:
            return {
                ...state,
                pending: false,
                showAddUser: true,
                error: true
            }
        case UserActions.USERS_EDIT_SUCCESS:
            return {
                ...state,
                pending: false,
                success_Edit: true,
                error: false
            }
        case UserActions.USERS_EDIT_ERROR:
            return {
                ...state,
                pending: false,
                error: true
            }
        case UserActions.USERS_DELETE_SUCCESS:
            return {
                ...state,
                pending: false,
                showDeleteDialog: false,
                error: false
            }
        case UserActions.USERS_DELETE_ERROR:
            return {
                ...state,
                pending: false,
                showDeleteDialog: true,
                error: true
            }
        case UserActions.SHOW_ADD_USER:
            return {
                ...state,
                showAddUser: true,
                error: false
            }
        case UserActions.HIDE_ADD_USER:
            return {
                ...state,
                showAddUser: false,
                error: false
            }
        case UserActions.SHOW_EDIT_USER:
            return {
                ...state,
                showEditUser: true,
                user: action.payload,
                error: false
            }
        case UserActions.HIDE_EDIT_USER:
            return {
                ...state,
                showEditUser: false,
                success_Edit: false,
                error: false
            }
        case UserActions.SHOW_DELETE_DIALOG:
            return {
                ...state,
                showDeleteDialog: true,
                userID: action.payload,
                error: false
            }
        case UserActions.HIDE_DELETE_DIALOG:
            return {
                ...state,
                showDeleteDialog: false,
                error: false
            }
        default:
            return state
    }
}

export default UserReducer;