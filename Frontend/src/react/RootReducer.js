import { combineReducers } from 'redux';
import authenticationReducer from '../react/components/navbar/state/AuthenticationReducer';
import userReducer from '../react/components/userManagement/state/UserReducer';
import degreeCourseReducer from '../react/components/degreeCourseManagement/state/DegreeCourseReducer';
import degreeCourseApplicationReducer from '../react/components/degreeCourseApplicationManagement/state/DegreeCourseApplicationReducer'

const rootReducer = combineReducers({
    authenticationReducer,
    userReducer,
    degreeCourseReducer,
    degreeCourseApplicationReducer
});

export default rootReducer;