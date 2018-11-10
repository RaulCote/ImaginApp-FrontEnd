import React, { Component } from 'react'
import speechService from '../lib/speech-service'; 
import { Link } from 'react-router-dom';
import queryString from 'query-string';
// const queryString = require('query-string');

class WorldSpeeches extends Component {

  state = {
    speeches: [],
    isLoading: true,
    // values: queryString.parse(this.props.location.search),
  }

  componentDidMount() {
    this.renderUpdate();
  }

  renderUpdate = () => {
    const valueSearch = queryString.parse(this.props.location.search);
    const valueSearch2 = this.props.location.search;//queryString.stringify(valueSearch);
    

    this.setState({
      isLoading: true,
      values: valueSearch2,
    });
    const values = this.state.values;
    console.log('value ', valueSearch)
    console.log('value2', valueSearch2)
    speechService.getSpeech()
      .then(result => {
        this.setState({
          speeches: result,
          isLoading: false,
          values: {}
        })
      })
      .catch(error => {
        console.log('Error renderList', error);
      })
  }

  render() {
    const { speeches, isLoading } = this.state;
    // console.log(this.props.location);
    

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

export default WorldSpeeches;