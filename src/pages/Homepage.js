import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/authContext';

class Homepage extends Component {
  render() {
    const { isLogged } = this.props;
    return (
      <div>
        {!isLogged ? <div className="homepage"><h1>Imagin</h1>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div> : <div></div>
      }
      </div>
    )
  }
}

export default withAuth(Homepage);