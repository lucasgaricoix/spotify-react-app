import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked',  albumName: '', artistId: '', albumArt: '', device: '' },
      currentAlbum: { name: ''}
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumName: response.item.album.name,
              artistId: response.item.album.artists[0].id,
              albumArt: response.item.album.images[0].url,
              device: response.device.name
            }
        });
      })
  }

  getArtistAlbums(){
    spotifyApi.getArtistAlbums(this.state.nowPlaying.artistId, 'single,appears_on', 'ES', '10', '5')
    .then((response) => {
      this.setState({
        currentAlbum: {
          name: response.albuns.artists[0]
        }
      })
    });
  }

  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>

        <div>Current Device: { this.state.nowPlaying.device }</div>

        <div>Now Playing: { this.state.nowPlaying.name } </div>

        <div>Artist ID: { this.state.nowPlaying.artistId } </div>

        <div>Current Album: { this.state.currentAlbum.name }</div>
        
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 250 }}/>
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
        
        <div>
          <button onClick={() => { this.getArtistAlbums() }}>
            Albums
          </button>
        </div>
      </div>
    );
  }
}

export default App;
