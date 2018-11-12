import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import profileService from '../lib/profile-service';


class FormProfile extends Component {
  state = {
    username: '',
    email: '',
    picture: '',
  }
  

  componentDidMount(){
      this.setState({
        username: this.props.editUser.username,
        email: this.props.editUser.email,
        picture: this.props.editUser.picture,
    })
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, picture } = this.state;
      profileService.getEditProfile(this.props.editUser._id,{
      username: username,
      email: email,
      picture: picture,
    })
    .then(() => {
      console.log('ha llegado a Profile Edit: handleSubmit')
      console.log('emailSubmit', email)
      this.setState({
        username: username,
        email: email,
        picture: picture,
      })
    })
  }

    
  render() {
    const {username, email, picture} = this.state;
    return (
      <div>
        <form  onSubmit={this.handleSubmit}>
          <div>Username: <input type="text" name="username" placeholder="username" value={username} onChange={this.handleInput}></input></div>
          <div>Email: <input type="email" name="email" placeholder="email" value={email} onChange={this.handleInput}></input></div>
          <div>Picture: <input type="text" name="picture" placeholder="picture" value={picture} onChange={this.handleInput}></input></div>
          <div><input type="submit" value="Save Profile" /></div>         
        </form>   
      </div>
    )
  }
}

export default  withAuth(FormProfile);