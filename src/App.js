import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './index.css';
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import WorldSpeeches from './pages/WorldSpeeches';
import AuthContext from './lib/authContext';
import CreateSpeeches from './pages/CreateSpeeches';
import YourSpeeches from './pages/YourSpeeches';


class App extends Component {
  render() {
    return (
      <AuthContext>
        <div className="container">
          <div>
            <Navbar  />
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />   
              <Route path="/speeches" component={WorldSpeeches} /> 
              <Route exact path="/profile/speeches" component={YourSpeeches} />
              <Route exact path="/profile/speeches/new" component={CreateSpeeches} />       
              <PrivateRoute path="/private" component={Private} />
            </Switch>
          </div>
        </div>
      </AuthContext>
    )
  }
}

export default App;

// Testing from Raúl.
