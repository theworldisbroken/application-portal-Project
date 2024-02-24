import React, { useState } from 'react';
import jwtDecode from 'jwt-decode'
import { connect, useDispatch } from 'react-redux';
import * as degreeCourseService from '../state/DegreeCourseService'
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const DegreeCourseApplicationAddForm = (props) => {
    const { addDegreeCourseApplication, degreeCourse, accessToken, isAdministrator, error } = props;

    const dispatch = useDispatch();
    const tokenuserID = jwtDecode(accessToken).userID

    const [applicantUserID, setApplicantUserID] = useState('');
    const [targetPeriodYear, setTargetPeriodYear] = useState('');
    const [targetPeriodShortName, setTargetPeriodShortName] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'applicantUserID') {
            setApplicantUserID(value);
        } else if (name === 'targetPeriodYear') {
            setTargetPeriodYear(value);
        } else if (name === 'targetPeriodShortName') {
            setTargetPeriodShortName(value);
        }
    };

    let applicationBody = {
        "degreeCourseID": degreeCourse.id,
        "targetPeriodYear": targetPeriodYear,
        "targetPeriodShortName": targetPeriodShortName
    }

    if (applicantUserID !== "") {
        applicationBody.applicantUserID = applicantUserID
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addDegreeCourseApplication(accessToken, applicationBody)
    }

    return (
        <Form id="DegreeCourseApplicationPageCreateComponent" className='add-form'>
            <h1>Create DegreeCourse</h1>
            {isAdministrator ? (
                <>
                    {error && <h3>A vaild User ID and Year are required!</h3>}
                </>
            ) : (
                <>
                    {error && <h3>A vaild Year is required!</h3>}
                </>
            )}
            <Form.Group className="mb-3" id="UserID">
                <Form.Label>DegreeCourse</Form.Label>
                <Form.Control id="DegreeCourseName" type="text" value={degreeCourse.name} disabled />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Applicant UserID</Form.Label>
                {isAdministrator ? (
                    <Form.Control id="CreateDegreeCourseApplicationEditUserID" type="text" placeholder="User ID" name="applicantUserID" onChange={handleChange} />
                ) : (
                    <Form.Control id="CreateDegreeCourseApplicationEditUserID" type="text" value={tokenuserID} disabled />
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Year</Form.Label>
                <Form.Control id="CreateDegreeCourseApplicationEditTargetPeriodYear" type="text" placeholder="Year" name="targetPeriodYear" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Semester</Form.Label>
                <Form.Select id="CreateDegreeCourseApplicationEditTargetPeriodName" placeholder="Semester" name="targetPeriodShortName" onChange={handleChange}>
                    <option>Choose a semester</option>
                    <option value="WiSe">Wintersemester</option>
                    <option value="SoSe">Sommersemester</option>
                </Form.Select>
            </Form.Group>

            <Button className="mb-3" id='CreateDegreeCourseApplicationCreateButton' variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            <Button className="mb-3" id='OpenDegreeCourseManagementPageListComponentButton' variant="primary" type="submit" onClick={() => dispatch({ type: "HIDE_ADD_DEGREECOURSEAPPLICATION" })}>
                Cancel
            </Button>
        </Form>
    );
}

const mapStateToProps = state => {
    return {
        accessToken: state.authenticationReducer.accessToken,
        isAdministrator: state.authenticationReducer.isAdministrator,
        degreeCourse: state.degreeCourseReducer.degreeCourse,
        error: state.degreeCourseReducer.error
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addDegreeCourseApplication: degreeCourseService.addDegreeCourseApplication
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(DegreeCourseApplicationAddForm);