import React, { Component } from 'react';
import speechService from '../lib/speech-service';
import { withAuth } from '../lib/authContext';

class CreateSpeeches extends Component {

  state = {
    title: '',
    message: '',
    tag: '',
    is_public: 'false',
    owner: this.props.user._id,
  }

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     name: props.name,
  //     anime:props.anime,
  //     id: props.id,
  //   }

  // }
componentDidUpdate = (prevprops, state) => {
  if (this.props.id !== prevprops.id){
    this.setState({
      is_public: this.props.is_public
    })
  }
}


  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
    // console.log(event.target.name);
    // console.log(event.target.value);

    const { is_public } = this.state;
    console.log(is_public);

  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, message, tag, is_public, owner } = this.state;
    let arrayTag = []
    arrayTag.push(tag);
    // let visible2 = !visible;
    // console.log(visible2, 'visible 2 este')

      speechService.addSpeech({
      title: title,
      message: message,
      tag: tag,
      isPublic: is_public,
      owner
    })
    .then(() => {
      console.log('ha llegado aquí: handleSubmit')
      this.setState({
        title: '',
        message: '',
        tag: '',
        is_public: 'false',
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Create Speeches</h1>
        <form onSubmit={this.handleSubmit}>
          <div>Title: <input type="text" name="title" placeholder="title" onChange={this.handleInput}></input></div>
          <div>Message: <textarea name="message" placeholder="message" onChange={this.handleInput}></textarea></div>
          <div>Tag: <input type="text" name="tag" placeholder="tag" onChange={this.handleInput}></input></div>
          

          <div className="radio">Public:
            <input type="radio" id="is_public" name="is_public" value="true" required onClick={this.handleInput}/></div>
          <div className="radio">Private:
            <input type="radio" id="is_not_public" name="is_public" value="false" onClick={this.handleInput}/></div>


          <div><input type="submit" value="Create speech" /></div>
        </form>
        <p>Should redirect to YourSpeeches after submiting form.</p>
      </div>
    )
  }
}

export default withAuth(CreateSpeeches);
