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
  id: this.props.user._id,
  alert: ''
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
    .catch( error => {
      const { data } = error.response;
      
      switch(data.error){
        case 'user not found':
        console.log('Error del back', data);    
          this.setState({
            alert: 'Error 404: Speech not found'
          });
          break;
        // case 'not-found':
        //   this.setState({
        //     alert: 'User or password invalid.'
        //   });
        //   break;
        // case 'validation':
        //   this.setState({
        //     alert: 'Username or password can´t be empty.'
        //   });
        //   break;
        default:
          this.setState({
            alert: ''
          })
      }   
    })
}


  render() {
    const { speech, isLoading, id, owner, alert} = this.state;
   
    let equal = false;
    if (id === owner){
      equal = true;
    } 
 
    return (
      <div>
       { alert ? <h1>{alert}</h1> : <div>

         {isLoading ? <h1>Loading</h1> : <div>{ equal ? 
          <div><FormEdit speech={speech}/><h1>{speech.title}Soy el Owner</h1> </div>
                :<div><FormEditPrivate speech={speech}/><h1>{speech.title}No soy el Owner</h1> </div>
        }</div> }
        </div>}
         {/* {isLoading ? <h1>Loading</h1> : <div>{ equal ? 
          <div><FormEdit speech={speech}/><h1>{speech.title}Soy el Owner</h1> </div>
                :<div><FormEditPrivate speech={speech}/><h1>{speech.title}No soy el Owner</h1> </div>
        }</div> }  */}
      
        <h2>Speech Detail</h2>   
        <h3>Hello</h3> 
      </div>
    )
  }
}

export default withAuth(SpeechDetail);
