import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import { Link } from 'react-router-dom';
import profileService from '../lib/profile-service';

class Favourites extends Component {

  state = {
    favourites: [],
    alert: '',
  }

  componentDidMount() {
    this.renderUpdate();
  }

  renderUpdate = () => {
    profileService.getFavourites(this.props.user._id)
      .then(result => {
        // console.log(result.favourites, 'nuevo result desde backend')
        // console.log(result.message, 'Solo result.')
        this.setState({
          favourites: result.favourites,
          alert: ''
        })
      })
      .catch(error => {
        this.setState({
          alert: 'Error showing favourites. Try again please.'
        })
      })
  }

  handleDelete = (id) => {
    profileService.deleteFavourites(id)
      .then((result) => {
          this.setState({
            alert: 'Speech deleted succesfully ',
          })
        
        console.log('ha entrado despues de delete favourites')
          this.props.history.push('/profile/favourites')
        this.renderUpdate();
      })
      .catch((error) => {
        console.log('errror Raúl', error)
      })
  }

  render() {
    const { favourites, alert } = this.state;
    return (
      <React.Fragment>
        <div className="container-favourites bottom-margin">
        <h1>Favourites</h1>
          {favourites.map((favourite, index) => {
            return <div className="search-link-containers" key={index}>
              <div className="search-flex">
                <div><Link className="search-links" to={`/speeches/${favourite._id}`}>{favourite.title}</Link></div>
                <div><button className="delete-button" onClick={() => this.handleDelete(favourite._id)}>Delete</button></div>
              </div>
            </div>
          } )}
          </div>
          { alert ? <h1>{alert}</h1> : <React.Fragment></React.Fragment>}

      </React.Fragment>
      
    )
  }
}

export default withAuth(Favourites);
