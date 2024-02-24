import * as DegreeCouseApplicationActions from './DegreeCourseApplicationActions'

const initialState = {
    degreeCourseApplications: [],
    success_Edit: false,
    showDeleteDialog: false,
    showEditDegreeCourse: false,
    showAddDegreeCourse: false,
    showAddDegreeCourseApplication: false
}

function DegreeCourseApplication(state = initialState, action) {
    switch (action.type) {
        case DegreeCouseApplicationActions.DEGREECOURSEAPPLICATIONS_SUCCESS:
            return {
                ...state,
                pending: false,
                degreeCourseApplications: action.degreeCourseApplications,
                error: false
            }
        case DegreeCouseApplicationActions.DEGREECOURSEAPPLICATION_ERROR:
            return {
                ...state,
                degreeCourseApplications: [],
                pending: false,
                error: true
            }
        case DegreeCouseApplicationActions.DEGREECOURSEAPPLICATION_EDIT_SUCCESS:
            return {
                ...state,
                pending: false,
                success_Edit: true,
                error: false
            }
        case DegreeCouseApplicationActions.DEGREECOURSEAPPLICATION_EDIT_ERROR:
            return {
                ...state,
                pending: false,
                error: true
            }
        case DegreeCouseApplicationActions.DEGREECOURSEAPPLICATION_DELETE_SUCCESS:
            return {
                ...state,
                pending: false,
                showDeleteDialog: false,
                error: false
            }
        case DegreeCouseApplicationActions.DEGREECOURSEAPPLICATION_DELETE_ERROR:
            return {
                ...state,
                pending: false,
                showDeleteDialog: true,
                error: true
            }
        case DegreeCouseApplicationActions.SHOW_EDIT_DEGREECOURSEAPPLICATION:
            return {
                ...state,
                showEditdegreeCourseApplication: true,
                degreeCourseApplication: action.payload,
                error: false
            }
        case DegreeCouseApplicationActions.HIDE_EDIT_DEGREECOURSEAPPLICATION:
            return {
                ...state,
                showEditdegreeCourseApplication: false,
                success_Edit: false,
                error: false
            }
        case DegreeCouseApplicationActions.SHOW_DEGREECOURSEAPPLICATION_DELETE_DIALOG:
            return {
                ...state,
                showDeleteDialog: true,
                degreeCourseApplication: action.payload,
                error: false
            }
        case DegreeCouseApplicationActions.HIDE_DEGREECOURSEAPPLICATION_DELETE_DIALOG:
            return {
                ...state,
                showDeleteDialog: false,
                error: false
            }
        default:
            return state
    }
}

export default DegreeCourseApplication;