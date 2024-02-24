import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as userService from './state/UserService'
import Button from 'react-bootstrap/Button';
import { bindActionCreators } from 'redux';

import UserManagementAddForm from './components/UserManagementAddForm';
import UserManagementEditForm from './components/UserManagementEditForm';
import addIcon from "../../../layout/images/icons8-add-48.png"
import DeleteDialog from './components/UserManagementDeleteDialog';

const UsersManagement = (props) => {
    const { getUsers, showAddUser, showEditUser, showDeleteDialog, users, accessToken, pending, error } = props;
    const dispatch = useDispatch();

    const UserComponent = ({ user }) => {
        const { userID, firstName, lastName } = user;
        const id = "UserItem" + userID;
        const editid = "UserItemEditButton" + userID;
        const deleteid = "UserItemDeleteButton" + userID;

        return (
            <li id={id}>
                <div className="user-block">
                    <div className="user-name">
                        {firstName} {lastName}
                    </div>
                    <div>
                        <div className="user-item">
                            <span className="label">User ID:</span>
                            <span className="value">{userID}</span>
                        </div>
                        <div className="user-item">
                            <span className="label">First Name:</span>
                            <span className="value">{firstName}</span>
                        </div>
                        <div className="user-item">
                            <span className="label">Last Name:</span>
                            <span className="value">{lastName}</span>
                        </div>
                    </div>
                    <div className="user-actions">
                        <Button id={editid} onClick={() => dispatch({ type: 'SHOW_EDIT_USER', payload: user })}>Edit</Button>
                        <Button id={deleteid} className='DeleteButton' onClick={() => dispatch({ type: 'SHOW_DELETE_DIALOG', payload: userID })}>Delete</Button>
                    </div>
                </div>
            </li>
        );
    };

    useEffect(() => {
        getUsers(accessToken);
    }, [getUsers, accessToken, showAddUser, showEditUser, showDeleteDialog]);


    if (pending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error!</div>;
    }

    let page

    if (showAddUser) {
        page = <UserManagementAddForm />
    } else if (showEditUser) {
        page = <UserManagementEditForm />
    } else {
        page = <div className='div-UsersManagement'>
            <h1>Users</h1>
            <hr/>
            <Button id='UserManagementPageCreateUserButton' onClick={() => dispatch({ type: "SHOW_ADD_USER" })}>
                <img src={addIcon} alt="Icon" />
            </Button>
            {users &&
                <ul id='UserManagementPageListComponent'>
                    {users.map((user) => (
                        <UserComponent
                            key={user.userID}
                            user={user}
                        />
                    ))}
                </ul>
            }
            {showDeleteDialog &&
                <DeleteDialog accessToken={accessToken} />
            }
        </div>
    }

    return (
        <div className="page-content" id="UserManagementPage">
            {page}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        users: state.userReducer.users,
        showAddUser: state.userReducer.showAddUser,
        showEditUser: state.userReducer.showEditUser,
        accessToken: state.authenticationReducer.accessToken,
        error: state.authenticationReducer.error,
        pending: state.authenticationReducer.pending,
        showDeleteDialog: state.userReducer.showDeleteDialog
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getUsers: userService.getUsers,

}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(UsersManagement);