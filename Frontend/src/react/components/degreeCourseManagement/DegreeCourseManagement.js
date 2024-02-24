import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as degreeCourseService from './state/DegreeCourseService'
import Button from 'react-bootstrap/Button';
import { bindActionCreators } from 'redux';

import DegreeCourseAddForm from './components/DegreeCourseAddForm'
import DegreeCourseEditForm from './components/DegreeCourseEditForm'
import DeleteDialog from './components/DegreeCourseDeleteDialog'
import DegreeCourseApplicationAddForm from './components/DegreeCourseApplicationAddForm';
import addIcon from "../../../layout/images/icons8-add-48.png"

const DegreeCourseManagement = (props) => {
    const { getAllDegreeCourses, showAddDegreeCourse, showAddDegreeCourseApplication, isAdministrator, showEditDegreeCourse, showDeleteDialog, courses, accessToken, pending, error } = props;
    const dispatch = useDispatch();

    const CourseComponent = ({ course }) => {
        const { id, name, shortName, universityName, universityShortName, departmentName, departmentShortName } = course;
        const cID = "DegreeCourseItem" + id;
        const editid = "DegreeCourseItemEditButton" + id;
        const deleteid = "DegreeCourseItemDeleteButton" + id;
        const appid = "CreateDegreeCourseApplicationForDegreeCourse" + id;

        return (
            <li id={cID}>
                <div className="course-block">
                    <div className="course-name">
                        {shortName}
                    </div>
                    <div>
                        <div className="course-item">
                            <span className="label">id:</span>
                            <span className="value">{id}</span>
                        </div>
                        <div className="course-item">
                            <span className="label">name:</span>
                            <span id='Name' className="value">{name}</span>
                        </div>
                        <div className="course-item">
                            <span className="label">shortName:</span>
                            <span className="value">{shortName}</span>
                        </div>
                        <div className="course-item">
                            <span className="label">universityName:</span>
                            <span id='UniversityName' className="value">{universityName}</span>
                        </div>
                        <div className="course-item">
                            <span className="label">universityShortName:</span>
                            <span className="value">{universityShortName}</span>
                        </div>
                        <div className="course-item">
                            <span className="label">departmentName:</span>
                            <span id='DepartmentName' className="value">{departmentName}</span>
                        </div>
                        <div className="course-item">
                            <span className="label">departmentShortName:</span>
                            <span className="value">{departmentShortName}</span>
                        </div>
                    </div>
                    {isAdministrator &&
                        <div className="course-actions">
                            <Button id={editid} onClick={() => dispatch({ type: 'SHOW_EDIT_DEGREECOURSE', payload: course })}>Edit</Button>
                            <Button id={deleteid} className='DeleteButton' onClick={() => dispatch({ type: 'SHOW_DEGREECOURSE_DELETE_DIALOG', payload: course })}>Delete</Button>
                        </div>
                    }
                    <Button id={appid} className='CreateApplicationButton' onClick={() => dispatch({ type: 'SHOW_ADD_DEGREECOURSEAPPLICATION', payload: course })}>Apply</Button>
                </div>
            </li>
        );
    };

    useEffect(() => {
        getAllDegreeCourses(accessToken);
    }, [getAllDegreeCourses, accessToken, showAddDegreeCourse, showEditDegreeCourse, showDeleteDialog]);


    if (pending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error!</div>;
    }

    let page

    if (showAddDegreeCourse) {
        page = <DegreeCourseAddForm />
    } else if (showEditDegreeCourse) {
        page = <DegreeCourseEditForm />
    } else if (showAddDegreeCourseApplication) {
        page = <DegreeCourseApplicationAddForm />
    } else {
        page = <div className='div-DegreeCourseManagement'>
            <h1>DegreeCourses</h1>
            <hr />
            {isAdministrator &&
                <Button id='DegreeCourseManagementPageCreateDegreeCourseButton' onClick={() => dispatch({ type: "SHOW_ADD_DEGREECOURSE" })}>
                    <img src={addIcon} alt="Icon" />
                </Button>
            }
            {courses &&
                <ul id='DegreeCourseManagementPageListComponent'>
                    {courses.map((course) => (
                        <CourseComponent
                            key={course.id}
                            course={course}
                        />
                    ))}
                </ul>
            }
            {showDeleteDialog &&
                <DeleteDialog accessToken={accessToken} />
            }
        </div>
    }

    return (
        <div className="page-content" id="DegreeCourseManagementPage">
            {page}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        courses: state.degreeCourseReducer.degreeCourses,
        showAddDegreeCourse: state.degreeCourseReducer.showAddDegreeCourse,
        showEditDegreeCourse: state.degreeCourseReducer.showEditDegreeCourse,
        showAddDegreeCourseApplication: state.degreeCourseReducer.showAddDegreeCourseApplication,
        accessToken: state.authenticationReducer.accessToken,
        error: state.authenticationReducer.error,
        isAdministrator: state.authenticationReducer.isAdministrator,
        pending: state.authenticationReducer.pending,
        showDeleteDialog: state.degreeCourseReducer.showDeleteDialog
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllDegreeCourses: degreeCourseService.getAllDegreeCourses,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(DegreeCourseManagement);