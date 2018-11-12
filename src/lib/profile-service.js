import axios from 'axios';

class ProfileService {
  constructor() {
    this.profileService = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    })
  } 

  getProfile() {
    return this.profileService.get('/profile')
      .then (( { data } ) => data )
  }

  getEditProfile(body) {
    return this.profileService.put('/profile', body)
      .then (( { data } ) => data )
  }
}

const profileService = new ProfileService();

export default profileService;