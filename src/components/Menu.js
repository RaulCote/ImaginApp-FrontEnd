import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/authContext';
class Menu extends Component {
  render() {  
    const { isLogged } = this.props;
    return (
      <div>
        {isLogged ? <React.Fragment>
      <div className="menu-navbar">
        <Link to='/profile' className="material-button btn-size-nav">
          <div className='material-buttons-container'>
            <div><img className="img-navbar" src={process.env.PUBLIC_URL + '/images/persona-blanca.png'} alt='arroba'/></div>
            <p className="mtn-text1">Profile</p>
          </div>
        </Link>
        <Link to='/speeches' className="material-button btn-size-nav">
          <div className='material-buttons-container'>
            <div><img className="img-navbar" src={process.env.PUBLIC_URL + '/images/arroba-blanca.png'} alt='arroba'/></div>
            <p className="mtn-text2">Explore</p>
          </div>
        </Link>
        <Link to='/profile/speeches' className="material-button btn-size-nav">
          <div className='material-buttons-container'>
            <div><img className="img-navbar" src={process.env.PUBLIC_URL + '/images/discurso-blanco.png'} alt='arroba'/></div>
            <p className="mtn-text3">Yours</p>
          </div>
        </Link>
        <Link to='/profile/favourites' className="material-button btn-size-nav">
          <div className='material-buttons-container'>
            <div><img className="img-navbar" src={process.env.PUBLIC_URL + '/images/estrella-blanca.png'} alt='arroba'/></div>
            <p className="mtn-text4">Fav</p>
          </div>
        </Link>
        <Link to='/profile/speeches/new' className="material-button btn-size-nav">
          <div className='material-buttons-container'>
            <div><img className="img-navbar" src={process.env.PUBLIC_URL + '/images/voz-grabar-blanco.png'} alt='arroba'/></div>
            <p  className="mtn-text5">New</p>
          </div>
        </Link>
      </div>
          </React.Fragment> : <div></div>
        }
      </div>
    )
  }
}

export default withAuth(Menu);