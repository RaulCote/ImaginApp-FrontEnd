import React, { Component } from 'react';
import speechService from '../lib/speech-service'; 
import { withAuth } from '../lib/authContext';
import FormEdit from '../components/FormEdit';
import FormEditPrivate from '../components/FormEditPrivate';


class SpeechDetail extends Component {

state = {
  speech: '',
  isLoading: true,
  is_Public: '',
  owner: '',
  id: this.props.user._id
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
        is_Public: result.is_Public,
        owner: result.owner
      })
      console.log('public o no ', result.is_Public)
    })
    .catch(error => {
      console.log('Error renderList', error);
    })
}
  render() {
    const { speech, isLoading, id, owner } = this.state;
    // console.log(this.props.location);

    let equal = false;
    if (id === owner){
      console.log('id del params ', id)
      console.log('id del owner ', owner)
      equal = true;

    } 
    
    return (
      <div>
        {isLoading ? <h1>Loading</h1> : <div>{ equal ? 
          <div><FormEdit speech={speech}/><h1>{speech.title}Soy el Owner</h1> </div>
                :<div><FormEditPrivate speech={speech}/><h1>{speech.title}No soy el Owner</h1> </div>
        }</div> }
        
        
        {/* { is_Public ? 
          <div><FormEdit speech={speech}/><h1>{speech.title}</h1> </div>
                :<div><FormEdit speech={speech}/><h1>{speech.title}</h1> </div>
        } */}

        

        

        <h2>Speech Detail</h2>   
        <h3>Hello</h3> 
      </div>
    )
  }
}

export default withAuth(SpeechDetail);
