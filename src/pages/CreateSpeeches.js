import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import FormAdd from '../components/FormAdd';

class CreateSpeeches extends Component {

  render() {
    return (
      <div>
        <h1>Create Speeches</h1>
        <FormAdd />
        <p>Should redirect to YourSpeeches after submiting form.</p>
      </div>
    )
  }
}

export default withAuth(CreateSpeeches);
