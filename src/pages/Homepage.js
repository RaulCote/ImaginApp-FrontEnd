import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/authContext';

class Homepage extends Component {
  render() {
    return (
      <div>
        <div><img className="homepage-logo" src={process.env.PUBLIC_URL + '/images/imagine-logo-verde.png'} alt="imagine logo" /></div>
        {/* <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link> */}
      </div>
    )
  }
}

export default withAuth(Homepage);