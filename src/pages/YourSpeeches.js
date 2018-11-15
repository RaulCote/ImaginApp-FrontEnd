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
      <React.Fragment>
        <div className="container">
          <h1>Your Speeches</h1>
        </div>
        { alert ? <h1 className="alert-warning">{alert}</h1> : <React.Fragment></React.Fragment>}
        <section className="search-result-you">
          {isLoading ? <h2>Loading...</h2> : speeches.map((speech, index) => {
              return <div key={index}>
                <div className="card">
                  <div className="search-link-containers">
                    <div className="search-flex">
                      <div><Link className="search-links-title" key={speech._id} to={`/speeches/${speech._id}`}>{speech.title}</Link></div>
                      <button className="delete-button" onClick={() => this.handleDelete(speech._id)}>Delete</button>
                    </div>
                  </div>
                  <div className="message-container"><p>{speech.message}</p></div>
                
                </div>
              </div>
            } )}
        </section>
       </React.Fragment>
    )
  }
}

export default withRouter(withAuth(YourSpeeches));
