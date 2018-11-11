import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import speechService from '../lib/speech-service';


class FormEdit extends Component {
  state = {
    title: this.props.speech.title,
    message: this.props.speech.message,
    tag: this.props.speech.tag[0],
    is_Public: this.props.speech.is_Public,
    owner: this.props.user._id,
  }

  componentDidMount(){
    this.setState({
      title: this.props.speech.title,
     message: this.props.speech.message,
     tag: this.props.speech.tag,
     is_Public: this.props.speech.is_Public,
     owner: this.props.user._id,
    })
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
      speechService.getEditSpeechId(this.props.speech._id,{
      title: title,
      message: message,
      tag: tag,
      is_Public: is_Public,
      owner
    })
    .then(() => {
      console.log('ha llegado a Edit: handleSubmit')
      this.setState({
        title: '',
        message: '',
        tag: '',
        is_Public: 'false',
      })
    })
  }
    
  render() {
    let equal = false;
    if (this.props.user._id === this.props.speech.owner){
      equal = true;
    } 
    const {title,tag, message, is_Public} = this.state;
    console.log(is_Public);
    return (
      <div>
        <form  onSubmit={this.handleSubmit}>
          <div>Title: <input type="text" disabled={!equal} name="title" placeholder="title" value={title} onChange={this.handleInput}></input></div>
          <div>Message: <textarea name="message"  disabled={!equal} placeholder="message" value={message} onChange={this.handleInput}></textarea></div>
          <div>Tag: <input type="text"  disabled={!equal} name="tag" placeholder="tag" value={tag} onChange={this.handleInput}></input></div>
          
          <div className="radio">Public:
            <input type="radio" id="is_Public" name="is_Public" value="true" required onClick={this.handleInput}/></div>
          <div className="radio">Private:
            <input type="radio" id="is_not_Public" name="is_Public" value="false" onClick={this.handleInput}/></div>
          { equal ? <div><input type="submit" value="Save speech" /></div> : <div></div> }
          
        </form>
        
      </div>
    )
  }
}

export default  withAuth(FormEdit);