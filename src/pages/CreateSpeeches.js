import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import FormAdd from '../components/FormAdd';

class CreateSpeeches extends Component {

  render() {
    return (
      <div className="form-textarea-special-container">
        <h1>Create Speeches</h1>
        <FormAdd />
      </div>
    )
  }
}

export default withAuth(CreateSpeeches);
