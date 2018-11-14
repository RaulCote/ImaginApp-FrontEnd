import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import FormProfile from '../components/FormProfile';


class Profile extends Component {
  render() {
    return (
      <div className="container">
        <h1>Profile</h1>
        <div><FormProfile /></div> 
      </div>
    )
  }
}

export default withAuth(Profile);
