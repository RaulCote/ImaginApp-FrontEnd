import React, { Component } from 'react'
import speechService from '../lib/speech-service'; 
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { withAuth } from '../lib/authContext';

// const queryString = require('query-string');

class WorldSpeeches extends Component {

  state = {
    speeches: [],
    speechesSearch: [],
    isLoading: true,
    search:'',
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
          speechesSearch:result,
          isLoading: false,
          values: {}
        })
      })
      .catch(error => {
        console.log('Error renderList', error);
      })
  }

  handleSearch = (event) => {
    const { speeches } = this.state;

    const result = speeches.filter((speech,index) => {
      let speechTitle = speech.title.toUpperCase();
      let speechTag = speech.tag[0].toUpperCase();
      console.log(speechTag);
        if (speechTitle.includes(event.target.value.toUpperCase()) || speechTag.includes(event.target.value.toUpperCase())){
          speech.index= index;
          // console.log(comida.index);
          return speech;    
        }
       
    })
    
    this.setState({
      search: event.target.value,
      // speeches: result,
      speechesSearch: result,

    })
  }

  handleFavourites = (id) => {
    speechService.addFavsSpeech(id)
      .then((result) => {
        console.log(result, 'Botón favoritos')
      })
  }

  render() {
    const { speeches, isLoading, search, speechesSearch } = this.state;
    // console.log(this.props.location);
    

    return (
      <div>
        <h1>Speaches Search</h1>
        Search: <input type="search" name="search" value={search} onChange={this.handleSearch}/>
        {isLoading ? <h2>Loading...</h2> : speechesSearch.map((speech, index) => {
          return <div index={index} key={speech.title}>
            <div><Link key={speech._id} to={`/speeches/${speech._id}`}>{speech.title}</Link></div>
            <button onClick={() => this.handleFavourites(speech._id)}>Add to Favourites</button>
            </div>
        } )}
      </div>
    )
  }
}

export default withAuth(WorldSpeeches);