import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { bindActionCreators } from 'redux';
import * as authenticationService from '../state/AuthenticationService'


const LoginDialog = (props) => {
    const { closeLoginDialogAction, authenticationUserAction, error } = props;
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');

    const handleCloseDialog = () => {
        closeLoginDialogAction();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'userID') {
            setUserID(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticationUserAction(userID, password);
    };



    let showDialog = props.showLoginDialog;
    if (showDialog === undefined) {
        showDialog = false;
    }

    return (
        <Modal id='LoginDialog' show={showDialog} onHide={handleCloseDialog}>
            <Button id='X-Button' variant="primary" type="button" onClick={handleCloseDialog}>
                X
            </Button>
            {error && <Form.Label className='error-message-auth'>UserID oder Password ist falsch!</Form.Label>}
            <Form closeButton>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control id="LoginDialogUserIDText" type="text" name='userID' placeholder="UserID" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control id="LoginDialogPasswordText" type="password" name='password' placeholder="Password" onChange={handleChange} required
                    />
                </Form.Group>
                <Button id="PerformLoginButton" variant="primary" type="submit" onClick={handleSubmit} >
                    Submit
                </Button>
            </Form>
        </Modal>
    );
};


const mapStateToProps = state => {
    return {
        showLoginDialog: state.authenticationReducer.showLoginDialog,
        error: state.authenticationReducer.error
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    closeLoginDialogAction: authenticationService.closeDialog,
    authenticationUserAction: authenticationService.submitAuthentication
}, dispatch)

const ConnectedButton = connect(mapStateToProps, mapDispatchToProps)(LoginDialog)

export default ConnectedButton;