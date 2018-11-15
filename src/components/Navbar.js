import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/authContext';
class Navbar extends Component {
  render() {  
    const { isLogged } = this.props;
    return (
      <div className="navbar">
        {isLogged ? <div>
          <p className="navbar-links logout" onClick={this.props.logout}>Logout</p>
          </div> : <div className="login-container">
          <Link className="navbar-links" to='/login'>Login</Link>
          <Link className="navbar-links" to='/signup'>Signup</Link>
        </div>
      }
      </div>
    )
  }
}

export default withAuth(Navbar);