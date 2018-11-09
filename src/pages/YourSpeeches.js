import React, { Component } from 'react';
import speechService from '../lib/speech-service'; 

class YourSpeeches extends Component {
  render() {
    return (
      <div>
        <h1>Your Speeches</h1>
        <p>Should include your own speeches and let you delete and edit.</p>
      </div>
    )
  }
}

export default YourSpeeches;
