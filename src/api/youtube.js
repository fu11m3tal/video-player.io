import axios from 'axios';
export default axios.create({
  baseURL: 'https://wwww.googlepapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: 'AIzaSyBsh6kmA52IASnraoFEHZaSHe9uxRcr5T8'
  }
})