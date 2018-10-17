import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Navigation from './Navigation.js'

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
      nowPlaying: { name: 'Not Checked',  albumName: '', albumId: '', albumArt: '', device: '' },
      currentAlbum: { albumName: ''}
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

  componentDidMount (){
    if (this.state.loggedIn === true)    
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {        
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              device: response.item.device,
              albumId: response.item.album.id,
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }

  getArtistAlbums = () => {
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
    .then((data) => {
      console.log('Artist albums', data);
      this.setState ({
        currentAlbum: {
          albumName: data.items[0].artists[0].name
        }
      })
    }, function(err) {
      console.error(err);
    });
  }

  getCurrentArtist = () => {
    spotifyApi.getArtist('2hazSY4Ef3aB9ATXW7F5w3')
    .then(function(data) {
      console.log('Artist information', data);
    }, function(err) {
      console.error(err);
    });
  }
  

  render() {
    return (
      <div className="App">  

        <header>
          Spotify APP
        </header>

        {!this.state.loggedIn.token && <form className='frm-login'>
          <a className='login' href='http://localhost:8888' > Login to Spotify </a>
        </form>}
        
        <div className='currPlaying'>
          <div>Current Device: { this.state.nowPlaying.device }</div>

          <div>Now Playing: { this.state.nowPlaying.name } </div>

          <div>Album ID: { this.state.nowPlaying.albumId } </div>

          <div style={{ marginBottom: 10 }}>Current Album: { this.state.currentAlbum.albumName }</div>
        </div>
        
        
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 250 }}/>
        </div>
        

        <div>
          <button onClick={this.getArtistAlbums}>
            Albums
          </button>
        </div>
        
        <div>
          <button onClick={this.getCurrentArtist}>
            Artist
          </button>
        </div>
      </div>
    );
  }
}

export default App;
