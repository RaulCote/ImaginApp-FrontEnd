import React, { Component } from 'react';
import auth from '../lib/auth-service';
import { withAuth } from '../lib/authContext';
class Login extends Component {
  state = {
    username: "",
    password: "",
    alert: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    auth.login({ username, password })
    .then( (user) => {
      this.props.setUser(user)
      this.props.history.push('/private'); 
    })
    .catch( error => {
      const { data } = error.response;
      switch(data.error){
        case 'User or password invalid':
          this.setState({
            alert: 'invalid username'
          });
          break;
        case 'not-found':
          this.setState({
            alert: 'User or password invalid.'
          });
          break;
        case 'validation':
          this.setState({
            alert: 'Username or password can´t be empty.'
          });
          break;
        default:
          this.setState({
            alert: ''
          })
      }   
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, alert} = this.state;
    
    return (
      <React.Fragment>
      {/* { !id ? <div>Logueado</div>: <div>No logueado</div> } */}
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange}/>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <input type="submit" value="Login" />
        </form>
        { alert ? <h1>{alert}</h1> : <div></div>}
      </React.Fragment>
    )
  }
}

export default withAuth(Login);