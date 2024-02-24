import Button from 'react-bootstrap/Button';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
// import iconhome from "../../../layout/images/icons8-home-40.png"
// import iconusers from "../../../layout/images/icons8-users-48.png"
// import iconcourse from "../../../layout/images/icons8-course-48.png"
// import iconapplication from "../../../layout/images/icons8-apply-64.png"
import iconhome from "../../../../node_modules/bootstrap-icons/icons/house-door-fill.svg"
import iconUsers from "../../../../node_modules/bootstrap-icons/icons/people-fill.svg"
import iconcourse from "../../../../node_modules/bootstrap-icons/icons/book.svg"
import iconapplication from "../../../../node_modules/bootstrap-icons/icons/journal-check.svg"
const SidebarMenu = (props) => {
  const { isAdministrator } = props;
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <ul>
        <li>
          <LinkContainer to="/" id="OpenStartPageButton">
            <Button>
            <img src={iconhome} alt="Icon" />
            </Button>
          </LinkContainer>
        </li>
        {isAdministrator &&
          <li>
            <LinkContainer to="/userManagement" id="OpenUserManagementPageButton">
              <Button id='users-button' onClick={
                () => {
                  dispatch({ type: "HIDE_ADD_USER" })
                  dispatch({ type: "HIDE_EDIT_USER" })
                }}>
                <img src={iconUsers} alt="Icon" />
              </Button>
            </LinkContainer>
          </li>
        }
        <li>
          <LinkContainer to="/degreeCourseManagement" id="OpenDegreeCourseManagementPageButton">
            <Button onClick={
              () => {
                dispatch({ type: "HIDE_ADD_DEGREECOURSE" })
                dispatch({ type: "HIDE_EDIT_DEGREECOURSE" })
                dispatch({ type: "HIDE_ADD_DEGREECOURSEAPPLICATION" })
              }}>
              <img src={iconcourse} alt="Icon" />
            </Button>
          </LinkContainer>
        </li>
        <li>
          <LinkContainer to="/degreeCourseApplicationManagement" id="OpenDegreeCourseApplicationManagementPageButton">
            <Button onClick={() => {
              dispatch({ type: "HIDE_EDIT_DEGREECOURSEAPPLICATION" })
            }}>
              <img src={iconapplication} alt="Icon" />
            </Button>
          </LinkContainer>
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = state => {
  return { isAdministrator: state.authenticationReducer.isAdministrator };
}

export default connect(mapStateToProps, null)(SidebarMenu);