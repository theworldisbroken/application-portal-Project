import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as degreeCourseService from '../state/DegreeCourseService'
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const DegreeCourseEditForm = (props) => {
    const { editDegreeCourse, accessToken, degreeCourse, success } = props;

    const dispatch = useDispatch();

    console.log(degreeCourse.shortName)

    const [name, setName] = useState(degreeCourse.name);
    const [shortName, setShortName] = useState(degreeCourse.shortName);
    const [universityName, setUniversityName] = useState(degreeCourse.universityName);
    const [universityShortName, setUniversityShortName] = useState(degreeCourse.universityShortName);
    const [departmentName, setDepartmentName] = useState(degreeCourse.departmentName);
    const [departmentShortName, setDepartmentShortName] = useState(degreeCourse.departmentShortName);

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
        editDegreeCourse(accessToken, courseBody, degreeCourse.id)
    }

    return (
        <Form id="DegreeCourseManagementPageEditComponent" className='edit-form'>
            <h1>Edit DegreeCourse {degreeCourse.name}</h1>
            <Form.Group className="mb-3" id="UserID">
                <Form.Label>Name</Form.Label>
                <Form.Control id="EditDegreeCourseComponentEditName" type="text" value={name} name="name" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Short Name</Form.Label>
                <Form.Control id="EditDegreeCourseComponentEditShortName" type="text" value={shortName} name="shortName" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>University Name</Form.Label>
                <Form.Control id="EditDegreeCourseComponentEditUniversityName" type="text" value={universityName} name="universityName" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>University ShortName</Form.Label>
                <Form.Control id="EditDegreeCourseComponentEditUniversityShortName" type="text" value={universityShortName} name="universityShortName" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Department Name</Form.Label>
                <Form.Control id="EditDegreeCourseComponentEditDepartmentName" type="text" value={departmentName} name="departmentName" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Department ShortName</Form.Label>
                <Form.Control id="EditDegreeCourseComponentEditDepartmentShortName" type="text" value={departmentShortName} name="departmentShortName" onChange={handleChange} />
            </Form.Group>
            {success && <h3>Saved!</h3>}
            <Button className="mb-3" id='EditDegreeCourseComponentSaveDegreeCourseButton' variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            <Button className="mb-3" id='OpenDegreeCourseManagementPageListComponentButton' variant="primary" type="submit" onClick={() => dispatch({ type: "HIDE_EDIT_DEGREECOURSE" })}>
                Cancel
            </Button>
        </Form>
    );
}

const mapStateToProps = state => {
    return {
        users: state.userReducer.users,
        degreeCourse: state.degreeCourseReducer.degreeCourse,
        success: state.degreeCourseReducer.success_Edit,
        accessToken: state.authenticationReducer.accessToken
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    editDegreeCourse: degreeCourseService.editDegreeCourse
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(DegreeCourseEditForm);