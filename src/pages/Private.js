import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
class Private extends Component {
  render() {
    return (
      <div className="container">
        <div><img className="homepage-logo" src={process.env.PUBLIC_URL + '/images/imagine-logo-verde.png'} alt="imagine logo" /></div>
        <h1>Welcome {this.props.user.username}</h1>
      </div>
    )
  }
}

export default withAuth(Private);