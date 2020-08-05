import React from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import YouTube from './api/youtube';
import { Paper, TextField, Typography } from '@material-ui/core';

// import { Paper, TextField } from '@material-ui/core';
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    const { search } = this.state;
    const { onFormSubmit } = this.props;
    onFormSubmit(search);
    this.setState({search: ''});
    e.preventDefault();
  }
  handleChange(e) {
    var search = e.target.value;
    this.setState({search});
  }
  
  componentDidMount() {
    
  }
  render() {
    var {search} = this.state;
    return(
      <div className="search">
        <Paper elevation={6} style={{padding: '25px'}}>
          <form onSubmit={this.handleSubmit}>
            <TextField value={this.state.search} fullWidth label="Search..." onChange={this.handleChange}/>
          </form>
          <button onClick={this.handleSubmit}>Search</button>
        </Paper>
      </div>
    )
  }
}

// import { Paper, Typography } from '@material-ui/core';
class VideoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    
  }
  render() {
    var { video } = this.props;
    if(!video|| !video.id) {
      return (
        null
      )
    }
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`
    return( 
      <div className="video-detail">
        <React.Fragment>
          <Paper elevation={6} style={{ height: '70%' }}>
            <iframe frameBorder="0" height="100%" width="100%" title="Video Player" src={videoSrc}/>
          </Paper>
          <Paper elevation={6} style={{ padding: '15px' }}>
            <Typography variant="h4">{video.snippet.title} - {video.snippet.channelTitle}</Typography>
            <Typography variant="subtitle1" >{video.snippet.channelTitle}</Typography>
            <Typography variant="subtitle2" >{video.snippet.description}</Typography>
          </Paper>
        </React.Fragment>
      </div>
    )
  }
}

class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    
  }
  render() {
    var { videos } = this.props;

    return( 
      <div className="video-list">
        {videos.map((video, index) => (
          <VideoItem key={index} video={video} />
       ))}
      </div>
    )
  }
}

class VideoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: this.props.video,
    }
  }
  componentDidMount() {
    
  }
  render() {
    var { video } = this.state;
    if(!video.snippet.thumbnails.medium) {
      return <div></div>
    }
    return( 
      <div className="video-item">
        <Grid item xs={10}>
          <Paper style={{display: 'flex', alignItems: 'center'}} >
              <img style={{marginRight: '20px'}} alt="thumbnail" src={video.snippet.thumbnails.medium.url} />
              
              <Typography variant="subtitle1"><b>{video.snippet.title}</b> </Typography>
            </Paper>
        </Grid>
      </div>
    )
  }
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: {}
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(search) {
    axios.get(`/youtube/${search || "dog"}`)
    .then(response => {
      const { videos, selectedVideo } =  response.data;
      this.setState({videos: videos, selectedVideo: selectedVideo})
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleSubmit(search) {
   
  }
  componentDidMount() {
  }
  render() {
    var { videos, selectedVideo } = this.state;
    return(
      <div className="main">
        <SearchBar onFormSubmit={this.onFormSubmit}/>
        <VideoDetail video={selectedVideo}/>
        <VideoList videos={videos}/>
      </div>
    )
  }
}

export default App;
