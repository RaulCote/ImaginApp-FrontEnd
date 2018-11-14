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
    alert: '',
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
      let speechMessage = speech.message.toUpperCase();
        if (speechTitle.includes(event.target.value.toUpperCase()) || speechTag.includes(event.target.value.toUpperCase()) || speechMessage.includes(event.target.value.toUpperCase())){
          speech.index= index;
          return speech;    
        }
       
    })
    
    this.setState({
      search: event.target.value,
      speechesSearch: result,
    })
  }

  handleFavourites = (id) => {
    speechService.addFavsSpeech(id)
      .then((result) => {
        console.log('REsultado fav ',result)
        this.setState({
          alert: 'Speech add to favourites successfully'
        })
        // if (result){

        // }
      })
      .catch( error => {
        const { data } = error.response;
        switch(data.error){
          case 'already add to favourites':     // checked
            this.setState({
              alert: 'Speech already add to favourites'
            });
            break;
          default:
            this.setState({
              alert: ''
            })
        }   
      })
  }

  render() {
    const { speeches, isLoading, search, speechesSearch, alert } = this.state;
    // console.log(this.props.location);
    

    return (
      <div>
        <h1>Speaches Search</h1>
        Search: <input type="search" name="search" value={search} onChange={this.handleSearch}/>
        {isLoading ? <h2>Loading...</h2> : speechesSearch.map((speech, index) => {
          return <div index={index} key={speech.title}>
            <div><Link key={`${speech._id}-${index}`} to={`/speeches/${speech._id}`}>{speech.title}</Link></div>
            <button onClick={() => this.handleFavourites(speech._id)}>Add to Favourites</button>
            </div>
        } )}
               { alert ? <h1>{alert}</h1> : <React.Fragment></React.Fragment>}

      </div>
    )
  }
}

export default withAuth(WorldSpeeches);