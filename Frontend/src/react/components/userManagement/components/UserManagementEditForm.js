import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as userService from '../state/UserService'
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UserManagementEditForm = (props) => {
    const { editUser, accessToken, error, user, success } = props;

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [password, setPassword] = useState("");
    const [Administrator, setAdmin] = useState(user.isAdministrator);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'firstName') {
            setFirstName(value);
        } else if (name === 'lastName') {
            setLastName(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'Administrator') {
            setAdmin(!Administrator);
        }
    };

    let userBody = {
        "firstName": firstName,
        "lastName": lastName,
        "isAdministrator": Administrator
    }
    if (password !== "") {
        userBody.password = password
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        editUser(accessToken, userBody, user.userID)
    }

    return (
        <Form id='UserManagementPageEditComponent' className='edit-form'>
            <h1>Edit {user.userID}</h1>
            {error && <h2>Error</h2>}
            <Form.Group className="mb-3" id="UserID">
                <Form.Label>User ID</Form.Label>
                <Form.Control id="EditUserComponentEditUserID" type="text" value={user.userID} name="userID" disabled/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control id="EditUserComponentEditFirstName" type="text" value={firstName} name="firstName" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control id="EditUserComponentEditLastName" type="text" value={lastName} name="lastName" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control id="EditUserComponentEditPassword" type="text" placeholder="Password" name="password" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" id="formBasicCheckbox">
                <Form.Check id='EditUserComponentEditIsAdministrator' type="checkbox" label="Administrator" name='Administrator' onChange={handleChange} />
            </Form.Group>
            {success && <h3>Saved!</h3>}
            <Button className="mb-3" id='EditUserComponentSaveUserButton' variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            <Button className="mb-3" id='OpenUserManagementPageListComponentButton' variant="primary" type="submit" onClick={() => dispatch({ type: "HIDE_EDIT_USER" })}>
                Back
            </Button>
        </Form>
    );
}

const mapStateToProps = state => {
    return {
        users: state.userReducer.users,
        user: state.userReducer.user,
        success: state.userReducer.success_Edit,
        accessToken: state.authenticationReducer.accessToken,
        error: state.userReducer.error,
        pending: state.authenticationReducer.pending
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    editUser: userService.editUser
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(UserManagementEditForm);