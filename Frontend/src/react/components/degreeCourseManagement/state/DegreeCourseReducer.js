import * as DegreeCouseActions from './DegreeCourseActions'

const initialState = {
    degreeCourses: [],
    success_Edit: false,
    showDeleteDialog: false,
    showEditDegreeCourse: false,
    showAddDegreeCourse: false,
    showAddDegreeCourseApplication: false
}

function DegreeCourseReducer(state = initialState, action) {
    switch (action.type) {
        case DegreeCouseActions.DEGREECOURSE_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            }
        case DegreeCouseActions.DEGREECOURSES_SUCCESS:
            return {
                ...state,
                pending: false,
                degreeCourses: action.degreeCourses,
                error: false
            }
        case DegreeCouseActions.DEGREECOURSE_ERROR:
            return {
                ...state,
                degreeCourses: [],
                pending: false,
                error: true
            }
        case DegreeCouseActions.DEGREECOURSE_ADD_SUCCESS:
            return {
                ...state,
                pending: false,
                showAddDegreeCourse: false,
                error: false
            }
        case DegreeCouseActions.DEGREECOURSE_ADD_ERROR:
            return {
                ...state,
                pending: false,
                showAddDegreeCourse: true,
                error: true
            }
        case DegreeCouseActions.DEGREECOURSE_EDIT_SUCCESS:
            return {
                ...state,
                pending: false,
                success_Edit: true,
                error: false
            }
        case DegreeCouseActions.DEGREECOURSE_EDIT_ERROR:
            return {
                ...state,
                pending: false,
                error: true
            }
        case DegreeCouseActions.DEGREECOURSE_DELETE_SUCCESS:
            return {
                ...state,
                pending: false,
                showDeleteDialog: false,
                error: false
            }
        case DegreeCouseActions.DEGREECOURSE_DELETE_ERROR:
            return {
                ...state,
                pending: false,
                showDeleteDialog: true,
                error: true
            }
        case DegreeCouseActions.DEGREECOURSEAPPLICATION_ADD_SUCCESS:
            return {
                ...state,
                showAddDegreeCourseApplication: false,
                error: false
            }
        case DegreeCouseActions.DEGREECOURSEAPPLICATION_ADD_ERROR:
            return {
                ...state,
                showAddDegreeCourseApplication: true,
                error: true
            }
        case DegreeCouseActions.SHOW_ADD_DEGREECOURSE:
            return {
                ...state,
                showAddDegreeCourse: true,
                error: false
            }
        case DegreeCouseActions.HIDE_ADD_DEGREECOURSE:
            return {
                ...state,
                showAddDegreeCourse: false,
                error: false
            }
        case DegreeCouseActions.SHOW_EDIT_DEGREECOURSE:
            return {
                ...state,
                showEditDegreeCourse: true,
                degreeCourse: action.payload,
                error: false
            }
        case DegreeCouseActions.HIDE_EDIT_DEGREECOURSE:
            return {
                ...state,
                showEditDegreeCourse: false,
                success_Edit: false,
                error: false
            }
        case DegreeCouseActions.SHOW_DEGREECOURSE_DELETE_DIALOG:
            return {
                ...state,
                showDeleteDialog: true,
                degreeCourse: action.payload,
                error: false
            }
        case DegreeCouseActions.HIDE_DEGREECOURSE_DELETE_DIALOG:
            return {
                ...state,
                showDeleteDialog: false,
                error: false
            }
        case DegreeCouseActions.SHOW_ADD_DEGREECOURSEAPPLICATION:
            return {
                ...state,
                showAddDegreeCourseApplication: true,
                degreeCourse: action.payload,
                error: false
            }
        case DegreeCouseActions.HIDE_ADD_DEGREECOURSEAPPLICATION:
            return {
                ...state,
                showAddDegreeCourseApplication: false,
                error: false
            }
        default:
            return state
    }
}

export default DegreeCourseReducer;