import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { withAuth } from '../lib/authContext';
import speechService from '../lib/speech-service';
import {init, reset, toggleStartStop } from '../speechAPI/formCreateMain'



class FormAdd extends Component {
  state = {
    title: '',
    message: '',
    tag: '',
    is_Public: 'false',
    owner: this.props.user._id,
    isLoading: true
  }

// componentDidMount = () => {
//   const s = document.createElement('script');
//     s.type = 'text/javascript';
//     s.async = true;
//     s.src = './speechAPI/formCreateMain';
//     s.innerHTML = "document.write('This is output by document.write()!')";
//     this.instance.appendChild(s);
//     s.init();
//     init();
// }

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
      this.setState({
        isLoading: false,
      })
      this.props.history.push('/profile/speeches');
    })
  }
    
  render() {
    return (
      <div>
        <div ref={el => (this.instance = el)} />
        <form onSubmit={this.handleSubmit}>
          <div>Title: <input type="text" name="title" placeholder="title" onChange={this.handleInput}></input></div>
          <div>Message: <textarea name="message" placeholder="message" onChange={this.handleInput}></textarea></div>
          <div>Tag: <input type="text" name="tag" placeholder="tag" onChange={this.handleInput}></input></div>
          
          <div className="radio">Public:
            <input type="radio" id="is_Public" name="is_Public" value="true" required onClick={this.handleInput}/></div>
          <div className="radio">Private:
            <input type="radio" id="is_not_Public" name="is_Public" value="false" onClick={this.handleInput}/></div>

          <div><textarea id="textarea" rows="10" cols="80" class="textarea"></textarea></div>
          <div><button id="button" onclick="toggleStartStop()"></button></div>
          
          <div><input type="submit" value="Create speech" /></div>
        </form>
        
      </div>
    )
  }
}

export default  withRouter(withAuth(FormAdd));