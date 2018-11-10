import React, { Component } from 'react';
import speechService from '../lib/speech-service'; 
import { Link } from 'react-router-dom';

class YourSpeeches extends Component {
  state = {
    speeches: [],
    isLoading: true,
  }

  componentDidMount() {
    this.renderUpdate();
  }

  renderUpdate = () => {
    this.setState({
      isLoading: true,
    });
    speechService.getSpeech()
      .then(result => {
        this.setState({
          speeches: result,
          isLoading: false,
        })
      })
      .catch(error => {
        console.log('Error renderList', error);
      })
  }

  render() {
    const { speeches, isLoading } = this.state;
    return (
      <div>
        <h1>Speaches Search</h1>
        {isLoading ? <h2>Loading...</h2> : speeches.map((speech, index) => {
          return <div key={index}>
            <div><Link key={speech._id} to={`/speeches/${speech._id}`}>{speech.title}</Link></div>
            </div>
        } )}
      </div>
    )
  }
}

export default YourSpeeches;
