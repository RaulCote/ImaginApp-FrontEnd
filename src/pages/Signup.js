import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';
import { withAuth } from '../lib/authContext';

class Signup extends Component {

  state = {
    username: "",
    password: "",
    alert: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    // FrontEnd Validation
    if (!username || !password) {
      this.setState({
        alert: 'Username or password can not be empty.',
      })
    }  else if (password.length < 6) {
      this.setState({
        alert: 'Minimum password length should be 6.',
      })
    }else  if ( username.length < 4 ) {
      this.setState({
        alert: 'Minimum username length should be 3.',
    })} else {
    
      //BackEnd Validation
      auth.signup({ username, password })
        .then( (user) => {
          this.setState({
              username: "",
              password: "",
          });
          this.props.setUser(user);
          this.props.history.push('/private');
        })
        .catch( error => {
          const { data } = error.response;
          switch(data.error){
            case 'username-not-unique':    
              this.setState({
                alert: 'Username is already in use, try another one.'
              });
              break;
            case 'empty': 
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
    }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, alert } = this.state;
    return (
      <React.Fragment>
      <div className="container">
      <h1>Sign Up</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-profile">Username: <input className="form-input" type="text" name="username" value={username} onChange={this.handleChange}/></div>
          <div className="form-profile">Password: <input className="form-input" type="password" name="password" value={password} onChange={this.handleChange} /></div>
          <div className="submit-button-container">
            <button className="material-button-input top-margin-login rippler-container btn-size-input" type="submit" value="Signup">Sign Up</button>
          </div>
        </form>
        { alert ? <h1 className="alert-warning">{alert}</h1> : <div></div> }
        <p className="signup-login-p">Already have an account? 
          <Link className="signup-login-link" to={"/login"}> Login</Link>
        </p>
      </div>
      </React.Fragment>
    )
  }
}

export default withAuth(Signup);