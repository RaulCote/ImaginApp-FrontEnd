import React, { Component } from 'react';
import { withAuth } from '../lib/authContext';
import profileService from '../lib/profile-service';
import FormProfile from '../components/FormProfile';


class Profile extends Component {
  
  // state = {
  //   user: '',
  // }
  
  // componentDidMount() {
  //   this.renderUpdate();
  // }
  
  // renderUpdate = () => {
  // const id = this.props.user._id;

  // profileService.getProfile(id)
  //   .then(result => {
  //     console.log('user2 ', result)
  //     this.setState({
  //       user: result[0],
  //     })
  //   })
  //   .catch(error => {
  //     console.log('Error user', error)
  //   })
  // }

  render() {
    return (
      <div>
        <h1>My Profile.</h1>
        <div><FormProfile  />
        {/* <div><FormProfile user2={user} /> */}
          <h1>{this.props.user.username}</h1>
        </div> 
        {/* <h2>Current User Id : {this.props.user._id}</h2>
        <h2>Username : {this.props.user.username}</h2> */}
      </div>
    )
  }
}

export default withAuth(Profile);