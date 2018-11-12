import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import profileService from '../lib/profile-service';


class FormProfile extends Component {
  state = {
    username: '',
    email: '',
    picture: '',
    // id: '',
    // username: this.props.user.username,
    // email: this.props.user.email,
    // picture: this.props.user.picture,
  }
  

  componentDidMount(){
      this.setState({
        username: this.props.user.username,
        email: this.props.user.email,
        picture: this.props.user.picture,
        // id: this.props.user._id,
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
      profileService.getEditProfile({
      username,
      email,
      picture,

    })
    .then((result) => {
      this.props.setUser(result)
      console.log('result vacio')
      console.log('ha llegado a Profile Edit: handleSubmit')
      console.log('emailSubmit', email)
      console.log('result ', result)
      // console.log(result.id)
      this.setState({
        username: result.username,
        email: result.email,
        picture: result.picture,
        // id: result.id,
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