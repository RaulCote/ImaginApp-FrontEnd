import React, { Component } from 'react';
import speechService from '../lib/speech-service'; 
import { withAuth } from '../lib/authContext';
import FormEdit from '../components/FormEdit';

class SpeechDetail extends Component {

state = {
  speech: '',
  isLoading: true,
}

componentDidMount() {
  this.renderUpdate();
}

renderUpdate = () => {
  const id  = this.props.match.params.id;
  this.setState({
    isLoading: true,
  });
  speechService.getSpeechId(id)
    .then(result => {
      this.setState({
        speech: result,
        isLoading: false,
      })
    })
    .catch(error => {
      console.log('Error renderList', error);
    })
}
  render() {
    const { speech, isLoading } = this.state;

    return (
      <div>
        {isLoading ? <h1>Loading</h1> : <div><FormEdit speech={speech}/><h1>{speech.title}</h1>
        <h2>{speech.owner}</h2>
        <h3>{this.props.user._id}</h3></div>}
        

        <h2>Speech Detail</h2>   
        <h3>Hello</h3> 
      </div>
    )
  }
}

export default withAuth(SpeechDetail);
