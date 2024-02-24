import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as userService from '../state/UserService'
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UserManagementAddForm = (props) => {
    const { addUser, accessToken, error } = props;

    const dispatch = useDispatch();

    const [userID, setUserID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [Administrator, setAdmin] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'userID') {
            setUserID(value);
        } else if (name === 'firstName') {
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
        "userID": userID,
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
        "isAdministrator": Administrator
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addUser(accessToken, userBody)
    }

    return (
        <Form id="UserManagementPageCreateComponent" className='add-form'>
            <h1>Create User</h1>
            {error && <h3>UserID and Password are required!</h3>}
            <Form.Group className="mb-3" id="UserID">
                <Form.Label>User ID</Form.Label>
                <Form.Control id="CreateUserComponentEditUserID" type="text" placeholder="UserID" name="userID" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control id="CreateUserComponentEditFirstName" type="text" placeholder="First Name" name="firstName" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control id="CreateUserComponentEditLastName" type="text" placeholder="Last Name" name="lastName" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control id="CreateUserComponentEditPassword" type="text" placeholder="Password" name="password" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" id="formBasicCheckbox">
                <Form.Check id='CreateUserComponentEditIsAdministrator' type="checkbox" label="Administrator" name='Administrator' onChange={handleChange} />
            </Form.Group>
            <Button className="mb-3" id='CreateUserComponentCreateUserButton' variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            <Button className="mb-3" id='OpenUserManagementPageListComponent' variant="primary" type="submit" onClick={()=> dispatch({type: "HIDE_ADD_USER"})}>
                Cancel
            </Button>
        </Form>
    );
}

const mapStateToProps = state => {
    return {
        accessToken: state.authenticationReducer.accessToken,
        error: state.userReducer.error,
        pending: state.authenticationReducer.pending
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addUser: userService.addUser
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(UserManagementAddForm);