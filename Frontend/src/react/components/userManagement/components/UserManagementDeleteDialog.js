import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userService from '../state/UserService'

const DeleteDialog = (props) => {
    const { showDeleteDialog, deleteUser, accessToken, userID } = props

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch({ type: 'HIDE_DELETE_DIALOG' })
    }
    const id = "DeleteDialogUser" + userID 
    return (
        <Modal id={id} show={showDeleteDialog} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {userID} ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete {userID} ?</Modal.Body>
            <Modal.Footer>
                <Button id='DeleteDialogCancelButton' variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button id='DeleteDialogConfirmButton' variant="primary" onClick={
                    () => {
                        deleteUser(accessToken, userID);
                    }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        showDeleteDialog: state.userReducer.showDeleteDialog,
        userID: state.userReducer.userID
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteUser: userService.deleteUser,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDialog)