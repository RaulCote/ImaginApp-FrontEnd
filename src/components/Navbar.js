import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/authContext';
class Navbar extends Component {
  render() {  
    const { isLogged } = this.props;
    return (
      <div className="navbar">
        {isLogged ? <div>
          {/* <p>username: {this.props.user.username}</p>
          <p>CurrenUserId: {this.props.user._id}</p> */}
          <button className="logout" onClick={this.props.logout}>Logout</button>
          {/* <Link to='/speeches'>World</Link>
          <Link to='/profile/speeches'>Your Speeches</Link>
          <Link to='/profile/speeches/new'>Create Speeches</Link>
          <Link to='/profile'>Profile</Link> */}
        </div> : <div>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </div>
      }
      </div>
    )
  }
}

export default withAuth(Navbar);