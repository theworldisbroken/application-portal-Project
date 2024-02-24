import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticationService from './state/AuthenticationService'
import { LinkContainer } from 'react-router-bootstrap'



const TopNavbar = (props) => {
    const { user, showLoginDialogAction, logoutAction } = props;

    const handleShowLoginDialog = () => {
        showLoginDialogAction();
    };

    const handleLogout = () => {
        logoutAction();
    };

    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        BHT
                    </Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto">
                    <LinkContainer className='navbar_about-us' to="/ueber-uns">
                        <Nav.Link>
                            About Us
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
                {!user ? (
                    <Button id="OpenLoginDialogButton" variant="outline-primary" onClick={handleShowLoginDialog}>Login</Button>
                ) : (
                    <Button id="LogoutButton" variant="outline-primary" onClick={handleLogout}>Logout</Button>
                )}
            </Container>
        </Navbar>
    );
};

const mapStateToProps = state => {
    return { user: state.authenticationReducer.user };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showLoginDialogAction: authenticationService.showDialog,
    logoutAction: authenticationService.logoutAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TopNavbar);