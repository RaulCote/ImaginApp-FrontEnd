import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './index.css';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Navbar from './components/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import WorldSpeeches from './pages/WorldSpeeches';
import AuthContext from './lib/authContext';
import CreateSpeeches from './pages/CreateSpeeches';
import YourSpeeches from './pages/YourSpeeches';
import SpeechDetail from './pages/SpeechDetail';
import Profile from './pages/Profile';
import Favourites from './pages/Favourites';
import Menu from './components/Menu';
import Homepage from './pages/Homepage';

class App extends Component {
  render() {
    return (
      <AuthContext>
        {/* <div className="container">
          <div> */}
            <Navbar  />
            {/* <Homepage /> */}
            <Switch>
              <Route exact path="/" component={Homepage} />
              <PublicRoute exact path="/signup" component={Signup} />
              <PublicRoute exact path="/login" component={Login} />   
              <PrivateRoute exact path="/speeches" component={WorldSpeeches} /> 
              <PrivateRoute exact path="/profile/speeches" component={YourSpeeches} />
              <PrivateRoute exact path="/profile/speeches/new" component={CreateSpeeches} />    
              <PrivateRoute exact path="/speeches/:id" component={SpeechDetail} />   
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/profile/favourites" component={Favourites} />
              <PrivateRoute path="/private" component={Private} />
            </Switch>
            <Menu /> 
          {/* </div>
        </div> */}
      </AuthContext>
    )
  }
}

export default App;

// Testing from Raúl.
