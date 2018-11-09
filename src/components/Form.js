import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import speechService from '../lib/speech-service';


class Form extends Component {
  state = {
    title: '',
    message: '',
    tag: '',
    is_Public: 'false',
    owner: this.props.user._id,
  }


componentDidUpdate = (prevprops, state) => {
  if (this.props.id !== prevprops.id){
    this.setState({
      is_Public: this.props.is_Public
    })
  }

}


  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
   

  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, message, tag, is_Public, owner } = this.state;
    let arrayTag = []
    arrayTag.push(tag);
 

      speechService.addSpeech({
      title: title,
      message: message,
      tag: tag,
      is_Public: is_Public,
      owner
    })
    .then(() => {
      console.log('ha llegado aquí: handleSubmit')
      this.setState({
        title: '',
        message: '',
        tag: '',
        is_Public: 'false',
      })
    })
  }
  
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>Title: <input type="text" name="title" placeholder="title" onChange={this.handleInput}></input></div>
          <div>Message: <textarea name="message" placeholder="message" onChange={this.handleInput}></textarea></div>
          <div>Tag: <input type="text" name="tag" placeholder="tag" onChange={this.handleInput}></input></div>
          

          <div className="radio">Public:
            <input type="radio" id="is_Public" name="is_Public" value="true" required onClick={this.handleInput}/></div>
          <div className="radio">Private:
            <input type="radio" id="is_not_Public" name="is_Public" value="false" onClick={this.handleInput}/></div>


          <div><input type="submit" value="Create speech" /></div>
        </form>
        
      </div>
    )
  }
}

export default  withAuth(Form);