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

    //FontEnd validation 
    if (!username || !password) {
      this.setState({
        alert: 'Username or password can not be empty.',
    })
    }else{ 
      //BackEnd Validation
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
              alert: 'Username or password can not be empty.'
            });
            break;
          default:
            this.setState({
              alert: ''
            })
        }   
      })
    }
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, alert} = this.state;
    
    return (
      <React.Fragment>
      <div className ="container">
      <h1>Log In</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-profile">Username: </div><input className="form-input" type="text" name="username" value={username} onChange={this.handleChange}/>
          <div className="form-profile">Password: </div><input className="form-input" type="password" name="password" value={password} onChange={this.handleChange} />
          <div className="submit-button-container">
            <button className="material-button-input rippler-container btn-size-input top-margin-login" type="submit" value="Login">Log In</button>
          </div>
         </form>
        { alert ? <h1 className="alert-warning">{alert}</h1> : <div></div>}
        </div>
      </React.Fragment>
    )
  }
}

export default withAuth(Login);