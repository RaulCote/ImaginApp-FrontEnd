import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import profileService from '../lib/profile-service';

class FormProfile extends Component {
  state = {
    username: '',
    email: '',
    picture: '',
    alert: ''
  }

  componentDidMount() {
    this.renderUpdate();
  }

  renderUpdate = () => {
    profileService.getProfile()
    .then(result => {
      this.setState({
        username: result.username,
        email: result.email,
        picture: result.picture,
      })
    })
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, picture } = this.state

    // Profile FontEnd validation 
    if (!username || !email || !picture) {
      this.setState({
        alert: 'Fields can not be empty.',
    })
    }else{ 
      //Profile BackEnd Validation
    const { username, email, picture } = this.state;
      profileService.getEditProfile({
      username,
      email,
      picture,
    })
    .then((result) => {
      this.props.setUser(result)
      this.setState({
        username: result.username,
        email: result.email,
        picture: result.picture,
        alert: ''
      })
    })
    .catch( error => {
      const { data } = error.response;

      if (data.error === 'Fields cannot be empty') {
        this.setState({
          alert: 'Fields cannot be empty'
        })
      }
    })
  }
  }
    
  render() {
    const {username, email, picture, alert } = this.state;
    return (
      <React.Fragment>
        <form  onSubmit={this.handleSubmit}>
          <div className="form-profile">Username: <input className="form-input" type="text" name="username" placeholder="username" value={username} onChange={this.handleInput}></input></div>
          <div className="form-profile">Email: <input className="form-input" type="email" name="email" placeholder="email" value={email || ''} onChange={this.handleInput}></input></div>
          <div className="form-profile">Picture: <input className="form-input" type="text" name="picture" placeholder="picture" value={picture || ''} onChange={this.handleInput}></input></div>
          <div className="submit-button-container">
              <button className="material-button-input rippler-container btn-size-input" type="submit" value="Save Profile" >Save</button>
          </div>         
        </form>   
        { alert ? <h1 className="alert-warning">{alert}</h1> : <div></div>}
      </React.Fragment>
    )
  }
}

export default  withAuth(FormProfile);