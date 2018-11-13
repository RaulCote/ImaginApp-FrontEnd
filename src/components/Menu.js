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
          <button className="material-button mat-pad1 btn-size-nav"><Link to='/profile'><div className='material-buttons-text'><img className="img-navbar"src={process.env.PUBLIC_URL + '/images/persona-blanca.png'} alt='arroba'/>Profile</div></Link></button>
          <button className="material-button mat-pad2 btn-size-nav"><Link to='/speeches'><div className='material-buttons-text'><img className="img-navbar" src={process.env.PUBLIC_URL + '/images/arroba-blanca.png'} alt='arroba'/>Explore</div></Link></button>
          <button className="material-button mat-pad3 btn-size-nav"><Link to='/profile/speeches'><div className='material-buttons-text'><img className="img-navbar" src={process.env.PUBLIC_URL + '/images/discurso-blanco.png'} alt='arroba'/>Yours</div></Link></button>
          <button className="material-button mat-pad4 btn-size-nav"><Link to='/profile/favourites'><div className='material-buttons-text'><img className="img-navbar" src={process.env.PUBLIC_URL + '/images/estrella-blanca.png'} alt='arroba'/>Fav</div></Link></button>
          <button className="material-button mat-pad5 btn-size-nav"><Link to='/profile/speeches/new'><div className='material-buttons-text'><img className="img-navbar" src={process.env.PUBLIC_URL + '/images/voz-grabar-blanco.png'} alt='arroba'/>New</div></Link></button>
          </div>
          </React.Fragment> : <div></div>
        }
      </div>
    )
  }
}

export default withAuth(Menu);