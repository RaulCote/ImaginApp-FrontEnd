import React, { Component } from 'react';
import speechService from '../lib/speech-service';
import { withAuth } from '../lib/authContext';

class CreateSpeeches extends Component {

  state = {
    title: '',
    message: '',
    tag: '',
    visible: true,
    owner: this.props.user._id,
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    const { title, message, tag, visible, owner } = this.state;
    let arrayTag = []
    arrayTag.push(tag);
    let visible2 = !visible;
    console.log(visible2, 'visible 2 este')

      speechService.addSpeech({
      title: title,
      message: message,
      tag: tag,
      visible: visible2,
      owner
    })
    .then(() => {
      console.log('ha llegado aquí: handleSubmit')
      this.setState({
        title: '',
        message: '',
        tag: '',
        visible: '',
      })
    })
  }
  render() {
    return (
      <div>
        <h1>{this.props.user._id}</h1>
        <h1>Create Speeches</h1>
        <form onSubmit={this.handleSubmit}>
          <div>Title: <input type="text" name="title" placeholder="title" onChange={this.handleInput}></input></div>
          <div>Message: <textarea name="message" placeholder="message" onChange={this.handleInput}></textarea></div>
          <div>Tag: <input type="text" name="tag" placeholder="tag" onChange={this.handleInput}></input></div>
          <div>Public: <input type="checkbox" name="visible" onChange={this.handleSubmit} /></div>
          <div><input type="submit" value="Create speech" /></div>
        </form>
      </div>
    )
  }
}

export default withAuth(CreateSpeeches);
