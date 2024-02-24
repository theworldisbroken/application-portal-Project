import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as degreeCourseApplicationService from '../state/DegreeCourseApplicationService'
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UserManagementEditForm = (props) => {
    const { editDegreeCourseApplication, accessToken, error, degreeCourseApplication, success} = props;

    const dispatch = useDispatch();

    const [applicantUserID, setApplicantUserID] = useState(degreeCourseApplication.applicantUserID);
    const [degreeCourseID, setDegreeCourseID] = useState(degreeCourseApplication.degreeCourseID);
    const [targetPeriodYear, setTargetPeriodYear] = useState(degreeCourseApplication.targetPeriodYear);
    const [targetPeriodShortName, setTargetPeriodShortNamen] = useState(degreeCourseApplication.targetPeriodShortName);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'applicantUserID') {
            setApplicantUserID(value);
        } else if (name === 'degreeCourseID') {
            setDegreeCourseID(value);
        } else if (name === 'targetPeriodYear') {
            setTargetPeriodYear(value);
        } else if (name === 'targetPeriodShortName') {
            setTargetPeriodShortNamen(value);
        }
    };

    let applicationBody = {
        "applicantUserID": applicantUserID,
        "degreeCourseID": degreeCourseID,
        "targetPeriodYear": targetPeriodYear,
        "targetPeriodShortName": targetPeriodShortName
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        editDegreeCourseApplication(accessToken, applicationBody, degreeCourseApplication.id)
    }

    return (
        <Form id='DegreeCourseApplicationPageEditComponent' className='edit-form'>
            <h1>Edit {degreeCourseApplication.id}</h1>
            {error && <h3 className='EditApplicationError'> Choose a vaild Year!</h3>}
            <Form.Group className="mb-3" id="UserID">
                <Form.Label>Applicant UserID</Form.Label>
                <Form.Control id="EditDegreeCourseApplicationApplicantUserID" type="text" value={applicantUserID} name="applicantUserID" disabled />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>DegreeCourse ID</Form.Label>
                <Form.Control id="EditDegreeCourseApplicationDegreeCourseID" type="text" value={degreeCourseID} name="degreeCourseID" disabled />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Year</Form.Label>
                <Form.Control id="EditDegreeCourseApplicationTargetPeriodYear" type="text" value={targetPeriodYear} name="targetPeriodYear" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Semester</Form.Label>
                <Form.Select id="EditDegreeCourseApplicationTargetPeriodShortName" placeholder="Semester" value={targetPeriodShortName} name="targetPeriodShortName" onChange={handleChange} >
                    <option>Choose a semester</option>
                    <option value="WiSe">Wintersemester</option>
                    <option value="SoSe">Sommersemester</option>
                </Form.Select>
            </Form.Group>

            {success && <h3 className="EditApplicationSave" >Saved!</h3>}
            <Button className="mb-3" id='EditDegreeCourseApplicationComponentSaveDegreeCourseApplicationButton' variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            <Button className="mb-3" id='OpenDegreeCourseApplicationManagementPageListComponentButton' variant="primary" type="submit" onClick={() => dispatch({ type: "HIDE_EDIT_DEGREECOURSEAPPLICATION" })}>
                Back
            </Button>
        </Form>
    );
}

const mapStateToProps = state => {
    return {
        degreeCourseApplication: state.degreeCourseApplicationReducer.degreeCourseApplication,
        success: state.degreeCourseApplicationReducer.success_Edit,
        error: state.degreeCourseApplicationReducer.error,
        accessToken: state.authenticationReducer.accessToken
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    editDegreeCourseApplication: degreeCourseApplicationService.editDegreeCourseApplication
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(UserManagementEditForm);