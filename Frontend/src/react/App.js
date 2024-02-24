import React from 'react';

import { connect } from 'react-redux'

import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './components/components/LandingPage'
import TopNavbar from './components/navbar/Navbar'
import StartPage from './components/components/StartPage';
import AboutUs from './components/components/aboutUs';
import UsersManagement from './components/userManagement/UsersManagement';
import SidebarMenu from './components/components/SidebarMenu';
import DegreeCourseManagement from './components/degreeCourseManagement/DegreeCourseManagement';
import DegreeCourseApplication from './components/degreeCourseApplicationManagement/DegreeCourseApplicationManagement';

const mapStateToProps = state => {
  return state.authenticationReducer
}

const App = (props) => {

  const user = props.user

  if (user) {
    return (
      <div className="App">
        <TopNavbar />
        <SidebarMenu />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/ueber-uns" element={<AboutUs />} />
          <Route path='/userManagement' element={<UsersManagement />} />
          <Route path='/degreeCourseManagement' element={<DegreeCourseManagement />} />
          <Route path='/degreeCourseApplicationManagement' element={<DegreeCourseApplication />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="App">
        <TopNavbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ueber-uns" element={<AboutUs />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);