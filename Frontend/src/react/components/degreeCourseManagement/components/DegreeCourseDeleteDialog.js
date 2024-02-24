import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as degreeCourseService from '../state/DegreeCourseService'

const DegreeCourseDeleteDialog = (props) => {
    const { showDeleteDialog, deleteDegreeCourse, accessToken, degreeCourse } = props

    const dispatch = useDispatch();
    console.log(showDeleteDialog)

    const handleClose = () => {
        dispatch({ type: 'HIDE_DEGREECOURSE_DELETE_DIALOG' })
    }
    const cID = "DeleteDialogDegreeCourse" + degreeCourse.id 
    return (
        <Modal id={cID} show={showDeleteDialog} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {degreeCourse.name} ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete {degreeCourse.name} ?</Modal.Body>
            <Modal.Footer>
                <Button id='DeleteDialogCancelButton' variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button id='DeleteDialogConfirmButton' variant="primary" onClick={
                    () => {
                        deleteDegreeCourse(accessToken, degreeCourse.id);
                    }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        showDeleteDialog: state.degreeCourseReducer.showDeleteDialog,
        degreeCourse: state.degreeCourseReducer.degreeCourse
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteDegreeCourse: degreeCourseService.deleteDegreeCourse,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DegreeCourseDeleteDialog)