import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as degreeCourseApplicationService from './state/DegreeCourseApplicationService'
import Button from 'react-bootstrap/Button';
import { bindActionCreators } from 'redux';

import DegreeCourseApplicationEditForm from './components/DegreeCourseApplicationEditForm'
import DeleteDialog from './components/DegreeCourseApplicationDeleteDialog'

const DegreeCourseApplicationManagement = (props) => {
    const { getAllDegreeCourseApplications, getAllPersonalDegreeCourseApplications, showEditdegreeCourseApplication, isAdministrator, showDeleteDialog, degreeCourseApplications, accessToken, pending, error } = props;
    const dispatch = useDispatch();

    const ApplicationComponent = ({ degreeCourseApplication }) => {
        const { id, applicantUserID, targetPeriodYear, targetPeriodShortName, universityName, degreeCourseName } = degreeCourseApplication;
        const cID = "DegreeCourseApplicationItem" + id;
        const editid = "DegreeCourseApplicationItemEditButton" + id;
        const deleteid = "DegreeCourseApplicationItemDeleteButton" + id;

        return (
            <li id={cID}>
                <div className="course-block">
                    <div className="course-name">
                        {applicantUserID}
                    </div>
                    <div>
                        <div className="course-item">
                            <span className="label">id:</span>
                            <span className="value">{id}</span>
                        </div>
                        <div className="course-item">
                            <span className="label">Applicant UserID:</span>
                            <span id='ApplicantUserID' className="value">{applicantUserID}</span>
                        </div>
                        <div className="course-item">
                            <span className="label">University Name:</span>
                            <span id='UniversityShortName' className="value">{universityName}</span>
                        </div>
                        <div className="course-item">
                            <span className="label">DegreeCourse Name:</span>
                            <span id='DegreeCourseName' className="value">{degreeCourseName}</span>
                        </div>
                        <div className="course-item">
                            <span className="label">Year:</span>
                            <span id='TargetPeriodYear' className="value">{targetPeriodYear}</span>
                        </div>
                        <div className="course-item">
                            <span className="label">Semester:</span>
                            <span id='TargetPeriodShortName' className="value">{targetPeriodShortName}</span>
                        </div>
                    </div>
                    <div className="course-actions">
                        <Button id={editid} onClick={() => dispatch({ type: 'SHOW_EDIT_DEGREECOURSEAPPLICATION', payload: degreeCourseApplication })}>Edit</Button>
                        {isAdministrator &&
                            <Button id={deleteid} className='DeleteButton' onClick={() => dispatch({ type: 'SHOW_DEGREECOURSEAPPLICATION_DELETE_DIALOG', payload: degreeCourseApplication })}>Delete</Button>
                        }
                    </div>
                </div>
            </li>
        );
    };

    useEffect(() => {
        if (isAdministrator) {
            getAllDegreeCourseApplications(accessToken);
        } else {
            getAllPersonalDegreeCourseApplications(accessToken)
        }
    }, [getAllDegreeCourseApplications, getAllPersonalDegreeCourseApplications, accessToken, showDeleteDialog, isAdministrator, showEditdegreeCourseApplication]);


    if (pending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error!</div>;
    }

    let page

    if (showEditdegreeCourseApplication) {
        page = <DegreeCourseApplicationEditForm />
    } else {
        page = <div className='div-DegreeCourseManagement'>
            <h1>Applications</h1>
            <hr />
            {degreeCourseApplications &&
                <ul id='DegreeCourseApplicationManagementPageListComponent'>
                    {degreeCourseApplications.map((degreeCourseApplication) => (
                        <ApplicationComponent
                            key={degreeCourseApplication.id}
                            degreeCourseApplication={degreeCourseApplication}
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
        <div className="page-content" id="DegreeCourseApplicationManagementPage">
            {page}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        degreeCourseApplications: state.degreeCourseApplicationReducer.degreeCourseApplications,
        showEditdegreeCourseApplication: state.degreeCourseApplicationReducer.showEditdegreeCourseApplication,
        accessToken: state.authenticationReducer.accessToken,
        isAdministrator: state.authenticationReducer.isAdministrator,
        showDeleteDialog: state.degreeCourseApplicationReducer.showDeleteDialog,
        error: state.authenticationReducer.error,
        pending: state.authenticationReducer.pending
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllDegreeCourseApplications: degreeCourseApplicationService.getAllDegreeCourseApplications,
    getAllPersonalDegreeCourseApplications: degreeCourseApplicationService.getAllPersonalDegreeCourseApplications
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(DegreeCourseApplicationManagement);