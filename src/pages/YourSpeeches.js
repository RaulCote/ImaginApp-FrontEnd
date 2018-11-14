import React, { Component } from 'react';
import speechService from '../lib/speech-service'; 
import { Link, withRouter } from 'react-router-dom';
import { withAuth } from '../lib/authContext';



class YourSpeeches extends Component {
  state = {
    speeches: [],
    isLoading: true,
    alert: ''
  }
  
  componentDidMount() {
    this.renderUpdate();
  }

  renderUpdate = () => {
      this.setState({
      isLoading: true,
    });
    speechService.getMySpeeches(this.props.user._id)
      .then(result => {
       
          this.setState({
            speeches: result,
            isLoading: false,
            alert: 'Your Speeches'
          })
            
        
      })
      .catch(error => {
          this.setState({
            alert: 'Error showing speeches. Please try again.'
          })
      })
  }

  handleDelete = (id) => {
    // console.log('Antes de borrar nada iD: ', id);
    speechService.deleteMySpeechId(id) 
      .then((result) => {
        if (result){       
          this.props.history.push('/profile/speeches')
          this.renderUpdate();
        }
      })
      .catch((error) => {
        this.setState({
          alert: 'The speech does not exist. Please try again.'
        })
      }) 
  }

  render() {
    const { speeches, isLoading, alert} = this.state;
    return (
      <div>
        
        { alert ? <h1>{alert}</h1> : <React.Fragment></React.Fragment>}
        <h1>Your Speeches</h1>
        {isLoading ? <h2>Loading...</h2> : speeches.map((speech, index) => {
          // if (speech.owner === this.props.user._id) {
            return <div key={index}>
            <div><Link key={speech._id} to={`/speeches/${speech._id}`}>{speech.title}</Link></div>
            <button onClick={() => this.handleDelete(speech._id)}>Delete</button>
            </div>
            // }
        } )}
          

       </div>
    )
  }
}


export default withRouter(withAuth(YourSpeeches));
