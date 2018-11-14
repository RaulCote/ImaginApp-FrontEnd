import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import { Link } from 'react-router-dom';
import profileService from '../lib/profile-service';

class Favourites extends Component {

  state = {
    favourites: [],
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
        })
      })
      .catch(error => {
        console.log('Error in favourites', error)
      })
  }

  handleDelete = (id) => {
    profileService.deleteFavourites(id)
      .then((result) => {
        this.props.history.push('/profile/favourites')
        this.renderUpdate();
      })
      .catch((error) => {
        console.log('errror Raúl', error)
      })
  }

  render() {
    const { favourites } = this.state;
    return (
      <React.Fragment>
        <h1>Favourites</h1>
          {favourites.map((favourite, index) => {
            return <div key={index}>
              <Link to={`/speeches/${favourite._id}`}>{favourite.title}</Link>
              <button onClick={() => this.handleDelete(favourite._id)}>Delete from Favourites</button>
            </div>
          } )}
      </React.Fragment>
    )
  }
}

export default withAuth(Favourites);
