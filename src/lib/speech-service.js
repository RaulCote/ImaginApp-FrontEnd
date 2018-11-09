import axios from 'axios';

class SpeechService {
  constructor() {
    this.speechService = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    })
  }

  getSpeech() {
    return this.speechService.get('/speeches')
      .then(({ data }) => data )
  }

  getSpeechId(id) {
    return this.speechService.get(`/speeches/${id}`)
      .then(({ data }) => data )
  }

  addSpeech(body) {
    return this.speechService.post('/speeches', body)
      .then(({ data }) => data )
  }

}

const speechService = new SpeechService();

export default speechService;