const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('/Users/syoh/Desktop/video-player.io/public'));

app.get('/youtube/:search', (req, res) => {
  const { search } = req.params;
  console.log(search)
  axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${search}&key=AIzaSyB5syzt3DyGln6E0RNLZcR_ABI7q9-VA-U`)
    .then(response => {
      const videos =  response.data.items;
      const selectedVideo = videos.shift();
      res.send({videos: videos, selectedVideo: selectedVideo});
    })
    .catch(error => {
      console.log(error)
    })
})
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

