import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as degreeCourseService from '../state/DegreeCourseService'
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const DegreeCourseAddForm = (props) => {
    const { addDegreeCourse, accessToken, error} = props;

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [shortName, setShortName] = useState('');
    const [universityName, setUniversityName] = useState('');
    const [universityShortName, setUniversityShortName] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [departmentShortName, setDepartmentShortName] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'shortName') {
            setShortName(value);
        } else if (name === 'universityName') {
            setUniversityName(value);
        } else if (name === 'universityShortName') {
            setUniversityShortName(value);
        } else if (name === 'departmentName') {
            setDepartmentName(value);
        } else if (name === 'departmentShortName') {
            setDepartmentShortName(value);
        }
    };

    let courseBody = {
        "name": name,
        "shortName": shortName,
        "universityName": universityName,
        "universityShortName": universityShortName,
        "departmentName": departmentName,
        "departmentShortName": departmentShortName
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addDegreeCourse(accessToken, courseBody)
    }

    return (
        <Form id="DegreeCourseManagementPageCreateComponent" className='add-form'>
            <h1>Create DegreeCourse</h1>
            {error && <h3>Name, University Name and Department Name are required!</h3>}
            <Form.Group className="mb-3" id="UserID">
                <Form.Label>Name</Form.Label>
                <Form.Control id="CreateDegreeCourseComponentEditName" type="text" placeholder="Name" name="name" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Short Name</Form.Label>
                <Form.Control id="CreateDegreeCourseComponentEditShortName" type="text" placeholder="Short Name" name="shortName" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>University Name</Form.Label>
                <Form.Control id="CreateDegreeCourseComponentEditUniversityName" type="text" placeholder="University Name" name="universityName" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>University ShortName</Form.Label>
                <Form.Control id="CreateDegreeCourseComponentEditUniversityShortName" type="text" placeholder="University ShortName" name="universityShortName" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Department Name</Form.Label>
                <Form.Control id="CreateDegreeCourseComponentEditDepartmentName" type="text" placeholder="Department Name" name="departmentName" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Department ShortName</Form.Label>
                <Form.Control id="CreateDegreeCourseComponentEditDepartmentShortName" type="text" placeholder="Department ShortName" name="departmentShortName" onChange={handleChange} />
            </Form.Group>

            <Button className="mb-3" id='CreateDegreeCourseComponentCreateDegreeCourseButton' variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            <Button className="mb-3" id='OpenDegreeCourseManagementPageListComponentButton' variant="primary" type="submit" onClick={() => dispatch({ type: "HIDE_ADD_DEGREECOURSE" })}>
                Cancel
            </Button>
        </Form>
    );
}

const mapStateToProps = state => {
    return {
        accessToken: state.authenticationReducer.accessToken,
        error: state.degreeCourseReducer.error
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addDegreeCourse: degreeCourseService.addDegreeCourse
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(DegreeCourseAddForm);