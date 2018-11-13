import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';

class Favourites extends Component {
  render() {
    return (
      <div>
        <h1>Favourites</h1>
        <p>To do, fill with favourites user favourite speeches.</p>
      </div>
    )
  }
}

export default withAuth(Favourites);
