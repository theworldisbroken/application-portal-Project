import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as degreeCourseApplicationService from '../state/DegreeCourseApplicationService'

const DegreeCourseApplicationDeleteDialog = (props) => {
    const { showDeleteDialog, deleteDegreeCourseApplication, accessToken, degreeCourseApplication } = props

    const dispatch = useDispatch();
    console.log(showDeleteDialog)

    const handleClose = () => {
        dispatch({ type: 'HIDE_DEGREECOURSEAPPLICATION_DELETE_DIALOG' })
    }
    const cID = "DeleteDialogDegreeCourseApplication" + degreeCourseApplication.id 
    return (
        <Modal id={cID} show={showDeleteDialog} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {degreeCourseApplication.id} ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this Application {degreeCourseApplication.applicantUserID} ?</Modal.Body>
            <Modal.Footer>
                <Button id='DeleteDialogCancelButton' variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button id='DeleteDialogConfirmButton' variant="primary" onClick={
                    () => {
                        deleteDegreeCourseApplication(accessToken, degreeCourseApplication.id);
                    }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        showDeleteDialog: state.degreeCourseApplicationReducer.showDeleteDialog,
        degreeCourseApplication: state.degreeCourseApplicationReducer.degreeCourseApplication
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteDegreeCourseApplication: degreeCourseApplicationService.deleteDegreeCourseApplication,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DegreeCourseApplicationDeleteDialog)